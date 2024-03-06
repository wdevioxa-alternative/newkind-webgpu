import {Terminal} from '../views/index.mjs'
export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        const terminal = await Terminal(self)

        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        resolve({
            mount: {
                click: async (event) => {
                    console.trace()
                    console.log('<<<<< @@@@@@@@@@@@@@@@@@@@@@ >>>>>')
                }
            }
        });
    });
};

export default {
    description: 'action'
};