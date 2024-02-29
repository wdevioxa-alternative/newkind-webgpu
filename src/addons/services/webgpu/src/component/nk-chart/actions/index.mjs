import {Terminal} from '../views/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        const terminal = await Terminal(self)

        resolve({
            mount: {
                click: async (event) => {

                    console.log('<<<<< @@@@@@@@@@@@@@@@@@@@@@ >>>>>', terminal)
                }
            }
        });
    });
};

export default {
    description: 'action'
};