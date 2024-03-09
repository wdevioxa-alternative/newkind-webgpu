import { onload } from '../../this/index.mjs'
import {store} from '../../this/index.mjs'

// const COMPONENT = path.dirname(import.meta.url).split(path.sep).pop()
const COMPONENT = 'checklist-checkbox'
const INDEX =  class extends HTMLElement {
  static get observedAttributes() {
    return [ 'checked' ];
  }
  _doRender() {
    if(this._state.tree) {
      console.log('     🔵 RENDER')
    }
  }
  getState(path) {
    return this._state[path];
  }

  setState(path, value) {
    if(!this._state.hasOwnProperty(path)) {
      alert(`надо определить свойство ${path} в стейте`)
      console.assert(false, `надо определить свойство ${path} в стейте`, {
        state: this._state
      })
      
    } else {
      if (this._state[path] !== value) {
        this._state[path] = value;
        this._doRender();
      }
    }
  }
  load = () => document.dispatchEvent(new CustomEvent(`component-onload`, {
      bubbles: true,
      composed: true,
      detail: {
        dataset: {
          id: this.dataset.id
        }
      }
    }));

  set checked (val) {
    console.log('-------------------- CHECKED -------------------------', val)
  }

  constructor () {
    super()
    if (!this.dataset.servicesPath || !this.dataset.id) {
      console.error('Надо устновить атрибут: data-services-path и data-id что бы можно было отличить компоненты, относящиеся к разным сервисам и назначить обработчики определенного сервиса', this)
      return
    }

    this.controller = {}
    this._isOnload = false;
    this._state = { };
    this._doRender = this._doRender.bind(this);

    import(`/services/${this.dataset.servicesPath}/src/this/init/init/index.mjs`)
      .then(data => {
        data.init(this).then(self => (self._isOnload = true)).catch(error => console.warn('error', error))
      })
  }
  connectedCallback() {
    onload(this)
      .then(async (self) => {
        const { actions } = await import(`/services/${self.dataset.servicesPath}/src/component/${COMPONENT}/actions/index.mjs`)
        let {controller} = await import(`/services/${self.dataset.servicesPath}/src/component/${COMPONENT}/controller/index.mjs`)
        self.controller = await controller(self, await actions(self))
        await self.controller.addEventListener.init()
        const inputs = this.shadowRoot.querySelectorAll('input')
       // console.log('inputs', this)
        // debugger
        // for(let item of inputs) {
        //   const status = store.get(item.id)
        //   if(status) {
        //     item.checked = true
        //   }
        // }
        this.load()
      })
      .catch(e => console.error('error', e))
  }
  disconnectedCallback() {
    console.log(`     🔴 COMPONENTS ${this.tagName} disconnected`, this.controller.addEventListener)
    this?.controller?.addEventListener?.terminate()
  }
}

if(customElements.get(COMPONENT) === undefined) { customElements.define(COMPONENT, INDEX ) };
export default {
  component: COMPONENT,
  description: `Компонент ${COMPONENT}`,
}