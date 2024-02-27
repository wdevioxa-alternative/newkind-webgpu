import {processor} from '../../views/index.mjs'

export default async (self, actions) => {

    console.log('PROCESSOR')
    return {
        init: () => {
            // mount.addEventListener('click', actions.mount.click)
        },
        terminate: () => {
            // mount.removeEventListener('fer-button-in', actions.mount.click)
        }
    }
}