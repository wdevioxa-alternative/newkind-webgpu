import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { MainButton, SecondButton } from '@src/components/Button/Button';

import './index.css';

export const Modal = props => {
  const [isDisabled, setIsDisabled] = useState(false);
  const closeOnEscapeKeyDown = e => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  useEffect(() => { setIsDisabled(props.isDisabledMainBtn) }, [props.isDisabledMainBtn])

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h4 className="modal-title">{props.title}</h4>
          </div>
          <div className="modal-body"><textarea
            maxlength="2048"
            autoFocus
            type="text"
            className={'moveReason'}
            onChange={e => (props.onChange(e.target.value.trim()))}
          /></div>
          <div className="modal-footer"><div style={{ display: 'inline-block', marginRight: '15px' }}>
            <MainButton
              isDisabled={isDisabled}
              buttonLabel={'Сохранить'}
              buttonHandler={props.onSubmit}
            />
          </div>
            <SecondButton
              buttonLabel={'Отменить'}
              buttonHandler={() => {
                props.onClose()
                //  setCachedConfig(null)
              }}
            /></div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root'),
  );
};
