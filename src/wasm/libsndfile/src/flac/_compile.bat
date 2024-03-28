@echo off

setlocal enabledelayedexpansion

set ROOTDIR=%cd%
set CURRENTDIR=.
set RETURNDIR=

set DIRECTORYLEVEL=0
set TEMPDIRECTORYLEVEL=0

set CONFIG_INCLUDE=-Ic:/emscripten/include -Wimplicit-function-declaration

set FILENAME_C=dirlist.outc

if exist %ROOTDIR%\%FILENAME_C% @del %ROOTDIR%\%FILENAME_C%

@call :enumsrc %CURRENTDIR%
@call :enumdir %CURRENTDIR% %DIRECTORYLEVEL%

for /l %%I in (1,1,%DIRECTORYLEVEL%) do (
	if "!RETURNDIR!" == "" (
		set RETURNDIR=..
	) else (
        	set RETURNDIR=../!RETURNDIR!
	)
	if "!CONFIG_INCLUDE!" == "" (
		set CONFIG_INCLUDE=-I!RETURNDIR!
	) else (
		set CONFIG_INCLUDE=!CONFIG_INCLUDE! -I!RETURNDIR!
	)
	set CONFIG_INCLUDE=!CONFIG_INCLUDE! -I!RETURNDIR!/include
)

for /f "usebackq" %%I in (%ROOTDIR%/%FILENAME_C%) do (
	echo emcc %%I !CONFIG_INCLUDE! -DHAVE_CONFIG_H -c -o %%~dI%%~pI%%~nI.bc
	@call emcc %%I !CONFIG_INCLUDE! -DHAVE_CONFIG_H -c -o %%~dI%%~pI%%~nI.bc
	if not %ERRORLEVEL% == 0  (
		exit /b 1
	)
)

exit /b 0

:enumsrc

for /f "usebackq" %%I in (`dir /a:-d/b *.bc 2^>NUL`) do del %%I

for /f "usebackq" %%I in (`dir /a:-d/b *.c 2^>NUL`) do ( 
	if "%1" == "." (
		echo %%I >> !ROOTDIR!/!FILENAME_C!
	) else (
		echo %1/%%I >> !ROOTDIR!/!FILENAME_C!
	)
)

goto :eof

:enumdir

set CONFIG_INCLUDE=-I%1 !CONFIG_INCLUDE!

if %2 GTR !DIRECTORYLEVEL! set DIRECTORYLEVEL=%2 

for /f "usebackq" %%I in (`dir /a:d/b 2^>NUL`) do (

	cd %cd%/%%I
			
	set /A TEMPDIRECTORYLEVEL=!DIRECTORYLEVEL!+1

	if "%1" == "." (
		@call :enumsrc %%I
		@call :enumdir %%I %TEMPDIRECTORYLEVEL%
	) else (
		@call :enumsrc %1/%%I
		@call :enumdir %1/%%I %TEMPDIRECTORYLEVEL%
	)

	cd ..
)

goto :eof

