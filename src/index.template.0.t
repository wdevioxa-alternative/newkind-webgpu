<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		
		<link href="js/themes/dark-hive/jquery-ui.css" rel="stylesheet"/>
		<link href="js/themes/dark-hive/theme.css" rel="stylesheet"/>

		<script type="text/javascript" src="js/jquery-3.7.1.min.js"></script>
<!--		<script type="text/javascript" src="js/external/jquery/jquery.js"></script> -->
		<script type="text/javascript" src="js/jquery-ui.js"></script>
		<script type="text/javascript" src="js/libsndfile.js"></script>
		<script type="text/javascript" src="config/controller.bundle.js"></script>
       <link rel="preload" href="/services/webgpu/src/component/nk-chart/views/mjs/terminal/coreutils.async.wasm" as="fetch" crossorigin />
	    <script src="/services/webgpu/src/component/nk-chart/views/mjs/terminal/modules/xterm/lib/xterm.js"></script>
        <script src="/services/webgpu/src/component/nk-chart/views/mjs/terminal/modules/local-echo/dist/local-echo.js"></script>
        <script src="/services/webgpu/src/component/nk-chart/views/mjs/terminal/modules/xterm-addon-fit/lib/xterm-addon-fit.js"></script>
        <script src="/services/webgpu/src/component/nk-chart/views/mjs/terminal/modules/xterm-addon-web-links/lib/xterm-addon-web-links.js"></script>
		<title>WebGPU Test Page</title><link rel="shortcut icon" href="data:image/png;base64, AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbbv+DGW3/mRlt/5kZbf+ZGq6/hIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGa3/ohkt/7/Zbj//2S3/v9lt/6WAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGm5/iRlt/74Zbj//2W4//9luP//Zbf++mi4/i4gIPciGhr24hsb9uwbG/bsGhr24CEh9xoAAAAAAAAAAAAAAABnuP5mZLf+/2W4//9luP//Zbj//2S3/v9muP5yGBj2rhMT9v8TE/b/ExP2/xMT9f8YGPWkAAAAAAAAAAAAAAAAb7z/BGW3/tZluP//Zbj//2W4//9lt/7gJzH3ShMT9f8TE/b/ExP2/xMT9v8TE/b/ExP1/CAg9joAAAAAAAAAAAAAAABmuP5GZLf+6GS3/uhkt/7oZbf+UhgY9YQSEvX/ExP2/xMT9v8TE/b/ExP2/xIS9f8aGvZ8AAAAAD4++gQgIPZ6IiL2hiIi9oYgIPZ8KCj5BAAAAAAtLfgUFBT17BMT9v8TE/b/ExP2/xMT9v8VFfXoLCz4DgAAAAAaGvZqEhL1/xMT9v8TE/b/EhL1/xsb9nIAAAAAAAAAABwc9m4SEvX/ExP2/xMT9v8SEvX/HR32ZAAAAAAnJ/gSFRX16hMT9v8TE/b/ExP2/xMT9v8UFPXuJyf4Fp2xlAKNnqUYLC/mfhYW83ATE/VuFxf1aDc3+gIAAAAAGBj1fhIS9f8TE/b/ExP2/xMT9v8TE/b/ExP1/xkZ9YaGn3yIhZ57/4Wee/+Gn3yKAAAAAAAAAAAAAAAAAAAAACMj9zYTE/X8ExP2/xMT9v8TE/b/ExP2/xMT9f9JUshihZ57+IaffP+Gn3z/hZ579oigfiYAAAAAAAAAAAAAAAAAAAAAGBj1oBIS9f8TE/b/ExP2/xMT9f8YGPWmiKB+PIWee/+Gn3z/hp98/4Wee/+HoH06AAAAAAAAAAAAAAAAAAAAACUl9xgVFfXOExP11BMT9dQUFPXQJib3HgAAAACGn3ymhp98/4affP+Gn3ymAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAiKB+EIihf0CIoX9AiKB+EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AADg/wAA4MMAAOCBAADggQAA8QEAAOeBAADDwwAAgf8AAIAPAACBDwAAgQ8AAMMPAAD//wAA//8AAA==" type="image/png">
		<style>
			@font-face {
	            font-family: 'Segoe UI Light';
        	    src: url( font/segoeuil.ttf ) format( 'truetype' );
	        }
			body{
				font-family: 'Segoe UI Light';
				margin-top: 3em;
				margin-bottom: 3em;
				margin-left: auto;
				margin-right: auto;
				width: 80%;
      			overflow-y: scroll;
      			overflow-x: auto;				
			}
			#gfx {
		    	width: 100%;
	            display: none;
			}
			#content {
		    	width: 100%;
	            display: none;
			}
			#error {
        	    text-align: center;
	            width: 100%;
        	    color: red;
        	    display: none;
			}
			.ui-input {
				padding: .4em .4em;
				display: inline-block;
				position: relative;
				line-height: normal;
				margin-right: .1em;
				cursor: pointer;
				vertical-align: middle;
				text-align: left;
				-webkit-user-select: none;
				-moz-user-select: none;
				-ms-user-select: none;
				user-select: none;

				/* Support: IE <= 11 */
				overflow: visible;
			}
			.ui-input,
			.ui-input:link,
			.ui-input:visited,
			.ui-input:hover,
			.ui-input:active {
				text-decoration: none;
			}

            .visibleInput {
                display: flex;
            }
		</style>

        <script type="module">
            const index = await import('/index.mjs')
            console.log('API', index)
        </script>
		<script type='text/javascript'>
			document.addEventListener('holdchart', (event) => {
				window["hold-chart"] = !window["hold-chart"];
				if ( window["hold-chart"] == false ) window["hold-buffer"] = undefined;
			}, {
				bubbles: true,
				composed: true,
			});

         document.addEventListener('goniometer', (event) => {
                const value = event.detail.value
                console.log('GONIOMETER', value)
            }, {
                bubbles: true,
                composed: true,
            });

            document.addEventListener('settingsInput', (event) => {
                const value = event.detail.value
                console.log('INPUT', value)
            }, {
                bubbles: true,
                composed: true,
            });

             document.addEventListener('settingsDelay', (event) => {
                const value = event.detail.value
                console.log('DELAY: ', value)
            }, {
                  bubbles: true,
                  composed: true,
            });

            document.addEventListener('settingsCheckbox', (event) => {
                const id = event.detail.id
                const value = event.detail.value
                console.log('Checkbox: ', id,  value)
            }, {
                  bubbles: true,
                  composed: true,
            });

            document.addEventListener('channels', (event) => {
				const value = event.detail.value
				console.log('channels: ',  value)
				window["rendertype"] = value;
            }, {
                  bubbles: true,
                  composed: true,
            });

			(function($)
			{
				$.fn.input = function (css)
				{
					if (!css) css = {};
					return this.each(function ()
					{
						$(this).addClass("ui-widget ui-widget-content ui-corner-all ui-input");
						$(this).css(css);
					});
				}
			})(jQuery);

			(function ($)
			{
				$.fn.label = function (css)
				{
					if (!css) css = {};
					return this.each(function ()
					{
						$(this).addClass("ui-widget ui-input");
						$(this).css(css);
					});
				}
			})(jQuery);

			window["isNumber"] = function(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

			window["rendertype"] = "stereo";
			window["nameoffile"] = "04891.mp3";

			window["hold-chart"] = false;
			window["hold-buffer"] = undefined;

			const SIZE_OF_FLOAT = 4;
			const SIZE_OF_SHORT = 2;
			const SIZE_OF_INT = 4;
			const SIZE_OF_DOUBLE = 8;

			jQuery(document).ready(function () 
			{	
				window.wasminit( "js/", function() {
					window.appinit();
				});
		
				let onchange_samplerate = function() {
					let value = $( "#sample-rate" ).spinner( "value" );
					value = window.isNumber( value ) ? value : 44100;
					$( "#sample-rate" ).spinner( "value", value );
					window.samplerate = parseFloat( value );					
				};

				let onchange_volumerate = function() {
					let value = $("#volume-rate").spinner( "value" );
					value = window.isNumber( value ) ? value : 1.000;
					$("#volume-rate").spinner( "value", value );
					window.volumerate = parseFloat( value );					
				};

				$( "#sample-rate" ).spinner({
					create: function( event, ui ){
						$( "#sample-rate" ).spinner( "value", 44100 );
						window.samplerate = 44100;
					},
					change: function( event, ui ) {
						onchange_samplerate();
					},
					min: 2000,
					max: 96000,
					step: 100,
					value: 44100,
				});

				$( "#sample-rate" ).click(function(){
					onchange_samplerate();
				});

				$( "#sample-rate" ).keyup(function(){
					if (event.keyCode === 13) {
						onchange_samplerate();
					}
				});

				$( "#volume-rate" ).spinner({
					create: function( event, ui ) {
						$("#volume-rate").spinner( "value", 1.000 );
						window.volumerate = 1.000;
					},
					change: function( event, ui ) {
						onchange_volumerate();
					},					
					min: 0.000,
					max: 1.000,
					step: 0.001,
					value: 1.0,
				});

				$( "#volume-rate" ).click( function() {
					onchange_volumerate();
				});

				$( "#volume-rate" ).keyup( function(){
					if (event.keyCode === 13) {
						onchange_volumerate();
					}
				});

				$( "#zoom-x" ).slider({
					create: function( event, ui ) {
						$("#zoom-x").slider( "value", 100 );
						window.zoomX = 100;
					},
					change: function( event, ui ) {
						$("#zoom-x-value").text( ui.value );
						window.zoomX = ui.value;
					},					
					slide: function( event, ui ) {
						$("#zoom-x-value").text( ui.value );
					},
					range: false,
					min: 100,
					max: 1000,
					step: 1
				});

				$( "#minimum-x" ).slider({
					create: function( event, ui ) {
						$("#minimum-x").slider( "value", 81 );
						window.kdX = 81;
					},
					change: function( event, ui ) {
						$("#minimum-x-value").text( ui.value );
						window.kdX = ui.value;
					},
					slide: function( event, ui ) {
						$("#minimum-x-value").text( ui.value );
					},					
					range: false,
					min: 9,
					max: 999,
					step: 2,
				});

				$( "#zoom-y" ).slider({
					create: function( event, ui ) {
						$("#zoom-y").slider( "value", 100 );
						window.zoomY = 100;
					},
					change: function( event, ui ) {
						$("#zoom-y-value").text( ui.value );
						window.zoomY = ui.value;
					},
					slide: function( event, ui ) {
						$("#zoom-y-value").text( ui.value );
					},					
					range: false,
					min: 100,
					max: 400,
					step: 1
				});

				$( "#minimum-y" ).slider( {
					create: function( event, ui ) {
						$("#minimum-y").slider( "value", 11 );
						window.kdY = 11;
					},
					change: function( event, ui ) {
						$("#minimum-y-value").text( ui.value );
						window.kdY = ui.value;
					},
					slide: function( event, ui ) {
						$("#minimum-y-value").text( ui.value );
					},							
					min: 9,
					max: 559,
					step: 2,
				});

				$( "#startplayback" ).button();
				$( "#stopplayback" ).button();

				$( "#chart" ).accordion({
					heightStyle: "content",
					collapsible: true
				});
				
				$( "#accordition" ).accordion({
					heightStyle: "content",
					collapsible: true
				});

				$( "#startplayback" ).click( function() {
					window.audioinit();
/*					
					let nameoffile = window["nameoffile"];
					window.loadfile( "sounds/" + nameoffile ).then( function( source ) 
					{
						let memdata = new Uint8Array( source );
						let memsize = memdata.length * memdata.BYTES_PER_ELEMENT;
						let memptr = window.malloc( memsize );
						window.assign( memdata, memptr );
						let retval = window.savefile( nameoffile, memptr, memsize );
						if ( retval > 0 ) {					
							window.startplayback( nameoffile );
						}
						if ( memptr > 0 ) window.free( memptr );
					});
*/
					
					window["nameoffile"] = "_temp_.wav";

					let channels = 2;
					let samplerate = window["samplerate"];
					let freq = 440;

					let duration = 30;
					let frames = duration * samplerate;

					let memdata = new Float32Array( frames * channels );

					for (let i = 0; i < frames; i++ ) {
						let time = i * duration / frames;
						memdata[i * channels + 0] = Math.sin(2.0 * Math.PI * time * freq);
						memdata[i * channels + 1] = Math.cos(2.0 * Math.PI * time * freq);
					}

					let u8memdata = new Uint8Array( memdata.buffer );

					let memsize = u8memdata.length * u8memdata.BYTES_PER_ELEMENT
					let memptr = window.malloc( memsize );

					window.assign( u8memdata, memptr );

					let retval = window.createfile( channels, samplerate, window["nameoffile"], memptr, memsize );
					if ( retval == memsize ) {	
						window.startplayback( window["nameoffile"] );
					}

					if ( memptr > 0 ) window.free( memptr );

				});

				$( "#stopplayback" ).click( function() {
					window.stopplayback();
				});
				
			});
		</script>
	</head>

	<body>	
		<div id="error">[ Your browser does not support WebGPU or it is not enabled ]</div>
		<div id="content">
		<webgpu-audio
		    data-field="settings-2"
		    data-services-path="webgpu"
		>
            <template>
                <body>
                <script src="/services/webgpu/src/component/webgpu-audio/views/mjs/audio/coi-serviceworker.js"></script
                    <div>
                        <h1>WebGPUAudio Experiment</h1>
                        <p>An experiment to use Web Audio API and WebGPU together to process audio stream with GPU.</p>

                        <div class="demo-box">
                          <div id="message-view" class="pb-3 text-sm whitespace-pre"></div>
                          <button id="toggle-audio" disabled>START</button>
                        </div>
                    </div>
                  </body>
            </template>
		</webgpu-audio>
		<div id="chart" class="settings">
			<h5>WebGPU график</h5>
			<div>
				<canvas id="gfx">&nbsp;</canvas>
			</div>
		</div>
		<div id="accordition" class="settings">
			<h5>Удержать картинку графика</h5>
			<div>
				<multi-switchrh data-field="settings-2" data-services-path="webgpu">
					<template>
						<div class="container">
							<fieldset data-field="holdchart" class="multiswitch" data-theme="stoplight">
								<legend>Удержать картинку графика</legend>
								<div class="slide-container">
									<input type="radio" name="holdchart" id="holdchart">
									<label for="holdchart">Удержать картинку</label>
									<a class="slide settings-3" aria-hidden="true"></a>
								</div>
							</fieldset>
						</div>
					</template>
				</multi-switchrh>
			</div>
			<h5>Goniometer</h5>
			<div>
				<multi-switchrh data-field="settings-2" data-services-path="webgpu">
					<template>
						<div class="container">
							<fieldset data-field="goniometer" class="multiswitch" data-theme="stoplight">
								<legend>Goniometer</legend>
								<div class="slide-container">
									<input type="radio" name="goniometer" id="off" checked>
									<label for="off">Выключено</label>
									<input type="radio" name="goniometer" id="on">
									<label for="on">Включено</label>
									<a class="slide settings-2" aria-hidden="true"></a>
								</div>
							</fieldset>
						</div>
					</template>
				</multi-switchrh>
			</div>
			<h5>Left/Stereo/Right</h5>
			<div>
				<multi-switchrh data-field="settings-2" data-services-path="webgpu">
					<template>
						<div class="container">
							<fieldset data-field="LCR" class="multiswitch" data-theme="stoplight">
								<legend>Left/Stereo/Right</legend>
								<div class="slide-container">
								<input type="radio" name="stoplight" id="left">
								<label id="left" for="left">Left</label>
								<input type="radio" name="stoplight" id="stereo"  checked>
								<label id="stereo" for="stereo">Stereo</label>
								<input type="radio" name="stoplight" id="right">
								<label id="right" for="right">Right</label>
								<a class="slide value" aria-hidden="true"></a>
								</div>
							</fieldset>
						</div>
					</template>
				</multi-switchrh>
			</div>
			<h5>Input Data</h5>
			<div>
				<multi-switchrh data-field="settings-1" data-services-path="webgpu">
					<template>
						<div class="container">
							<fieldset data-field="settingsInput" class="multiswitch" data-theme="stoplight">
								<legend>Input Data</legend>
								<div class="slide-container">
									<input type="radio" name="stoplight" id="audioInput" checked>
									<label for="audioInput">Audio</label>
									<input type="radio" name="stoplight" id="oscInput">
									<label for="oscInput">OSC</label>
									<input type="radio" name="stoplight" id="dataInput">
									<label for="dataInput">Data</label>
									<a class="slide value" aria-hidden="true"></a>
								</div>
							</fieldset>
						</div>
					</template>
				</multi-switchrh>
				<multi-switchrh data-field="settings-1" data-services-path="webgpu">
					<template>
						<div class="container">
							<fieldset data-field="settingsDelay" class="multiswitch">
								<legend>Sample position</legend>
								<div class="slide-container">
									<input type="radio" name="sample" id="sample-0">
									<label for="sample-0">-16</label>
									<input type="radio" name="sample" id="sample-1">
									<label for="sample-1">-15</label>
									<input type="radio" name="sample" id="sample-2">
									<label for="sample-2">-14</label>
									<input type="radio" name="sample" id="sample-3">
									<label for="sample-3">-13</label>
									<input type="radio" name="sample" id="sample-4">
									<label for="sample-4">-12</label>
									<input type="radio" name="sample" id="sample-5">
									<label for="sample-5">-11</label>
									<input type="radio" name="sample" id="sample-6">
									<label for="sample-6">-10</label>
									<input type="radio" name="sample" id="sample-7">
									<label for="sample-7">-9</label>
									<input type="radio" name="sample" id="sample-8" checked>
									<label for="sample-8">-8</label>
									<input type="radio" name="sample" id="sample-9">
									<label for="sample-9">-7</label>
									<input type="radio" name="sample" id="sample-10">
									<label for="sample-10">-6</label>
									<input type="radio" name="sample" id="sample-11">
									<label for="sample-11">-5</label>
									<input type="radio" name="sample" id="sample-12">
									<label for="sample-12">-4</label>
									<input type="radio" name="sample" id="sample-13">
									<label for="sample-13">-3</label>
									<input type="radio" name="sample" id="sample-14">
									<label for="sample-14">-2</label>
									<input type="radio" name="sample" id="sample-15">
									<label for="sample-15">-1</label>
									<input type="radio" name="sample" id="sample-16">
									<label for="sample-16">0</label>
									<a class="slide" aria-hidden="true"></a>
								</div>
							</fieldset>
						</div>
					</template>
				</multi-switchrh>
				<checklist-checkbox data-id="checkbox_0" data-services-path="webgpu">
					<template>
						<ul class="container">
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-0" type="checkbox">
								<label for="checkbox-0"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-1" type="checkbox">
								<label for="checkbox-1"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-2" type="checkbox">
								<label for="checkbox-2"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-3" type="checkbox">
								<label for="checkbox-3"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-4" type="checkbox">
								<label for="checkbox-4"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-5" type="checkbox">
								<label for="checkbox-5"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-6" type="checkbox">
								<label for="checkbox-6"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-7" type="checkbox">
								<label for="checkbox-7"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-8" type="checkbox" checked>
								<label for="checkbox-8"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-9" type="checkbox">
								<label for="checkbox-9"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-10" type="checkbox">
								<label for="checkbox-10"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-11" type="checkbox">
								<label for="checkbox-11"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-12" type="checkbox">
								<label for="checkbox-12"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-13" type="checkbox">
								<label for="checkbox-13"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-14" type="checkbox">
								<label for="checkbox-14"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-15" type="checkbox">
								<label for="checkbox-15"></label>
							</li>
							<li class="checkbox">
								<input class="custom-checkbox" id="checkbox-16" type="checkbox">
								<label for="checkbox-16"></label>
							</li>
						</ul>
					</template>
				</checklist-checkbox>
			</div>
			<h5>Параметры графика</h5>
			<div>
				<table style="width: 100%" cellpadding="0" cellspacing="8" >
					<tr>
						<td style="width: 100%">
							<label for="zoom-x">Масштаб по x:&nbsp;<span id="zoom-x-value">0</span></label>
							<div style="width: 100%;" id="zoom-x"></div>
						</td>
					</tr>
					<tr>
						<td style="width: 100%">
							<label for="minimum-x">Дискретное пространство по x:&nbsp;<span id="minimum-x-value">0</span></label>
							<div style="width: 100%;" id="minimum-x"></div>
						</td>
					</tr>
					<tr>
						<td style="width: 100%">
							<label for="zoom-y">Масштаб по y:&nbsp;<span id="zoom-y-value">0</span></label>
							<div style="width: 100%;" id="zoom-y"></div>
						</td>
					</tr>
					<tr>
						<td style="width: 100%">
							<label for="minimum-y">Дискретное пространство по y:&nbsp;<span id="minimum-y-value">0</span></label>
							<div style="width: 100%;" id="minimum-y"></div>
						</td>
					</tr>
				</table>
			</div>
			<h5>Воспроизведение файла</h5>
			<div>
				<table style="width: 100%" cellpadding="0" cellspacing="0" >
					<tr>
						<td style="width: 20%">
							<label for="sample-rate">Частота дискретизации:</label>
							<div><input style="width: 160px;" id="sample-rate"/></div>
						</td>
						<td style="width: 20%; text-align: left; padding-left: 10px">
							<label for="volume-rate">Величина громкости:</label>
							<div><input style="width: 140px;" id="volume-rate"/></div>
						</td>
						<td style="width: auto; text-align: left; padding-left: 10px">
							&nbsp;
						</td>
						<td style="width: 20%; text-align: right; vertical-align: bottom; padding-left: 10px">
							<input id="startplayback" type="button" style="width:200px;" value="Playback" />
						</td>
						<td style="width: 20%; text-align: right; vertical-align: bottom; padding-left: 10px">
							<input id="stopplayback" type="button" style="width:200px;" value="Stop" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		<nk-chart
		webgpu
            data-field="terminal_0"
            data-services-path="webgpu"
		>
		    <template>
		            <body>
                    <noscript>You need to enable JavaScript to run this app.</noscript>
                    <div id="root"></div>
                    <header>
                      <pre class="__peer-header_logo_value">
                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░░░░████░░░░░░█████░░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░░████████░░░███████░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░██████████░█████████░░░░░░░░░░░░░░░░░░░░░░░
                    ░░████████████░░█████░░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░██████████░░░░░█░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░░████████░░░░░░█████╗░██████╗░░██████╗░░░░░
                    ░░░░░░░░█████░░░░██╔══██╗██╔══██╗██╔════╝░░░░░
                    ░░░░░░█████████░░██║░░██║██████╔╝██║░░██╗░░░░░
                    ░░░░░███████████░██║░░██║██╔══██╗██║░░╚██╗░░░░
                    ░░░░░░█████████░░╚█████╔╝██║░░██║╚██████╔╝░░░░
                    ░░░░░░░███████░░░░╚════╝░╚═╝░░╚═╝░╚═════╝░░░░░
                    ░░░░░░░░░███░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</pre>
                        <div class="spinner" id='spinner'></div>
                        <div class="emscripten" id="status">Downloading...</div>
                        <span id='controls'>
                        <span><input type="checkbox" id="resize">Resize canvas</span>
                        <span><input type="checkbox" id="pointerLock" checked>Lock/hide mouse pointer</span>
                        <span><input type="button" value="Fullscreen" onclick="Module.requestFullscreen(document.getElementById('pointerLock').checked, document.getElementById('resize').checked)"></span>
                      </span>
                    </header>

                    <div class="emscripten">
                        <progress value="0" max="100" id="progress" hidden=1></progress>
                    </div>

                    <div class="emscripten_border">
                        <canvas
                          class="emscripten" id="canvas"
                          oncontextmenu="event.preventDefault()"
                          tabindex=-1
                        >
                        </canvas>
                    </div>
                    <div class="term"></div>
                    </body>
		    </template>
		</nk-chart>
	</body>
</html>
