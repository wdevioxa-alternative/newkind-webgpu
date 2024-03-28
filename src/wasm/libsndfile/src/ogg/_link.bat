@echo off

setlocal enabledelayedexpansion

set LIBNAME=libogg.bc
set RELEASEDIR=releasedir

set CURRENTDIR=.
set ROOTDIR=%cd%

set CONFIG_BC=
set FILENAME_BC=dirlist.outbc

if not exist %RELEASEDIR% @mkdir %RELEASEDIR%

if exist %RELEASEDIR%\%LIBNAME% @del %RELEASEDIR%\%LIBNAME%
if exist %ROOTDIR%\%FILENAME_BC% @del %ROOTDIR%\%FILENAME_BC%

@call :findbc %CURRENTDIR%
@call :enumdir %CURRENTDIR%

for /f "usebackq" %%I in (%ROOTDIR%/%FILENAME_BC%) do (
	if "!CONFIG_BC!" == "" (
		set CONFIG_BC=%%I 
	) else (
		set CONFIG_BC=!CONFIG_BC! %%I 
	)
)

echo emcc %CONFIG_BC% -r -o %RELEASEDIR%/%LIBNAME%
@call emcc %CONFIG_BC% -r -o %RELEASEDIR%/%LIBNAME%

exit /b 0

:findbc

for /f "usebackq" %%I in (`dir /a:-d/b *.bc 2^>NUL`) do ( 
	if "%1" == "." (
		echo %%I >> !ROOTDIR!/%FILENAME_BC%
	) else (
		echo %1/%%I >> !ROOTDIR!/%FILENAME_BC%
	)
)

goto :eof

:enumdir

for /f "usebackq" %%I in (`dir /a:d/b 2^>NUL`) do (

	cd %cd%/%%I
			
	if "%1" == "." (
		@call :findbc %%I
		@call :enumdir %%I
	) else (
		@call :findbc %1/%%I
		@call :enumdir %1/%%I
	)

	cd ..
)

goto :eof

