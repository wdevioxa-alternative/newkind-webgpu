import React from 'react'
import style from './index.module.css'

export default () => {

    return (
        <div className={style.body}>
            <div className={style.item}>
                <div className={style.content}>
                    <div className={style.paragraph}>
										Функция поиска выполнит поиск только в родственных областях. Вы можете просмотреть разрешенные значения, щелкнув мышью по пиктограмме.
                    </div>
                </div>
            </div>
        </div>)
}
