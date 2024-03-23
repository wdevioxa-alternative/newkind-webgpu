export default async (self, actions) => {
    const displaySample = self.shadowRoot.querySelector('.display.sample')
    const start = self.shadowRoot.querySelector('.start')
    const startSample = self.shadowRoot.querySelector('.start-sample')
    const containerFrame = self.shadowRoot.querySelector('.frames')
    const array = containerFrame.querySelector('.array')
    const frameArray = 100
    const active = -1

    for(let i =0; i < frameArray;++i) {
        array.insertAdjacentHTML('beforeend', `<div class="frame item-${i} ${active === i ? 'active': ''}"><span class="value">🟧</span></div>`)
    }



    console.log('EMULATOR')
    return {
        init: () => {
            document.addEventListener('next-frame', actions.bus.frame)
            startSample.addEventListener('click', actions.sample.click)
            start.addEventListener('click', actions.click)
        },
        terminate: () => {
            document.removeEventListener('next-frame', actions.bus.frame)
            startSample.removeEventListener('click', actions.sample.click)
            start.removeEventListener('fer-button-in', actions.click)
        }
    }
}