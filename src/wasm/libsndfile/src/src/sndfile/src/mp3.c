#include	"sfconfig.h"

#include	<stdio.h>
#include	<stdlib.h>
#include	<fcntl.h>
#include	<string.h>
#include	<ctype.h>
#include	<math.h>

#include	"sndfile.h"
#include	"common.h"

#ifdef HAVE_EXTERNAL_XIPH_LIBS

#include	<mpg123.h>

/*------------------------------------------------------------------------------
** Private static functions.
*/

static sf_count_t	mpeg_seek (SF_PRIVATE *psf, int mode, sf_count_t offset) ;
static int			mpeg_close (SF_PRIVATE *psf) ;
static int			mpeg_read_header (SF_PRIVATE *psf) ;
static int			mpeg_init (SF_PRIVATE *psf);
static unsigned 	mpeg_read_loop (SF_PRIVATE *psf, unsigned len);

static sf_count_t	mpeg_read_mpeg2s (SF_PRIVATE *psf, short *ptr, sf_count_t len) ;
static sf_count_t	mpeg_read_mpeg2i (SF_PRIVATE *psf, int *ptr, sf_count_t len) ;
static sf_count_t	mpeg_read_mpeg2f (SF_PRIVATE *psf, float *ptr, sf_count_t len) ;
static sf_count_t	mpeg_read_mpeg2d (SF_PRIVATE *psf, double *ptr, sf_count_t len) ;

#if 0

static int			mpeg_byterate (SF_PRIVATE *psf) ;
static int			mpeg_enc_init (SF_PRIVATE *psf) ;
static int 			mpeg_command (SF_PRIVATE *psf, int command, void *data, int datasize) ;

static sf_count_t	mpeg_write_s2mpeg (SF_PRIVATE *psf, const short *ptr, sf_count_t len) ;
static sf_count_t	mpeg_write_i2mpeg (SF_PRIVATE *psf, const int *ptr, sf_count_t len) ;
static sf_count_t	mpeg_write_f2mpeg (SF_PRIVATE *psf, const float *ptr, sf_count_t len) ;
static sf_count_t	mpeg_write_d2mpeg (SF_PRIVATE *psf, const double *ptr, sf_count_t len) ;

#endif

typedef enum
{	MPEG_PCM_SHORT = 50,
	MPEG_PCM_INT = 51,
	MPEG_PCM_FLOAT = 52,
	MPEG_PCM_DOUBLE = 53
} MPEG_PCM ;

typedef struct
{	struct mpg123_handle *mh ;
	struct mpg123_frameinfo *mi ;

	MPEG_PCM pcmtype ;

	void* ptr ;

	off_t pos ;
	off_t total ;

	size_t samplesize ;
	size_t framesize ;
	
	long rate ;
	int channels ;
	int encoding ;

} MP3_PRIVATE ;

static void
ctos( const char* src, short* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (short)lrintf(((float)src[ count ]*(float)0x7fff)/(float)0x7f);
}

static void
stos( const short* src, short* dest, int count )
{	while (--count >= 0)
		dest[ count ] = src[ count ];
}

static void
itos( const int* src, short* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (short)lrintf(((float)src[ count ]*(float)0x7fff)/(float)0x7fffffff);
}

static void
ftos( const float* src, short* dest, int count )
{	while (--count >= 0)
		dest[count] = (short)lrintf((float)src[count]*(float)0x7fff);
}

static void
ctoi( const char* src, int* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (int)lrintf(((float)src[ count ]*(float)0x7fffffff)/(float)0x7f);
}

static void
itoi( const int* src, int* dest, int count )
{	while (--count >= 0)
		dest[ count ] = src[ count ];
}

static void
stoi( const short* src, int* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (int)lrintf((float)src[ count ]*(float)0x7fffffff/(float)0x7fff);
}

static void
ftoi( const float* src, int* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (int)lrintf((float)src[ count ]*(float)0x7fffffff);
}


static void
ctof( const char* src, float* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (float)((float)src[ count ]/(float)0x7f);
}

static void
itof( const int* src, float* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (float)((float)src[ count ]/(float)0x7fffffff);
}

static void
stof( const short* src, float* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (float)((float)src[ count ]/(float)0x7fff);
}

static void
ftof( const float* src, float* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (float)((float)src[ count ]);
}

static void
ctod( const char* src, double* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (double)((double)src[ count ]/(double)0x7f);
}

static void
itod( const int* src, double* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (double)((double)src[ count ]/(double)0x7fffffff);
}

