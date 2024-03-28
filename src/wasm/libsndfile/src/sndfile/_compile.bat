@echo off

setlocal enabledelayedexpansion

set ROOTDIR=%cd%
set CURRENTDIR=.
set RETURNDIR=

set DIRLEVEL=0
set TEMPDIRLEVEL=0

set CONFIG_INCLUDE=-Ic:/emscripten/include 
set CPPFLAGS=-DMPG123_NO_LARGENAME=1 -DREAL_IS_FLOAT -DGAPLESS

set DEFS=-DHAVE_CONFIG_H

set TEMPFILENAME=tmpfile.dirlist

if exist %ROOTDIR%\%TEMPFILENAME% @del %ROOTDIR%\%TEMPFILENAME%

@call :enumsrc %CURRENTDIR%
@call :enumdir %CURRENTDIR%

for /l %%I in (1,1,!DIRLEVEL!) do (
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


for /f "usebackq" %%I in (%ROOTDIR%/%TEMPFILENAME%) do (

	set FNWOE=%%I
	set FNWOE=!FNWOE:%%~xI=!
	
	echo emcc %%I !CONFIG_INCLUDE! !DEFS! !CPPFLAGS! -c -o !FNWOE!.bc

	@call emcc %%I !CONFIG_INCLUDE! !DEFS! !CPPFLAGS! -c -o !FNWOE!.bc
rem	if !ERRORLEVEL! neq 0 (
rem		echo Exit with error(1).
rem		exit /b 1
rem	)

)

exit /b 0

:enumsrc

for /f "usebackq" %%I in (`dir /a:-d/b *.bc 2^>NUL`) do del %%I

for /f "usebackq" %%I in (`dir /a:-d/b *.c 2^>NUL`) do ( 
	if "%1" == "." (
		echo %%I >> !ROOTDIR!/!TEMPFILENAME!
	) else (
		echo %1/%%I >> !ROOTDIR!/!TEMPFILENAME!
	)
)

goto :eof

:enumdir

set CONFIG_INCLUDE=-I%1 !CONFIG_INCLUDE!

set /A TEMPDIRLEVEL=%TEMPDIRLEVEL%+1

for /f "usebackq" %%I in (`dir /a:d/b 2^>NUL`) do (

	cd "%cd%/%%I"
			
	if "%1" == "." (
		@call :enumsrc %%I
		@call :enumdir %%I
	) else (
		@call :enumsrc %1/%%I
		@call :enumdir %1/%%I
	)

	cd ".."
)

if !TEMPDIRLEVEL! gtr !DIRLEVEL! (
	set DIRLEVEL=!TEMPDIRLEVEL!
)
    
set TEMPDIRLEVEL=0

goto :eof

