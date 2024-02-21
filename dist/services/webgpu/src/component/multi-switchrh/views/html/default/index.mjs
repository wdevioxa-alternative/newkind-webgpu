<<<<<<< HEAD
import {loadHTML} from '../index.mjs'

let components = new Map();

components.set('default', [{
    type: 'component',
    template: async (slot, props = {}) => {
        let template = ''
        let keys = []
        switch(slot) { 
            default:
                return `<div>test</div>`
            break
        }
    }
}])
=======
import {loadHTML} from '../index.mjs'

let components = new Map();

components.set('default', [{
    type: 'component',
    template: async (slot, props = {}) => {
        let template = ''
        let keys = []
        switch(slot) { 
            default:
                return `<div>test</div>`
            break
        }
    }
}])
>>>>>>> 01ce6be67cb59e817833882aafe2b0471ee77a58
export default components