static void
stod( const short* src, double* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (double)((double)src[ count ]/(double)0x7fff);
}

static void
ftod( const float* src, double* dest, int count )
{	while (--count >= 0)
		dest[ count ] = (double)((double)src[ count ]);
}

static int
mp3_byterate (SF_PRIVATE *psf)
{	if (psf->file.mode == SFM_READ)
		return (psf->datalength * psf->sf.samplerate) / psf->sf.frames ;

	return -1 ;
} 

int
mpeg_open	(SF_PRIVATE *psf)
{
	int err = 0 ;
	int enc = MPG123_ENC_FLOAT_32;
	err = mpg123_feature2(MPG123_FEATURE_OUTPUT_FLOAT32);
	if ( err == 0 )
	{	/* psf_log_printf("MPG123_FEATURE_OUTPUT_FLOAT32: unimplemented (%d)\n", err); */
		enc = MPG123_ENC_SIGNED_32;
		err = mpg123_feature2(MPG123_FEATURE_OUTPUT_32BIT);
	} 
	if ( err == 0 )
	{	/* psf_log_printf("MPG123_FEATURE_OUTPUT_32BIT: unimplemented (%d)\n", err); */
		enc = MPG123_ENC_SIGNED_16;
		err = mpg123_feature2(MPG123_FEATURE_OUTPUT_16BIT);
	} 
	if ( err == 0 )
	{	/* psf_log_printf("MPG123_FEATURE_OUTPUT_16BIT: unimplemented (%d)\n", err); */
		enc = MPG123_ENC_SIGNED_8;
		err = mpg123_feature2(MPG123_FEATURE_OUTPUT_8BIT);
	} 
	if ( err == 0 )
	{	/* psf_log_printf("ENCODER_FORMATS: unimplemented (%d)\n", err); */
		return SF_FALSE;
	}

	static int initialized = 0;

	if ( initialized == 0 )
	{	err = mpg123_init();
		if(err != MPG123_OK) 
		{	psf_log_printf("cannot initialize mpg123 library: %s\n", mpg123_plain_strerror(err));
			return SFE_SYSTEM;
		}
		initialized = 1;
	}

	MP3_PRIVATE* pmpeg = calloc (1, sizeof (MP3_PRIVATE)) ;
	if (!pmpeg) 
	{	return SFE_MALLOC_FAILED;
	}

	psf->codec_data = pmpeg ;
	pmpeg->mh = NULL;
	pmpeg->mi = NULL;
	pmpeg->encoding = enc;

	if (psf->file.mode == SFM_RDWR) {
		err = SFE_BAD_MODE_RW ;
		goto out;
	}

	if (psf->file.mode == SFM_WRITE) {
		err = SFE_UNIMPLEMENTED ;
		goto out;
	}

	if (psf->file.mode == SFM_READ) {
		err = mpeg_read_header (psf);
		if ( err ) goto out;
	}

	struct mpg123_frameinfo* info = pmpeg->mi;

	if (( info->version == MPG123_1_0 ||
				info->version == MPG123_2_0 ||
				info->version == MPG123_2_5 ) &&
				( info->layer > 0 ))
	{	if ((err = mpeg_init (psf))) 
		{ 	err = SFE_UNIMPLEMENTED;
			goto out; 
		} 
		else 
		{	psf->container_close = mpeg_close ;
			psf->seek = mpeg_seek ;
		}
	}

	return 0;

out:
	if (pmpeg->mh)
		mpg123_free(pmpeg->mh);
	if (pmpeg->mi)
		mpg123_free(pmpeg->mi);
	
	mpg123_free( pmpeg );

	psf->codec_data = NULL;
	psf_log_printf( "mpeg_open: return error code is %d\n", err );

	return err ;
}

