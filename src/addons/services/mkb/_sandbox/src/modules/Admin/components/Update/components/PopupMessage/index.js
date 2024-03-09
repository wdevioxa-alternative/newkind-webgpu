import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import error from './assets/error.svg'
import close from './assets/close.svg'

import './index.css';

export const PopupMessage = props => {
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
        <div className="container" onClick={e => e.stopPropagation()}>
          <div className="header">
            <div className='attention'>
              <img src={error}></img> {props.title}
            </div>
            <div
              className='close'
              onClick={props.onClose}
            >
              <img src={close}></img>
            </div>
          </div>
          <div className='body'>
            {props.text}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root'),
  );
};
