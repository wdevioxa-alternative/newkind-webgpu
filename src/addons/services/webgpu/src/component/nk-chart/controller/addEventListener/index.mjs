import {Terminal} from '../../views/index.mjs'

export default async (self, actions) => {
    const terminal = Terminal(self)
    let mount = self.shadowRoot.querySelector('#mount')

    console.log('STREEM', terminal, mount)
    return {
        init: () => {
            mount.addEventListener('click', actions.mount.click)
        },
        terminate: () => {
            mount.removeEventListener('fer-button-in', actions.mount.click)
        }
    }
}