static int
mpeg_read_header (SF_PRIVATE *psf)
{	int err;
	MP3_PRIVATE* pmpeg = (MP3_PRIVATE*) psf->codec_data ;

	pmpeg->mh = mpg123_new(NULL, &err);
	if(err != MPG123_OK) 
	{	err = SFE_SYSTEM;
		goto out;
	}

	err = mpg123_open_fd(pmpeg->mh, psf->file.filedes);
	if(err != MPG123_OK) 
	{	err = SFE_OPEN_FAILED;
		goto out;
	}

	pmpeg->mi = calloc(1, sizeof (struct mpg123_frameinfo));
	if (!pmpeg->mi) 
	{	err = SFE_MALLOC_FAILED;
		goto out;
	}

	struct mpg123_frameinfo* info = pmpeg->mi;
/*
	if (info->version == MPG123_1_0) {
		printf("mpeg_read_header: MPEG Version 1.0\n");
	} else if (info->version == MPG123_2_0) {
		printf("mpeg_read_header: MPEG Version 2.0\n");
	} else if (info->version == MPG123_2_5) {
		printf("mpeg_read_header: MPEG Version 2.0\n");
	}

	printf("mpeg_read_header: MPEG layer %d\n", info->layer );
	printf("mpeg_read_header: channels %d\n", (info->mode == MPG123_M_MONO ) ? 1 : 2 );
	printf("mpeg_read_header: sampling rate %ld\n", info->rate );
	printf("mpeg_read_header: frame size %d\n", info->framesize );
	printf("mpeg_read_header: emphasis type %d\n", info->emphasis );
	printf("mpeg_read_header: bitrate %d\n", info->bitrate );
	printf("mpeg_read_header: average bitrate %d\n", info->abr_rate );

	if ( info->vbr == MPG123_CBR ) {
		printf("mpeg_read_header: Constant Bitrate Mode\n");
	} else if ( info->vbr == MPG123_VBR ) {
		printf("mpeg_read_header: Variable Bitrate Mode\n");
	} else if ( info->vbr == MPG123_ABR ) {
		printf("mpeg_read_header: Average Bitrate Mode\n");
	}

	if ( info->flags == MPG123_CRC ) {
		printf("mpeg_read_header: bitstream is error protected using 16-bit CRC.\n");
	} else if ( info->flags == MPG123_COPYRIGHT ) {
		printf("mpeg_read_header: bitstream is copyrighted.\n");
	} else if ( info->flags == MPG123_PRIVATE ) {
		printf("mpeg_read_header: private bit has been set.\n");
	} else if ( info->flags == MPG123_ORIGINAL ) {
		printf("mpeg_read_header: bitstream is an original, not a copy\n");
	}
*/

	err = mpg123_getformat( pmpeg->mh, &pmpeg->rate, &pmpeg->channels, &pmpeg->encoding );
	if ( err != MPG123_OK ) 
	{ 	err = SFE_WAV_BAD_FORMAT;
		goto out;
	}

	err = mpg123_format( pmpeg->mh, pmpeg->rate, pmpeg->channels, pmpeg->encoding );
	if ( err != MPG123_OK ) 
	{ 	err = SFE_WAV_BAD_FORMAT;
		goto out;
	}

	err = mpg123_scan(pmpeg->mh);
	if(err != MPG123_OK) 
	{ 	err = SFE_BAD_SF_INFO;
		goto out;
	}

	err = mpg123_info(pmpeg->mh, pmpeg->mi);
	if(err != MPG123_OK) 
	{	err = SFE_BAD_SF_INFO_PTR;
		goto out;
	}

	if (info->mode == MPG123_M_MONO )
		psf->sf.channels = 1;
	else psf->sf.channels = 2;

	psf->sf.samplerate = info->rate;
	psf->sf.format = SF_FORMAT_MP3 | info->layer;
	psf->sf.sections = 1;
	psf->sf.seekable = SF_TRUE;

	psf->datalength = psf->filelength ;
	psf->dataoffset = 0 ;

	pmpeg->rate = info->rate ;
	pmpeg->channels = psf->sf.channels ;

	pmpeg->samplesize = mpg123_encsize(pmpeg->encoding);
	pmpeg->framesize = pmpeg->samplesize * pmpeg->channels;
	pmpeg->pos = 0;
	pmpeg->total = 0;

	psf_log_printf("mpeg_read_header: rate %u\n", pmpeg->rate);

	psf_log_printf("mpeg_read_header: channels %u\n", pmpeg->channels );
	psf_log_printf("mpeg_read_header: encoding %u\n", pmpeg->encoding );

	psf_log_printf("mpeg_read_header: samplesize %u\n", pmpeg->samplesize);
	psf_log_printf("mpeg_read_header: framesize %u\n", pmpeg->framesize );

	psf->sf.frames = mpg123_length( pmpeg->mh ) ;

	pmpeg->pos = mpg123_seek( pmpeg->mh, 0, SEEK_SET );
	if ( pmpeg->pos < 0 ) 
	{	err = SFE_SEEK_FAILED;
		goto out;
	}

	psf->dataoffset = pmpeg->pos;

	return 0 ;

out:
	psf_log_printf("mpeg_read_header: error return code %d\n",err);
	return err;
}

