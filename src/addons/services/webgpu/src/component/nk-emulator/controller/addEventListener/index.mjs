export default async (self, actions) => {

    const start = self.shadowRoot.querySelector('.start')
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