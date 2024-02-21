import {terminal} from '../../views/index.mjs'

export default async (self, actions) => {
    terminal(self)

    return {
        init: () => {

        },
        terminate: () => {

        }
    }
}