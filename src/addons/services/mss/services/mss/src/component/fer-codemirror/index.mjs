import { onload } from '../../this/index.mjs';

const COMPONENT = 'fer-codemirror'
const INDEX =  class extends HTMLElement {
  static get observedAttributes() {
    return ['disabled', 'open', 'class', 'backpropagation'];
  }

  _doRender() {
    if(this._state.tree) {
      console.log('     🔵 RENDER')
    }
  }

  setValue(value) {
    let data = value
    if (this.editor) {
      this.editor.setValue(data);
    } else {
      // console.warn('🔴🔴');
      let timerId = setInterval(() => {
        if (this.editor) {
          // console.log('🔴🔴🔴', data);
          this.editor.setValue(data);
          clearInterval(timerId);
        }
      }, 30);
    }
  }

  refresh(value) {
    let timeId = null
    let data = value
    if (this.editor) {
      timeId = setTimeout(() => {
        clearTimeout(timeId)
        this.editor.refresh()
      }, 0)
    } else {
      timeId = setInterval(() => {
        if (this.editor) {
          // console.log('🔴🔴🔴🔴');
          clearTimeout(timeId)
          this.editor.refresh()
        }
      }, 30);
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

  set class(val) {
    if (val) {
    } else {
    }
  }

  get class() {
    return this.hasAttribute('open');
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '');
      this.classList.add('skeleton')
    } else {
      this.removeAttribute('open');
      this.classList.remove('skeleton')
    }
  }

  get open() {
    return this.hasAttribute('open');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }
  constructor () {
    super()
    if (!this.dataset.servicesPath) {
      console.error('Надо устновить атрибут: data-services-path что бы можно было отличить компоненты, относящиеся к разным сервисам и назначить обработчики определенного сервиса', this)
      return
    }

    this.controller = {}
    this._isOnload = false;
    this._state = {
      rule: {
        functionBase64Encoded:''
      },
      schema: {
        jsonSchema: undefined
      }
    };

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
        controller = await controller(self, await actions(self))
        self.controller.addEventListener = await controller.addEventListener.init()
      })
      .catch(e => console.error('error', e))
  }
  disconnectedCallback() {
    this.controller.addEventListener.terminate()
    console.log(`     🔴 COMPONENTS ${this.tagName} disconnected`)
  }
}

if(customElements.get(COMPONENT) === undefined) { customElements.define(COMPONENT, INDEX ) };
export default {
  component: COMPONENT,
  description: `Компонент ${COMPONENT}`,
}