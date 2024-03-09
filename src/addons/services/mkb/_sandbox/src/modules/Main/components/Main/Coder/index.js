import React, {useEffect, useState, useContext} from 'react';
import style from './index.module.css';
import isEmpty from "../../../../../utilites/isEmpty";
import { useSelector } from "react-redux";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { UserContext } from '@src/App';

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
    const [copySuccess, setCopySuccess] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    // const [user_id, setManuallyUpdated] = useLocalStorage('__user_id', '');
    // const [userInfo, setUserInfo] = useState(undefined);
    // const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
    // const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', null)
    // const [userInfoStorage, setUserInfoStorage] = useLocalStorage('__userInfo', undefined);
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext); 

    // const copyToClipBoard = async event => {
    //     try {
    //         await navigator.clipboard.writeText(event.currentTarget.textContent);
    //         setCopySuccess('Copied!');
    //     } catch (err) {
    //         setCopySuccess('Failed to copy!');
    //     }
    // };

    const codes = getCode.all(coordination)

    useEffect(() => {
        setSelectedCode(codes.self)
        getCodes(codes)
    })

    // useEffect(() => {
    //     if (accessToken) {
    //         getUserInfo(accessToken)
    //             .then(data => {
    //                 setUserInfo(data.data)})
    //             .catch(error => {
    //                 console.log(error);
    //                 if(refreshToken) getRefreshToken(refreshToken)
    //                             .then(data => {
    //                                 console.log('=== USER INFO ====', data.data)
    //                                 setAccessToken(data.data.accessToken);
    //                                 setRefreshToken(data.data.refreshToken);
    //                                 setUserInfo(data.data.userinfo);
    //                                 setUserInfoStorage(data.data.userinfo);
    //                             })
    //                             .catch(error => console.log(error))
    //             })
    //     } else {
    //         setUserInfo(undefined)
    //     }
    // }, [])

    useEffect(() => {
        if(selectedCode) {
            const user = !isEmpty(userInfo) ? userInfo.email : anonUser
            analytics.page();
            analytics.identify(user, {
                userAgent: window.navigator.userAgent,
                deseaseCode: selectedCode,
                action: 'coding_select_entity'
            })
        }
    }, [selectedCode])

    return(
        <div
            className={style.postCoordinationCodeList}
        >
            <p>Код:</p>
          <div
            className={style.code}
            onClick={onClickHeandler}
          >
              {codes.self}
          </div>
        </div>
    )
}

export default Coder;
