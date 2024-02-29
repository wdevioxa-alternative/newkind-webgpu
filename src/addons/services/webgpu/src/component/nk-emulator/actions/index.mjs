import {Line, OSC} from '../views/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        const line = await Line(self)
        // const osc = await OSC(self)
        // await osc.init()
        // await osc.start()

        resolve({
            click: async (event) => {
                event.currentTarget.classList.toggle('active')
                if(event.currentTarget.classList.contains('active')) {
                    event.currentTarget.textContent = 'Стоп'
                    line.start(self)
                } else {
                    event.currentTarget.textContent = 'Старт'
                    line.stop(self)
                    // console.clear();
                }
            }
        });
    });
};

export default {
    description: 'action'
};