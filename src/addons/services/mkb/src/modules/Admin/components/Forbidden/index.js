import React from 'react'
import forbidden from './assets/forbidden.svg'
import style from './index.module.css';

export const Forbidden = () => {
  return (
    <div className={style.forbiddenPage}>
        <div className={style.container}>

        <img src={forbidden} />
        <div className={style.title}>Доступ запрещен. </div>
        <div className={style.subtitle}>Пожалуйста, обратитесь в службу технической поддержки.</div>
        <div className={style.contacts}>Тел: <span>8-800-500-74-78</span><br />
Электронная почта: <span>egisz@stp-egisz.ru</span></div>
        </div>
    </div>
  )
}
