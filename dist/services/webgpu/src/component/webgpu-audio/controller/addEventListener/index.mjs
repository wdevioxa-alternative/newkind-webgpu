import {gpuAudio} from '../../views/index.mjs'

export default async (self, actions) => {
    gpuAudio()

    return {
        init: () => {

        },
        terminate: () => {

        }
    }
}