static int
mpeg_close	(SF_PRIVATE *psf)
{	MP3_PRIVATE* pmpeg ;
	int k ;
	int err = 0;

	if ((pmpeg = (MP3_PRIVATE*) psf->codec_data) == NULL)
		return 0 ;

	if (pmpeg->mh) 
	{   mpg123_free(pmpeg->mh);
		pmpeg->mh = NULL;
	}

	if (pmpeg->mi)
	{   mpg123_free(pmpeg->mi);
		pmpeg->mi= NULL;
	}

	mpg123_free (pmpeg) ;
	psf->codec_data = NULL ;

	//////////////////////////////////////////////////////////////// 
	// mpg123_exit() ;
	return 0 ;
} 

static int
mp3_command (SF_PRIVATE * psf, int command, void * fdata, int datasize)
{	MP3_PRIVATE* pmp3 = (MP3_PRIVATE*) psf->codec_data ;

	psf_log_printf("mp3_command: command is %d\n", command);
	return SF_TRUE;
} 

static int
mpeg_init (SF_PRIVATE *psf)
{
	if (psf->file.mode == SFM_READ)
	{	psf->read_short		= mpeg_read_mpeg2s ;
		psf->read_int		= mpeg_read_mpeg2i ;
		psf->read_float		= mpeg_read_mpeg2f ;
		psf->read_double	= mpeg_read_mpeg2d ;
		} ;

	if (psf->file.mode == SFM_WRITE)
		return SFE_UNIMPLEMENTED ;

	if (psf->file.mode == SFM_RDWR)
		return SFE_BAD_MODE_RW ;

	/*		
	psf->write_short	= mp3_write_s2mp3 ;
	psf->write_int		= mp3_write_i2mp3 ;
	psf->write_float	= mp3_write_f2mp3 ;
	psf->write_double	= mp3_write_d2mp3 ;
	*/

/*
	if (psf->filelength > psf->dataoffset)
		psf->datalength = (psf->dataend) ? psf->dataend - psf->dataoffset : psf->filelength - psf->dataoffset ;
	else
		psf->datalength = 0 ;
*/
	return 0 ;
} 

static sf_count_t
mpeg_read_mpeg2d (SF_PRIVATE *psf, double *ptr, sf_count_t len)
{	MP3_PRIVATE* pmpeg = (MP3_PRIVATE*) psf->codec_data ;
	sf_count_t total = 0, current ;
	unsigned readlen ;

	pmpeg->pcmtype = MPEG_PCM_DOUBLE ;

	while (total < len)
	{	readlen = (len - total > 0x1000000) ? 0x1000000 : (unsigned) (len - total) ;
		current = mpeg_read_loop (psf, readlen) ;
		if (current == 0)
		{	free(pmpeg->ptr);
			break ;
		}
		if (pmpeg->encoding == MPG123_ENC_SIGNED_8)
			ctod( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_16)
			stod( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_32)
			itod( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_FLOAT_32)
			ftod( pmpeg->ptr, ptr + total, current );
		total += current;
		free(pmpeg->ptr);
		pmpeg->ptr = NULL;
	}

	psf_log_printf ( "mpeg_read_mpeg2d: read total values is %d\n", total );
	return total ;
}

static sf_count_t
mpeg_read_mpeg2f (SF_PRIVATE *psf, float *ptr, sf_count_t len)
{	MP3_PRIVATE* pmpeg = (MP3_PRIVATE*) psf->codec_data ;
	sf_count_t total = 0, current ;
	unsigned readlen ;

	pmpeg->pcmtype = MPEG_PCM_FLOAT ;

	while (total < len)
	{	readlen = (len - total > 0x1000000) ? 0x1000000 : (unsigned) (len - total) ;
		current = mpeg_read_loop (psf, readlen) ;
		if (current == 0)
		{	free(pmpeg->ptr);
			break ;
		}
		if (pmpeg->encoding == MPG123_ENC_SIGNED_8)
			ctof( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_16)
			stof( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_32)
			itof( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_FLOAT_32)
			ftof( pmpeg->ptr, ptr + total, current );
		total += current;
		free(pmpeg->ptr);
		pmpeg->ptr = NULL;
	}
	
	psf_log_printf ( "mpeg_read_mpeg2f: total %u\n", total );
	return total ;
}

