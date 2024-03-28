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

compiling()
{
	echo directory: `pwd` 

	for I in `ls *.bc 2>&1`
	do
		rm $I
	done

	for I in `ls *.c 2>&1`
	do
		echo emcc $I -I../../src/include -I../include -I. -I../ -Iinclude -DHAVE_CONFIG_H -c -o ${I%%.*}.bc
		emcc $I -I../../src/include -I../include -I. -I../ -Iinclude -DHAVE_CONFIG_H -c -o ${I%%.*}.bc

		if [ $? == 1 ]; then
			cd ..
			exit 1
		fi
	done
}

cd src

compiling

for I in `ls -d */ 2>&1`
do
	cd `pwd`/$I
	compiling
	cd ..
done

cd ..

exit 0

