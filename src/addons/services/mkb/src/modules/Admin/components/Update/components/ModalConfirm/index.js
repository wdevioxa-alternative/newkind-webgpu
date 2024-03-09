import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { MainButton, SecondButton } from '@src/components/Button/Button';
import style from './index.module.css';
import attention from './assets/attention.svg';
import close from './assets/close.svg';

import './index.css';

const colorScheme = {
  'error': '#C61C1C',
  'info': '#FDA52C',
}

export const ModalConfirm = props => {
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

  useEffect(() => {
    setIsDisabled(props.isDisabledMainBtn);
  }, [props.isDisabledMainBtn]);

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div className="modal" onClick={props.onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className={style.container}>
            <div style={{ background: colorScheme[props.type] || '' }} className={style.header}>
              <div className={style.attention}>
                {props.type !== 'info' && <img src={attention}></img>}{props.title || 'Внимание!'}{' '}
              </div>
              <div
                className={style.close}
                onClick={() => {
                  props.onClose();;
                }}
              >
                <img src={close}></img>
              </div>
            </div>
            <div className={style.body}>
              {props.text}
            </div>
            <div className="modal-footer confirm">
              {props.type === 'warning' && <>

                <div style={{ display: 'inline-block', marginRight: '15px' }}>
                  <MainButton
                    bgColor={props.type === 'warning' ? '#fda52c' : ''}
                    buttonLabel={'Да'}
                    buttonHandler={props.onSubmit}
                  />
                </div>
                <SecondButton
                  buttonLabel={'Нет'}
                  buttonHandler={() => {
                    props.onClose();
                    //  setCachedConfig(null)
                  }}
                />
              </>}
            </div>
          </div>

        </div>
      </div>
      {/* </div> */}
    </CSSTransition >,
    document.getElementById('root'),
  );
};
