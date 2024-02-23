Module.onRuntimeInitialized = () => { 

  window["audioexit"] = function() {
    Module.ccall(
      'AL_exit',
      null,
      [],
      []
    );
  };

  window["audioinit"] = function() {
    Module.ccall(
      'AL_init',
      null,
      [],
      []
    );
  };

  window["startplayback"] = function( nameoffile ) {
    window["disable-spinners"]();
    let retval = Module.ccall(
      'AL_play',
      'number',
      ['string'],
      [ nameoffile ]
    );
    return retval;
  };
  
  window["stopplayback"] = function() {
    window["enable-spinners"]();
    let retval = Module.ccall(
      'AL_stop',
      'number',
      [],
      []
    );
    return retval;
    
  };
  
  window["malloc"] = function( memsize ) {
    return Module.ccall(
      'wasm_malloc',
      'number',
      ['number'],
      [ memsize ]
    );
  };
  
  window["free"] = function( memptr ) {
    Module.ccall(
      'wasm_free',
      null,
      ['number'],
      [ memptr ]
    );
  };
  
  window["copy"] = function( memptr, memsize ) {
    var tempdb = new Int8Array( Module.HEAPU8.buffer, memptr, memsize );
    return new Float32Array( tempdb.buffer, memptr, memsize / 4 );
  };

  window["assign"] = function( memdata, memptr ) {
    Module.HEAPU8.set( memdata, memptr );
  };

  window["isExist"] = function ( url ) {
    return Module.ccall(
      'isExist',
      'number',
      [ 'string' ],
      [ url ]
    );
  };

  window["isInit"] = function () {
    return Module.ccall(
      'isInit',
      'number',
      [],
      []
    );
  };

  window["isPlaying"] = function () {
    return Module.ccall(
      'isPlaying',
      'number',
      [],
      []
    );
  };

  window["playbackoffset"] = function () {
    return Module.ccall(
      'playbackoffset',
      'number',
      [],
      []
    );
  };

  window["createfile"] = function ( channels, samplerate, url, memptr, memsize ) {
    return Module.ccall(
      'createsoundfile',
      'number',
      [ 'number', 'number', 'string', 'number', 'number' ],
      [ channels, samplerate, url, memptr, memsize ]
    );
  };


  window["savefile"] = function ( url, memptr, memsize ) {
    return Module.ccall(
      'savesoundfile',
      'number',
      [ 'string', 'number', 'number' ],
      [ url, memptr, memsize ]
    );
  };

  window["getchannelscount"] = function ( url ) {
    return Module.ccall(
      'getchannelscount',
      'number',
      [ 'string' ],
      [ url ]
    );
  };

  window["getsampleratevalue"] = function ( url ) {
    return Module.ccall(
      'getsampleratevalue',
      'number',
      [ 'string' ],
      [ url ]
    );
  };

  window["getframescount"] = function ( url ) {
    return Module.ccall(
      'getframescount',
      'number',
      [ 'string' ],
      [ url ]
    );
  };

  window["getcurrentbuffer"] = function ( url, startframe, memptr, memsize ) {
    return Module.ccall(
      'getcurrentbuffer',
      'number',
      [ 'string', 'number', 'number', 'number' ],
      [ url, startframe, memptr, memsize ]
    );
  };

  window["version"] = function()
  {
    return Module.ccall(
      'version',
      'string',
      [], 
      []
    );
  };

  func();

};};
