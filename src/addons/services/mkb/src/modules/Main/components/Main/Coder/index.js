import React, { useContext, useEffect, useState } from 'react';
import style from './index.module.css';
import isEmpty from '../../../../../utilites/isEmpty';
import { useSelector } from 'react-redux';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { UserContext } from '@src/App';
import {search} from "../../../../../utilites/search";
import {href} from "../../../../../utilites/Icd-11";

export const getCode = {
    coordination: [],
    isEmpty: [],
    property: (result, code) => {
        if(!isEmpty(code.property)) {
            for(let property of code.property) {
                if(property.substrate === '/') {
                    getCode.isEmpty.push('/')
                } else {
                    result.self = `${result.self}${property.substrate?`&${property.substrate}`:''}`
                }
            }
        }
        return result.self
    },
    all: (code) => {
        let result = {}
        result.self = ''
        for(let i  = 0; i < code.length; ++i) {
            if(!i) {
                const isEmptyItem = isEmpty(code[i].substrate.trim())
                if(!isEmptyItem) {
                    let data = code[i].substrate
                    if(!isEmpty(code[i].relation)) {
                        data = code[i].relation[0].current
                    }
                    result.self = data
                    result.self = getCode.property(result, code[i])
                } else {
                    getCode.isEmpty.push('/')
                }
            } else {
                const isEmptyItem = isEmpty(code[i].substrate.trim())
                if(!isEmptyItem) {
                    result.self = `${result.self}/${code[i].substrate.trim()}`
                    result.self = getCode.property(result, code[i])
                } else {
                    getCode.isEmpty.push('/')
                }

            }
        }

        result.self = `${result.self}${getCode.isEmpty.join('')}`
        getCode.isEmpty = []
        return result
    }
}

export const Coder = ({getCodes, onClickHeandler}) => {
    const coordination = useSelector(state => state.icd.coordination.coordination)
    const [selectedCode, setSelectedCode] = useState('');
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const { userInfo } = useContext(UserContext);
    const [isButtonCode, setIsButtonCode] = useState(true);
    const codes = getCode.all(coordination)

    useEffect(() => {
        const windowOpen = (event) => {
            if(event.data.status === true) {
                window.opener = null
                setIsButtonCode(false)
                console.log('-- MESSAGE ----', event)
            }
        }

        window.addEventListener ("message", windowOpen);

        return () => {
            window.removeEventListener("message", windowOpen);
        };
    }, []);
    const handlerOnClick = (event) => {
        const axis =  encodeURIComponent(codes.self)
        const url = new URL(`${window.location.origin}/comparison?axis=${axis}`)
        window.opener.postMessage({
            link: window.location.pathname,
            status: true,
            code: codes.self
        })
    }

    useEffect(() => {
        setSelectedCode(codes.self)
        getCodes(codes)
    })

    useEffect(() => {
        if(selectedCode) {
            const user = !isEmpty(userInfo) ? userInfo.email : anonUser
            window.localStorage.setItem('isSearchResult', false);
        }
    }, [selectedCode])

    const isButton = (codes.self.split('&').length + codes.self.split('/').length) !== 2 && window.opener !== null

    return(
        <div
            className={style.postCoordinationCodeList}
        >
            <div className={style.container}>
                <p>Код:</p>
                <div
                    className={style.code}
                    onClick={onClickHeandler}
                >
                    {codes.self}
                </div>
            </div>
            {isButton && isButtonCode &&
                <div
                    onClick={handlerOnClick}
                    className={style.button}
                >
                {'Выбрать код'}
            </div>}
        </div>
    )
}

export default Coder;
