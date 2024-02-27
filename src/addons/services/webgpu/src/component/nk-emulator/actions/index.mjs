import {processor} from '../views/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {

        resolve({
            click: async (event) => {
                processor()
            }
        });
    });
};

export default {
    description: 'action'
};