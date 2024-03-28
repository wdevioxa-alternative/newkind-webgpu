#! /bin/sh
#############################################
#
# ~% FILE="example.tar.gz"
# ~% echo "${FILE%%.*}"
# example
# ~% echo "${FILE%.*}"
# example.tar
# ~% echo "${FILE#*.}"
# tar.gz
# ~% echo "${FILE##*.}"
# gz
#
#############################################


ROOTDIR=`pwd`

CURRENTDIR="."
RETURNDIR=""

DIRLEVEL=0
TEMPDIRLEVEL=0

CONFIG_INCLUDE="-I/usr/include"
CPPFLAGS="-DOPT_GENERIC -DREAL_IS_FLOAT"
DEFS="-DHAVE_CONFIG_H"

TEMPFILENAME="tmpfile.dirlist"

enumsrc()
{
    for I in `ls *.bc 2>/dev/null`
    do
	rm $I
    done

    for I in `ls *.c 2>/dev/null`
    do
	if [ "$1" = "." ]; then
    	    echo $I >> $ROOTDIR/$TEMPFILENAME
	else
	    echo $1/$I >> $ROOTDIR/$TEMPFILENAME
	fi
    done

}

enumdir()
{
    CONFIG_INCLUDE="-I$1 $CONFIG_INCLUDE"

    TEMPDIRLEVEL=$(($TEMPDIRLEVEL+1))

    for J in `ls -d */ 2>/dev/null` 
    do    
        cd `pwd`/${J%%/}

        if [ "$1" = "." ]; then
	    enumsrc ${J%%/}
	    enumdir ${J%%/} $TEMPDIRLEVEL
	else
	    enumsrc $1/${J%%/}
	    enumdir $1/${J%%/} $TEMPDIRLEVEL
	fi

	
	cd ..
	
    done

    if [ $TEMPDIRLEVEL -gt $DIRLEVEL ]; then
	DIRLEVEL=$TEMPDIRLEVEL
    fi
    
    TEMPDIRLEVEL=0
}

if [ -f $ROOTDIR/$TEMPFILENAME ]; then
    rm $ROOTDIR/$TEMPFILENAME
fi

enumsrc $CURRENTDIR
enumdir $CURRENTDIR $DIRLEVEL

for I in `seq 2 $DIRLEVEL`
do
    if [ -z $RETURNDIR ]; then
	RETURNDIR=".."
    else
	RETURNDIR="../$RETURNDIR"
    fi

    if [ -z "$CONFIG_INCLUDE" ]; then
	CONFIG_INCLUDE="-I$RETURNDIR"
    else
	CONFIG_INCLUDE="$CONFIG_INCLUDE -I$RETURNDIR"
    fi

    CONFIG_INCLUDE="$CONFIG_INCLUDE -I$RETURNDIR/include"
done

for I in `cat $ROOTDIR/$TEMPFILENAME`
do

    WOEXT=$I
    WOEXT=${WOEXT%.*}
    
    echo "emcc $I $CONFIG_INCLUDE $DEFS $CPPFLAGS -c -o $WOEXT.bc"

    emcc $I $CONFIG_INCLUDE $DEFS $CPPFLAGS -c -o $WOEXT.bc
    if [ $? == 1 ]; then
	echo "exit with some error."
	exit 1
    fi

done

exit 0

