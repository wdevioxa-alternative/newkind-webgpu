import {RENDER_QUANTUM, KERNEL_LENGTH, FRAME_SIZE, QUEUE_SIZE, WORKGROUP_SIZE} from '../../../nk-radio/modules/radio/constants.js'
export default async (self, actions) => {
    const start = self.shadowRoot.querySelector('.start')
    const settings = self.shadowRoot.querySelectorAll('.settings')
    const containerFrame = self.shadowRoot.querySelector('.frames')
    const array = containerFrame.querySelector('.array')
    const frameArray = 128
    const active = 50
    for(let i =0; i < frameArray;++i) {
        array.insertAdjacentHTML('beforeend', `<div class="frame item-${i}"><span class="value ${active === i ? 'active': ''}">🟧</span></div>`)
    }

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
            default:
                console.error('Константа не определенна')
                break

        }
    })
    console.log('EMULATOR')
    return {
        init: () => {
            start.addEventListener('click', actions.click)
        },
        terminate: () => {
            start.removeEventListener('fer-button-in', actions.click)
        }
    }
}