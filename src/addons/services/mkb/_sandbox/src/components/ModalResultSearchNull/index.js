import React from 'react';
import style from './index.module.css';

function ModalResultSearchNull() {
  return (
    <div className={style.nullWrapper}>
			<div className={style.text}>
				Поиск не дал никаких результатов
			</div>
    </div>
  );
}

export default ModalResultSearchNull;
