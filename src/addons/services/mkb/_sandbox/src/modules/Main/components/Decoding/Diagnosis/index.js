import React from 'react';
import style from './index.module.css';
import { idKey } from '../../../../../utilites/idKey';
import {Link} from "react-router-dom";

const warning = "ИГНОРИРУЕТСЯ, т.к. данный выбор не имеет кода и поэтому не может использоватся в качестве значения для посткоординации"

export const Diagnosis = ({ isError = false, code, children, id, isActive, isNextLayer, postcoordination, name, isBlock, onClick, isLayer, title}) => {

    return(
        <div
            key={idKey()}
            className={`${isNextLayer ? style.editorItemSecond : style.editorItem}`}
        >
            <div className={`${isActive ? style.itemAxisDataActive : '' } ${style.itemAxisData} ${style.itemAxisDataSecond} ${isError ? style.isError : ''}`}>
                {id ? (
                    <Link
                        to={ id }
                        target={"_blank"}
                        className={`${style.editorDescription} ${isError ? style.isError : ''}`}
                    >
                        {`${code}`}<span className={`${style.editorDescription} ${isError ? style.isError : ''}`}> {`${title}`}</span>
                    </Link>
                ) : (
                   <div
                       className={`${style.editorDescription} ${isError ? style.isError : ''}`}
                   >
                       {code}
                       <span
                           className={`${style.editorDescription} ${isError ? style.isError : ''}`}
                       >
                           {title}
                       </span>
                   </div>
                )}
            </div>
            {isBlock ? (<div className={style.itemAxisWarning}>{ warning }</div>) : ''}
            {children}
        </div>
    )
}
