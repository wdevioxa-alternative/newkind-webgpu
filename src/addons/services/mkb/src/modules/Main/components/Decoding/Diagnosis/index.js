import React, { useContext } from 'react';
import style from './index.module.css';
import { idKey } from '../../../../../utilites/idKey';
import {Link} from "react-router-dom";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { UserContext } from '@src/App';
import isEmpty from "@src/utilites/isEmpty";
const warning = "ИГНОРИРУЕТСЯ, т.к. данный выбор не имеет кода и поэтому не может использоватся в качестве значения для посткоординации"

export const Diagnosis = ({ isError = false, code, children, id, isActive, isNextLayer, postcoordination, name, isBlock, onClick, isLayer, title}) => {
    const {userInfo} = useContext(UserContext);
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const stats = (code) => {
        const user = !isEmpty(userInfo) ? userInfo.email : anonUser
        analytics.page();
        analytics.identify(user, {
            userAgent: window.navigator.userAgent,
            deseaseCode: code,
            action: 'select_entity_from_decoding_result'
        })
    }

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
                        {`${code}`}<span
                      onClick={() => {
                          stats(code)
                      }}
                      className={`${style.editorDescription} ${isError ? style.isError : ''}`}> {`${title}`}</span>
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
