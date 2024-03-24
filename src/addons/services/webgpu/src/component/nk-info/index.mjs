import { onload, init } from '../../this/index.mjs';
import { actions } from './actions/index.mjs'
import { controller } from './controller/index.mjs'

// const COMPONENT = path.dirname(import.meta.url).split(path.sep).pop()
const COMPONENT = 'nk-info';

const defaultState = {

};
const INDEX = class extends HTMLElement {
    static get observedAttributes () {
        return ['disabled', 'open'];
    }

    _doRender (path, newValue, oldValue) {
        switch (path) {
        case 'isVerification':
            if (newValue !== oldValue) {
                this.querySelector('fer-hash[data-hash="verification"]').open = newValue;
            }
            break;
        default:
            break;
        }
        if (this._state.tree) {
            console.log('     🔵 RENDER');
        }
    }

    cleanState (path, exclude = []) {
        if(path === 'all') {
            for(let key in this._state) {
                if(!exclude.some(item => item === key)) {
                    this._state[key] = structuredClone(defaultState[key])
                }
            }
        } else {
            if (!this._state.hasOwnProperty(path)) {
                alert(`Свойтсва ${path} нет в стейте`);
                console.assert(false, `надо определить свойство ${path} в стейте`, {
                    state: this._state
                });
            } else {
                this._state[path] = structuredClone(defaultState[path]);
            }
        }
    }

    getState (path) {
        return  structuredClone(this._state[`${path}`]);
    }

    setState (path, value) {
        if (!this._state.hasOwnProperty(path)) {
            alert(`надо определить свойство ${path} в стейте`);
            console.assert(false, `надо определить свойство ${path} в стейте`, {
                state: this._state
            });

        } else {
            const oldVlue = this._state[path];
            if (value === 'undefined') {
                this._state[path] = undefined;
                this._doRender(path, value, oldVlue);
                return undefined;
            } else {
                if (this._state[path] !== value || this._state[path] === false) {
                    this._state[`${path}`] = value;
                    this._doRender(path, value, oldVlue);
                    return value;
                }
            }
        }
    }

    set open (val) {
        if (val) {
            this.setAttribute('open', '');
        } else {
            this.removeAttribute('open');
        }
    }

    get open () {
        return this.hasAttribute('open');
    }

    set disabled (val) {
        if (val) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get disabled () {
        return this.hasAttribute('disabled');
    }

    constructor () {
        super();
        if (!this.dataset.servicesPath) {
            console.error('Надо устновить атрибут: data-services-path что бы можно было отличить компоненты, относящиеся к разным сервисам и назначить обработчики определенного сервиса', this);
            return;
        }

        this.controller = {};
        this._isOnload = false;
        this._state = { };
        this._doRender = this._doRender.bind(this);

        init(this).then(self => (self._isOnload = true)).catch(error => console.warn('error', error));
        // import(`/services/${this.dataset.servicesPath}/src/this/init/init/index.mjs`)
        //     .then(data => {
        //         data.init(this).then(self => (self._isOnload = true)).catch(error => console.warn('error', error));
        //     });
    }

    connectedCallback () {
        onload(this)
            .then(async (self) => {
                // const { actions } = await import(`/services/${self.dataset.servicesPath}/src/component/${COMPONENT}/actions/index.mjs`);
                // let { controller } = await import(`/services/${self.dataset.servicesPath}/src/component/${COMPONENT}/controller/index.mjs`);
                self.controller = await controller(self, await actions(self));
                await self.controller.addEventListener.init();
            })
            .catch(e => console.error('error', e));
    }

    disconnectedCallback () {
        this.controller.addEventListener.terminate();
        console.log(`     🔴 COMPONENTS ${this.tagName} disconnected`);
    }
};

if (customElements.get(COMPONENT) === undefined) {
    customElements.define(COMPONENT, INDEX);
}
;
export default {
    component: COMPONENT,
    description: `Компонент ${COMPONENT}`
};