@echo off

setlocal enabledelayedexpansion

set CC=emcc

set DIR=%cd%
set INSTALLDIR=D:\workdir\nkweb\src\js

set WASM_TEMP_JS_LIBNAME=libsndfile-temp.js
set WASM_TEMP_WASM_LIBNAME=libsndfile-temp.wasm
set WASM_JS_LIBNAME=libsndfile.js
set WASM_WASM_LIBNAME=libsndfile.wasm

set WASM_LIBCODE_BEGIN=code-begin.js.part
set WASM_LIBCODE_END=code-end.js.part

if exist %WASM_TEMP_JS_LIBNAME% (
	@echo prepare: delete %WASM_TEMP_JS_LIBNAME%
	@del %WASM_TEMP_JS_LIBNAME%
)
if exist %WASM_TEMP_WASM_LIBNAME% ( 
	@echo prepare: delete %WASM_TEMP_WASM_LIBNAME%
	@del %WASM_TEMP_WASM_LIBNAME%
)
if exist %WASM_JS_LIBNAME% (
	@echo prepare: delete %WASM_JS_LIBNAME%
	@del %WASM_JS_LIBNAME%
)
if exist %WASM_WASM_LIBNAME% ( 
	@echo prepare: delete %WASM_WASM_LIBNAME%
	@del %WASM_WASM_LIBNAME%
)
rem if not exist !CC! (
rem 	echo prepare: !CC! WASM compiler is not present...
rem 	exit /b 1
rem )
@echo !CC!: !CC! sndfile.c lib/sndfile.bc -Llib -Ic:/emscripten/include -Iinclude -lopenal -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -O3 -o !WASM_TEMP_JS_LIBNAME!
@call !CC! sndfile.c lib/sndfile.bc -Llib -Ic:/emscripten/include -Iinclude -lopenal -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -O3 -o !WASM_TEMP_JS_LIBNAME!
if not %ERRORLEVEL% == 0  (
	@echo !CC!: WASM compiler exit with error...
	exit /b 1
)
if not exist %WASM_TEMP_JS_LIBNAME% (
	@echo !CC!: !WASM_TEMP_JS_LIBNAME! is not present...
	exit /b 1
)

type %WASM_LIBCODE_BEGIN% >> %WASM_JS_LIBNAME%
type %WASM_TEMP_JS_LIBNAME% >> %WASM_JS_LIBNAME%
type %WASM_LIBCODE_END% >> %WASM_JS_LIBNAME%

echo install: copy %WASM_TEMP_WASM_LIBNAME% %WASM_WASM_LIBNAME% /Y
copy %WASM_TEMP_WASM_LIBNAME% %WASM_WASM_LIBNAME% /Y

fartt -q %WASM_JS_LIBNAME% "\"!WASM_TEMP_WASM_LIBNAME!\"" "url+\"!WASM_WASM_LIBNAME!\""

echo install: copy !DIR!\!WASM_WASM_LIBNAME! !INSTALLDIR!\!WASM_WASM_LIBNAME! /Y
copy !DIR!\!WASM_WASM_LIBNAME! !INSTALLDIR!\!WASM_WASM_LIBNAME! /Y

echo install: copy !DIR!\!WASM_JS_LIBNAME! !INSTALLDIR!\!WASM_JS_LIBNAME! /Y
copy !DIR!\!WASM_JS_LIBNAME! !INSTALLDIR!\!WASM_JS_LIBNAME! /Y

exit /b 0

