import {store} from '../../../this/index.mjs'

export const actions = (self) => {
    return new Promise(async (resolve, reject) => {

        resolve({
            click: (event) => {
                event.stopPropagation()
                // self.setAttribute('checked', true)
                // const customCheckbox = self.shadowRoot.querySelector('.custom-checkbox')
                // const input = self.shadowRoot.querySelector('input')
                //
                // input.setAttribute("checked", true);
                // customCheckbox.setAttribute("checked", true);
                // self.setAttribute("checked", true);

                // console.log('---------------------- CLICK CHECKBOX --------------------------------', customCheckbox)
            }
        })
    })
}

export default {
    description: 'action'
}