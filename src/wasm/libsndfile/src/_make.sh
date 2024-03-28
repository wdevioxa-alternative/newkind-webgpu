#!/bin/sh
emcc sndfile.c lib/sndfile.bc -lopenal -Llib -Iinclude -s ALLOW_MEMORY_GROWTH=1 -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap'] -o sndfile.js