export default async (self, actions) => {

    let mount = self.shadowRoot.querySelector('#mount')

    return {
        init: () => {
            mount.addEventListener('click', actions.mount.click)
        },
        terminate: () => {
            mount.removeEventListener('fer-button-in', actions.mount.click)
        }
    }
}