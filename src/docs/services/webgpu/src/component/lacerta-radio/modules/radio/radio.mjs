const CONFIG = {
    audio: {
        ctx: false,
        analyser: false,
        waveform: false,
        master: {
            gain: false
        }
    },
    html: {
        scope: {
            canvas: false,
            context:false
        },
        button: {
            start: false,
            radios: {
                this: false,
                length: false
            }
        }
    },
    player: {
        start: false,
        stop: false,
        isPlaying: false
    },
    stream: {
        song: false,
        source: false,
        path: false,
    },
    web: {
        crossOrigin: 'anonymous'
    }
}

const newAudio = async (CONFIG) => {
    try {
        await CONFIG.stream.song.pause()
        CONFIG.stream.song = new Audio(CONFIG.stream.path)
        CONFIG.stream.source = CONFIG.audio.ctx.createMediaElementSource(CONFIG.stream.song)
        CONFIG.stream.song.crossOrigin = 'anonymous'
        await CONFIG.stream.source.connect(CONFIG.audio.master.gain)


        CONFIG.stream.song.addEventListener("canplay", async (event) => {
            await CONFIG.stream.song.play()

            /**
             *        CONFIG.stream.song.on('play', function() {
             *                 CONFIG.stream.song.on('data', function(chunk) {
             *                     console.log('@@@@@@@@@@@@@@@@@', chunk)
             *                     // stream.write(chunk);
             *                 });
             *             });
             * @type {string}
             */
            CONFIG.html.button.start.textContent = 'Stop Audio'
            return true
        });

        CONFIG.stream.song.addEventListener("canplaythrough", async (event) => {
            console.log('################ canplaythrough ################')
            // await CONFIG.stream.song.play()
            // CONFIG.html.button.start.textContent = 'Stop Audio'
            // return true
        });

    } catch (e) {
        CONFIG.html.button.start.textContent = 'Stop Audio'
        return true
    }
}

const drawOscilloscope = () => {
    CONFIG.html.scope.context = CONFIG.html.scope.canvas.getContext('2d')
    CONFIG.html.scope.canvas.width = CONFIG.audio.waveform.length
    CONFIG.html.scope.canvas.height = 200
    CONFIG.html.scope.context.clearRect(0, 0, CONFIG.html.scope.canvas.width, CONFIG.html.scope.canvas.height)
    CONFIG.html.scope.context.beginPath()
    for (let i = 0; i < CONFIG.audio.waveform.length; i++) {
        const x = i
        const y = (0.5 + (CONFIG.audio.waveform[i] / 2)) *  CONFIG.html.scope.canvas.height

        if (i === 0) {
            CONFIG.html.scope.context.moveTo(x, y)
        } else {
            CONFIG.html.scope.context.lineTo(x, y)
        }
    }
    CONFIG.audio.analyser.getFloatTimeDomainData(CONFIG.audio.waveform)
    CONFIG.html.scope.context.strokeStyle = '#5661FA'
    CONFIG.html.scope.context.lineWidth = 2
    CONFIG.html.scope.context.stroke()
    window.requestAnimationFrame(drawOscilloscope)
}

const ctx = async (CONFIG) => {
    CONFIG.audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
    CONFIG.audio.analyser =  CONFIG.audio.ctx.createAnalyser()
    CONFIG.audio.waveform = new Float32Array(CONFIG.audio.analyser.frequencyBinCount)
    await CONFIG.audio.analyser.getFloatTimeDomainData(CONFIG.audio.waveform)
    CONFIG.audio.master.gain = CONFIG.audio.ctx.createGain()
    await CONFIG.audio.master.gain.connect(CONFIG.audio.ctx.destination)
    await CONFIG.audio.master.gain.connect(CONFIG.audio.analyser)
}

const init = (self) => {
    CONFIG.html.scope.canvas = self['this']['shadowRoot'].querySelector('#oscilloscope')
    CONFIG.html.button.start = self['this']['shadowRoot'].querySelector('#start')
    CONFIG.html.button.radios.this = self['this']['shadowRoot'].querySelectorAll('input[name="radio-selection"]')
    CONFIG.html.button.radios.length = CONFIG.html.button.radios.this.length;
}

export default async () => {
    return new Promise((resolve, reject) => {
        class Radio {
            constructor(self) {
                init(self)
                for (let i = 0, max = CONFIG.html.button.radios.length; i < max; i++) {
                    if (CONFIG.html.button.radios.this[i].checked === true) {
                        CONFIG.stream.path = CONFIG.html.button.radios.this[i].value
                    }
                }

                CONFIG.stream.song = new Audio(CONFIG.stream.source)

                for (let i = 0, max = CONFIG.html.button.radios.length; i < max; i++) {
                    CONFIG.html.button.radios.this[i].addEventListener('change', async (event) => {
                        if (CONFIG.player.isPlaying) {
                            await CONFIG.stream.song.pause()
                            CONFIG.html.button.start.textContent = 'Start Audio'
                            CONFIG.player.isPlaying = !CONFIG.player.isPlaying
                            CONFIG.stream.path = event.target.value
                            if(CONFIG.audio.ctx) {
                                CONFIG.player.isPlaying = !CONFIG.player.isPlaying
                                await newAudio(CONFIG)
                            }
                        }
                    })
                }

                CONFIG.html.button.start.addEventListener('click', async (e) => {
                   console.log(CONFIG.player.isPlaying)

                    if (CONFIG.player.isPlaying) {
                        await CONFIG.stream.song.pause()
                        CONFIG.html.button.start.textContent = 'Start Audio'
                    } else {
                        await ctx(CONFIG)
                        await newAudio(CONFIG)
                        drawOscilloscope()
                    }
                    CONFIG.player.isPlaying = !CONFIG.player.isPlaying
                })
            }
        }
        resolve(Radio)
    })
}