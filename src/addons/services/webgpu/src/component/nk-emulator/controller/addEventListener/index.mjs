import {RENDER_QUANTUM, KERNEL_LENGTH, FRAME_SIZE, QUEUE_SIZE, WORKGROUP_SIZE} from '../../../nk-radio/modules/radio/constants.js'
import {Reader} from '../../views/index.mjs'
export default async (self, actions) => {
    const start = self.shadowRoot.querySelector('.start')
    const startSample = self.shadowRoot.querySelector('.start-sample')

    const settings = self.shadowRoot.querySelectorAll('.settings')
    const containerFrame = self.shadowRoot.querySelector('.frames')
    const array = containerFrame.querySelector('.array')
    const frameArray = 128
    const active = 50
    for(let i =0; i < frameArray;++i) {
        array.insertAdjacentHTML('beforeend', `<div class="frame item-${i}"><span class="value ${active === i ? 'active': ''}">🟧</span></div>`)
    }

    let duration = 30
    let freq = 440
    let channels = 1
    let frames = duration * window["samplerate"]
    let memdata = frames * channels
    let samplerate = window["samplerate"]
    let volumerate = window["volumerate"]

    settings.forEach(item => {
        switch (item.id) {
            case 'RENDER_QUANTUM':
                item.querySelector('span').textContent = RENDER_QUANTUM
                break
            case 'KERNEL_LENGTH':
                item.querySelector('span').textContent = KERNEL_LENGTH
                break
            case 'FRAME_SIZE':
                item.querySelector('span').textContent = FRAME_SIZE
                break
            case 'QUEUE_SIZE':
                item.querySelector('span').textContent = QUEUE_SIZE
                break
            case 'WORKGROUP_SIZE':
                item.querySelector('span').textContent = WORKGROUP_SIZE
                break
            case 'samplerate':
                item.querySelector('span').textContent = samplerate
                break
            case 'volumerate':
                item.querySelector('span').textContent = volumerate
                break
            case 'channels':
                item.querySelector('span').textContent = channels
                break
            case 'duration':
                item.querySelector('span').textContent = duration
                break
            case 'frames':
                item.querySelector('span').textContent = frames
                break
            case 'memdata':
                item.querySelector('span').textContent = memdata
                break
            case 'freq':
                item.querySelector('span').textContent = freq
                break
            default:
                // console.error('Константа не определенна')
                break

        }
    })

    const reader = await Reader(self)
    reader.init()
    console.log('-------------------- reader --------------------', reader)
    console.log('EMULATOR')
    return {
        init: () => {
            startSample.addEventListener('click', actions.sample.click)
            start.addEventListener('click', actions.click)
        },
        terminate: () => {
            startSample.removeEventListener('click', actions.sample.click)
            start.removeEventListener('fer-button-in', actions.click)
        }
    }
}