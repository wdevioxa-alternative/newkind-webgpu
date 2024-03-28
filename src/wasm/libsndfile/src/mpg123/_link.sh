#! /bin/sh

LIBRARYNAME="libmpg123.bc"
RELEASEDIR="releasedir"
BBITCODE=""

link()
{
# echo directory: `pwd`

for I in `ls *.bc 2>/dev/null`
do
	if [ -z "$BBITCODE" ]; then
		
		if [ "$1" = "." ]; then
			BBITCODE="$I"
		else
			BBITCODE="$1/$I"
		fi

	else
		if [ "$1" = "." ]; then
			BBITCODE="$I $BBITCODE"
		else
			BBITCODE="$1/$I $BBITCODE"
		fi
	fi
done

}

if [ ! -d $RELEASEDIR ]; then
	mkdir $RELEASEDIR
fi

if [ -f $RELEASEDIR/$LIBRARYNAME ]; then
	rm $RELEASEDIR/$LIBRARYNAME
fi

cd src

for I in `ls -d */ 2>/dev/null`
do
	cd `pwd`/$I

	link ${I%%/}
	cd ..
done

link "."

echo emcc $BBITCODE -r -o ../$RELEASEDIR/$LIBRARYNAME
emcc $BBITCODE -r -o ../$RELEASEDIR/$LIBRARYNAME

cd ..

exit 0
