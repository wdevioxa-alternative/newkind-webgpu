export default async (self, actions) => {
    const start = self.shadowRoot.querySelector('.start')

    return {
        init: () => {
            document.addEventListener('next-frame', actions.bus.frame)
            start.addEventListener('click', actions.click)
        },
        terminate: () => {
            document.removeEventListener('next-frame', actions.bus.frame)
            start.removeEventListener('click', actions.click)
        }
    }
}