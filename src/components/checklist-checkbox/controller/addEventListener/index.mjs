import { readable } from '../../../modules/index.mjs'
export default async (self, actions) => {
    const inputs = self.shadowRoot.querySelectorAll('input')

    console.log('========= readable ============', readable)
    return {
        init: () => {
            for(let item of inputs) {
                item.addEventListener('click', actions.click)
            }
        },
        terminate: () => {
            for(let item of inputs) {
                item.removeEventListener('fer-button-in', actions.click)
            }
        }
    }
}