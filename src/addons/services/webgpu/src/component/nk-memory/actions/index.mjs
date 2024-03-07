export const actions = (self) => {
    return new Promise(async (resolve, reject) => {

        resolve({
            mount: {
                click: async (event) => {

                    console.log('<<<<< @@@@@@@@@@@@@@@@@@@@@@ >>>>>')
                }
            }
        });
    });
};

export default {
    description: 'action'
};