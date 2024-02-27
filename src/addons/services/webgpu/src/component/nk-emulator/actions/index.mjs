import {emulator} from '../views/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {
        const apiEmulator = await emulator()

        resolve({
            click: async (event) => {
                event.currentTarget.classList.toggle('active')
                if(event.currentTarget.classList.contains('active')) {
                    event.currentTarget.textContent = 'Стоп'
                    apiEmulator.start(self)
                } else {
                    event.currentTarget.textContent = 'Старт'
                    apiEmulator.stop(self)
                    // console.clear();
                }
            }
        });
    });
};

export default {
    description: 'action'
};