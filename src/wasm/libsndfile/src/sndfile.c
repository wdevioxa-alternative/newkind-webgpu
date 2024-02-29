#include <emscripten.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <sndfile.h>
#include <unistd.h>
#include <al.h>
#include <alc.h>

#define WASM_CODE_VERSION	"0.5.2"

ALuint internal_buffer = 0;
ALuint streaming_source = 0;
ALint current_buffer = 0;

ALCdevice* dev = NULL;
ALCcontext* ctx = NULL;

ALint IsPlaying = 0;
ALint IsInit = 0;
ALint IsPresent = 0;

EMSCRIPTEN_KEEPALIVE
void* wasm_malloc( size_t _size )
{
	void* _ptr = malloc( _size );
	if ( _ptr == NULL ) {
	        printf("wasm_malloc: failed\n" );
	}
	return _ptr;
}

EMSCRIPTEN_KEEPALIVE
void wasm_free( void* _ptr )
{
	if ( _ptr != NULL ) free( _ptr );
}

static inline ALenum format( short channels, short samples )
{
        switch ( samples ) {
        case 16:
		if ( channels == 1 ) {
			return AL_FORMAT_MONO16;
		} else if ( channels == 2 ) {
		    return AL_FORMAT_STEREO16;
		} 
/*
		else if ( channels == 4 ) {
		        return AL_FORMAT_QUAD16;
		} else if ( channels == 6 ) {
		        return AL_FORMAT_51CHN16;
		} else if ( channels == 7 ) {
		        return AL_FORMAT_61CHN16;
		} else if ( channels == 8 ) {
		        return AL_FORMAT_71CHN16;
		}
*/
        case 8:
            if ( channels == 1 ) {
                return AL_FORMAT_MONO8;                        
            } else if ( channels == 2 ) {
                return AL_FORMAT_STEREO8;
		}

        default:
                return -1;
        }
}

EMSCRIPTEN_KEEPALIVE 
ALint AL_stop()
{
	if ( IsInit == 0 ) return -1;
	if ( IsPlaying == 1 ) {
		printf("AL_stop: stop playback\n");
		alSourceStop( streaming_source );
		alDeleteSources( 1, &streaming_source );
		alDeleteBuffers( 1, &internal_buffer );	
		IsPlaying = 0;
	}
	return IsPlaying;
}

EMSCRIPTEN_KEEPALIVE 
ALint AL_play(char* _filename)
{
	if ( IsInit == 0 ) return -1;
	if ( IsPlaying == 1 ) AL_stop();
	SF_INFO sfinfo;
	memset ( (void*)&sfinfo, 0, sizeof (sfinfo) );
	SNDFILE	*infile = sf_open(_filename, SFM_READ, &sfinfo);
	if ( !infile ) return -1;
	size_t _size = sfinfo.frames * sfinfo.channels * sizeof( short );
	void* _globalptr = malloc( _size );
	size_t readcount = sf_readf_short( infile, ( short* )_globalptr, sfinfo.frames );
	if ( readcount == 0 ) {
		sf_close( infile );
		return -1;
	}	
	sf_close( infile );
	alGenSources( 1, &streaming_source ); 
	alGenBuffers( 1, &internal_buffer );
	alBufferData( internal_buffer, format( sfinfo.channels, 16 ),
                _globalptr, _size, sfinfo.samplerate );
	free( _globalptr );
	alSourcei( streaming_source, AL_BUFFER, internal_buffer );
	alSourcePlay( streaming_source );
	IsPlaying = 1;
	printf( "AL_play: start playback file %s\n", _filename );
	return IsPlaying;
}

EMSCRIPTEN_KEEPALIVE 
void AL_init()
{
	if ( IsInit == 0 ) {
		const char* defdevice = alcGetString( NULL, ALC_DEFAULT_DEVICE_SPECIFIER );
		printf( "AL_init: open %s\n", defdevice );	
		dev = alcOpenDevice( defdevice );
		ctx = alcCreateContext( dev, NULL );
		alcMakeContextCurrent( ctx );
		IsInit = 1;
	}
}

EMSCRIPTEN_KEEPALIVE 
void AL_exit()
{
	if ( IsInit == 1 ) {
		printf("AL_exit: close audio device context\n");

		alcMakeContextCurrent( NULL );

		alcDestroyContext( ctx );
		alcCloseDevice( dev );

		IsInit = 0;
	}
}

EMSCRIPTEN_KEEPALIVE
ALint isInit()
{
	return IsInit;
}

EMSCRIPTEN_KEEPALIVE
ALint isPlaying()
{
//	if ( IsPlaying == 1 ) {
//	        ALint stateSource = AL_PLAYING;
//		alGetSourcei( streaming_source, AL_SOURCE_STATE, &stateSource );
//		if ( stateSource == AL_PLAYING ) {
//			IsPlaying = 1;
//		}
//	}
	return IsPlaying;
}

EMSCRIPTEN_KEEPALIVE
ALint isExist( const char* _filename )
{
	SF_INFO sfinfo;
	memset ((void*)&sfinfo, 0, sizeof(sfinfo)) ;
	SNDFILE	*infile = sf_open( _filename, SFM_READ, &sfinfo ) ;
	if ( !infile ) return 0;
	sf_close ( infile );
	if ( sfinfo.frames > 0 ) return 1;
	return 0;
}