static sf_count_t
mpeg_read_mpeg2i (SF_PRIVATE *psf, int *ptr, sf_count_t len)
{	MP3_PRIVATE* pmpeg = (MP3_PRIVATE*) psf->codec_data ;
	sf_count_t total = 0, current ;
	unsigned readlen ;

	pmpeg->pcmtype = MPEG_PCM_INT ;

	while (total < len)
	{	readlen = (len - total > 0x1000000) ? 0x1000000 : (unsigned) (len - total) ;
		current = mpeg_read_loop (psf, readlen) ;
		if (current == 0)
		{	free(pmpeg->ptr);
			break ;
		}
		if (pmpeg->encoding == MPG123_ENC_SIGNED_8)
			ctoi( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_16)
			stoi( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_32)
			itoi( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_FLOAT_32)
			ftoi( pmpeg->ptr, ptr + total, current );
		total += current;
		free(pmpeg->ptr);
		pmpeg->ptr = NULL;
	}

	psf_log_printf ( "mpeg_read_mpeg2i: total %u\n", total );
	return total ;
}

static sf_count_t
mpeg_read_mpeg2s (SF_PRIVATE *psf, short *ptr, sf_count_t len)
{	MP3_PRIVATE* pmpeg = (MP3_PRIVATE*) psf->codec_data ;
	sf_count_t total = 0, current ;
	unsigned readlen ;

	pmpeg->pcmtype = MPEG_PCM_SHORT ;

	while (total < len)
	{	readlen = (len - total > 0x1000000) ? 0x1000000 : (unsigned) (len - total) ;
		current = mpeg_read_loop (psf, readlen) ;
		if (current == 0)
		{	free(pmpeg->ptr);
			//printf ("read short 2\n") ;
			break ;
		}
		if (pmpeg->encoding == MPG123_ENC_SIGNED_8)
			ctos( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_16)
			stos( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_SIGNED_32)
			itos( pmpeg->ptr, ptr + total, current );
		else if (pmpeg->encoding == MPG123_ENC_FLOAT_32)
			ftos( pmpeg->ptr, ptr + total, current );
		total += current;
		free(pmpeg->ptr);
		pmpeg->ptr = NULL;
	}

	psf_log_printf ( "mpeg_read_mpeg2s: total %u\n", total );
	return total ;
} 

static unsigned
mpeg_read_loop (SF_PRIVATE *psf, unsigned len)
{	MP3_PRIVATE* pmpeg = (MP3_PRIVATE*) psf->codec_data ;

	size_t done = 0;
	size_t memsize = 0;

	memsize = len * pmpeg->samplesize ;

	pmpeg->ptr = malloc( memsize ) ;
	if (!pmpeg->ptr) 
	{	return 0;
	}

	int err = mpg123_read(pmpeg->mh, pmpeg->ptr, memsize, &done );
	if ( err != MPG123_OK && err != MPG123_DONE ) 
	{	printf( "mpg123_read: failed %d\n", err );
		goto out;
	}

	psf_log_printf("mpeg_read_loop: buffer is %u bytes\n", memsize);
	psf_log_printf("mpeg_read_loop: read %u bytes\n", done);
	psf_log_printf("mpeg_read_loop: read %u samples\n", done / pmpeg->samplesize);

	return ( done / pmpeg->samplesize );

out:

	free(pmpeg->ptr);
	pmpeg->ptr = NULL;

	return 0;
}

static sf_count_t
mpeg_seek (SF_PRIVATE *psf, int UNUSED (mode), sf_count_t offset)
{	MP3_PRIVATE* pmpeg = (MP3_PRIVATE*) psf->codec_data ;

	if (pmpeg == NULL)
		return ((sf_count_t) -1) ;

	if (psf->dataoffset < 0)
	{	psf->error = SFE_BAD_SEEK ;
		return ((sf_count_t) -1) ;
		} ;

	if (psf->file.mode == SFM_READ)
	{	off_t off = mpg123_seek(pmpeg->mh, offset, SEEK_SET );
		if ( off >= 0 )
		{	psf->dataoffset = off;
			psf_log_printf( "mpeg_seek: offset is %d\n", off );
			return off ;
		}

		psf->error = SFE_BAD_SEEK ;
		return ((sf_count_t) -1) ;
	} ;

	psf->error = SFE_BAD_SEEK ;

	return ((sf_count_t) -1) ;
}

#else /* HAVE_EXTERNAL_XIPH_LIBS */

int
mpeg_open	(SF_PRIVATE *psf)
{
	psf_log_printf ("This version of libsndfile was compiled without libmpg123 support.\n") ;
	return SFE_UNIMPLEMENTED ;
} 

#endif
