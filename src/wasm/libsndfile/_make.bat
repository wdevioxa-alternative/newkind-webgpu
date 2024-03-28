@echo off
setlocal enabledelayedexpansion
set DIR=%cd%
set EMSCRIPTENDIR=c:/emscripten/emsdk
@call cmd /C "%EMSCRIPTENDIR:~0,2% && cd %EMSCRIPTENDIR% && emsdk_env.bat && %DIR:~0,2% && cd %DIR% && automake.bat"
