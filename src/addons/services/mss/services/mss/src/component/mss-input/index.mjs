import { onload } from '../../this/index.mjs';

const COMPONENT = 'mss-input';
const INDEX = class extends HTMLElement {
    static get observedAttributes () {
        return ['disabled', 'open', 'backpropagation'];
    }

    _doRender (path, newValue, oldValue) {

    }

    cleanState (path) {
        if (!this._state.hasOwnProperty(path)) {
            alert(`Свойтсва ${path} нет в стейте`);
            console.assert(false, `надо определить свойство ${path} в стейте`, {
                state: this._state
            });
        } else {
            this._state[path] = structuredClone(defaultState[path]);
        }
    }

    getState (path) {
        return this._state[path];
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
                    this._state[path] = value;
                    this._doRender(path, value, oldVlue);
                    return value;
                } else {

                }
            }
        }
    }

    set clean (val) {
        this.shadowRoot.querySelector('input').value = ''
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

    set terminate (val) {
        this.controller.addEventListener.terminate();
    }

    set init (val) {
        this.controller.addEventListener.init();
    }

    constructor () {
        super();
        if (!this.dataset.servicesPath) {
            console.error('Надо устновить атрибут: data-services-path что бы можно было отличить компоненты, относящиеся к разным сервисам и назначить обработчики определенного сервиса', this);
            return;
        }

        this.controller = {};
        this._isOnload = false;
        this._state = {
            directory: {
                'active': true,
                'createdAt': '2023-10-30T19:40:20.847Z',
                'directoryId': '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                'code': 'string',
                'name': 'string'
            }
        };

        this._doRender = this._doRender.bind(this);

        import(`/services/${this.dataset.servicesPath}/src/this/init/init/index.mjs`)
            .then(data => {
                data.init(this).then(self => (self._isOnload = true)).catch(error => console.warn('error', error));
            });
    }

    connectedCallback () {
        onload(this)
            .then(async (self) => {
                const { actions } = await import(`/services/${self.dataset.servicesPath}/src/component/${COMPONENT}/actions/index.mjs`);
                let { controller } = await import(`/services/${self.dataset.servicesPath}/src/component/${COMPONENT}/controller/index.mjs`);
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
};

export default {
    component: COMPONENT,
    description: `Компонент ${COMPONENT}`
};