EMSCRIPTEN_KEEPALIVE
size_t getsampleratevalue( const char* _filename )
{
	SF_INFO sfinfo;
	memset ( (void*)&sfinfo, 0, sizeof(sfinfo) ) ;
	SNDFILE	*infile = sf_open( _filename, SFM_READ, &sfinfo ) ;
	if ( !infile ) return 0;
	sf_close ( infile );
	return sfinfo.samplerate;
}

EMSCRIPTEN_KEEPALIVE
size_t getchannelscount( const char* _filename )
{
	SF_INFO sfinfo;
	memset ( (void*)&sfinfo, 0, sizeof(sfinfo) ) ;
	SNDFILE	*infile = sf_open( _filename, SFM_READ, &sfinfo ) ;
	if ( !infile ) return 0;
	sf_close ( infile );
	return sfinfo.channels;
}

EMSCRIPTEN_KEEPALIVE
size_t getframescount( const char* _filename )
{
	SF_INFO sfinfo;
	memset ( (void*)&sfinfo, 0, sizeof(sfinfo) ) ;
	SNDFILE	*infile = sf_open( _filename, SFM_READ, &sfinfo ) ;
	if ( !infile ) return 0;
	sf_close (infile);
	return sfinfo.frames;
}

EMSCRIPTEN_KEEPALIVE
size_t createsoundfile( int _channels, int _samplerate, const char* _filename, const char* _ptr, size_t _len )
{
	SF_INFO sfinfo;
	memset ( (void*)&sfinfo, 0, sizeof(sfinfo) );
	printf( "channels: %d; samplerate: %d; name: %s\n", _channels, _samplerate, _filename );
	sfinfo.channels = _channels;
	sfinfo.samplerate = _samplerate;
	sfinfo.format = SF_FORMAT_WAV | SF_FORMAT_PCM_16;
	if ( !sf_format_check( &sfinfo ) ) {
		printf("createsoundfile: sfinfo has wrong combination...\n");
		return 0;
	}
	int fd = open( _filename, O_CREAT|O_WRONLY|O_TRUNC, 0644 );
	if ( fd < 0 ) {	
		printf("createsoundfile: couldn't open file '%s' for writing...\n", _filename);
		return 0;
	}
	SNDFILE	*infile = sf_open_fd( fd, SFM_WRITE, &sfinfo, 1 ) ;
	if ( !infile ) {
		printf("createsoundfile: couldn't open file '%s' for writing...\n", _filename);		
		return 0;
	}
	sf_count_t totalframes = ( _len / sizeof( float ) ) / _channels;
	sf_count_t count = sf_writef_float( infile, (float *)_ptr, totalframes );
	if ( count != totalframes ) {
		sf_close( infile );
		return count * sizeof(float) * _channels;
	}
	sf_close( infile );
	return totalframes * sizeof(float) * _channels;
}


EMSCRIPTEN_KEEPALIVE
size_t savesoundfile( const char* _filename, const char* _ptr, size_t _len )
{
	/////////////////////////////////////////////////////////////////////////////////////
	// mode = S_IRUSR | S_IWUSR | S_IRGRP | S_IWGRP | S_IROTH | S_IWOTH 
	/////////////////////////////////////////////////////////////////////////////////////
	// |O_BINARY
	int fd = open( _filename, O_CREAT|O_WRONLY|O_TRUNC, 0644 );
	if ( fd < 0 ) {	
		printf("savesoundfile: couldn't open file '%s' for writing...\n", _filename);
		return 0;
	}
	ssize_t wc = write( fd, _ptr, _len );
	close( fd );
	SF_INFO sfinfo;
	memset ((void*)&sfinfo, 0, sizeof(sfinfo)) ;
	SNDFILE	*infile = sf_open( _filename, SFM_READ, &sfinfo ) ;
	if ( !infile ) return 0;
	sf_close( infile );
	return wc;
}

EMSCRIPTEN_KEEPALIVE
ALint getcurrentbuffer( char* _filename, size_t _startframe, const char* _ptr, size_t _countofframes )
{
	SF_INFO sfinfo ;
	memset ( (void*)&sfinfo, 0, sizeof ( sfinfo ) ) ;
	SNDFILE	*infile = sf_open( _filename, SFM_READ, &sfinfo ) ;
	if ( !infile ) {	
		printf( "getcurrentbuffer: couldn't open file '%s' for reading\n", _filename ) ;
		return -1;
	}
	sf_seek( infile, _startframe, SEEK_SET ) ;
	memset ( (void*)_ptr, 0, _countofframes * sfinfo.channels * sizeof( float ) ) ;
	size_t readcount = sf_readf_float( infile, (float*)_ptr, _countofframes );
	if ( readcount == 0 ) {
		sf_close ( infile );
		return -1;
	}
	sf_close ( infile );
	return readcount;
}

EMSCRIPTEN_KEEPALIVE
ALint playbackoffset()
{
	if ( IsPlaying == 1 ) {
		alGetSourcei( streaming_source, AL_SAMPLE_OFFSET, &current_buffer );
		return current_buffer;
	}
	return -1;
}

EMSCRIPTEN_KEEPALIVE
char* version()
{
	static char buf [ 1024 ];
	sf_command ( NULL, SFC_GET_LIB_VERSION, buf, sizeof (buf) ) ;
	return buf;
}

EMSCRIPTEN_KEEPALIVE
char* WASM_version()
{
	static char buf [ 1024 ];
	strcpy( buf, WASM_CODE_VERSION );
	return buf;
}

int main( int argc, char* argv[] )
{
	printf("WASM %s library module version %s (c) 2019-2024 Vyacheslav Zababurin\n", version(), WASM_version() );
	return 0;
}
