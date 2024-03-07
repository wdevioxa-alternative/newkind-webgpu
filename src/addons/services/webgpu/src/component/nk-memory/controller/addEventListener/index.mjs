export default async (self, actions) => {
    let mount = self.shadowRoot.querySelector('#mount')

    console.log('MEMORY')
    return {
        init: () => {
            mount.addEventListener('click', actions.mount.click)
        },
        terminate: () => {
            mount.removeEventListener('fer-button-in', actions.mount.click)
        }
    }
}