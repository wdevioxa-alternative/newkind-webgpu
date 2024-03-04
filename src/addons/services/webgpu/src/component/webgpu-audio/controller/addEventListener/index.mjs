import {gpuAudio} from '../../views/index.mjs'

export default async (self, actions) => {
    await gpuAudio(self, actions)

    return {
        init: () => {

        },
        terminate: () => {

        }
    }
}