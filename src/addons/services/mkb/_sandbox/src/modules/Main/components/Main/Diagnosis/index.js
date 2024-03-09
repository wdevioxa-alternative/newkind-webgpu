import React from 'react';
import style from './index.module.css';
import CircleCross from '../../../../../components/img/CircleCross/CircleCross';
import { idKey } from '../../../../../utilites/idKey';

// const warning = '((IGNORED as the selection does not have a code and therefore cannot be used as a postcoordination value))'
const warning = "ИГНОРИРУЕТСЯ, т.к. данный выбор не имеет кода и поэтому не может использоватся в качестве значения для посткоординации"

export const Diagnosis = ({children, isNextLayer, postcoordination, name, isBlock, onClick, isLayer, title}) => {
    return(
        <div key={idKey()} className={`${isNextLayer ? style.editorItemSecond : style.editorItem}`}>
           <div className={`${style.itemAxisData} ${style.itemAxisDataSecond}`}>
               <div className={style.editorDescription}><strong>{name}</strong></div>
               <div
                   onClick={onClick}
               >
                   <CircleCross className={style.editorButton} />
               </div>
           </div>
            {isBlock ? (<div className={style.itemAxisWarning}>{ warning }</div>) : ''}
            {children}
        </div>
    )
}
