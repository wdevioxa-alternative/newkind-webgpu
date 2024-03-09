import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import style from './index.module.css';
import { SecondButton } from '../Button/Button';
import CopyLineCode from '../CopyLineCode';

import store from '../../store';
import {idKey} from "../../utilites/idKey";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { getUserInfo } from '@src/modules/api';
function CopyLine({setCodingModal, codeDiseaseChoice}) {
	const [pageCode, setPageCode] = useState()
    // const [user_id, setManuallyUpdated] = useLocalStorage('__user_id', '');
    const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
    const [userInfo, setUserInfo] = useState(undefined);

	store.subscribe(() => setPageCode(store.getState().icd.codes.codes.self));

    useEffect(() => {
        if (accessToken) {
            getUserInfo(accessToken)
                .then(data => {
                    console.log('🧡Main/components/Decoding💚[(A)UserInfo]💚', data.data)
                    setUserInfo(data.data)})
                .catch(error => {
                    console.log(error);
                })
        } else {
            setUserInfo(undefined)
        }
    }, [])

    const buttonHandler = () => {
        analytics.page();
        let selectedCode = pageCode

        // if(user_id) {
        //     analytics.identify(userInfo ? userInfo.email : user_id, {
        //         userAgent: window.navigator.userAgent,
        //         type: 'coding',
        //         email: userInfo ? userInfo.email: '',
        //         deseaseCode: selectedCode,
        //         noDCode: false
        //     })
        // } else {
        //     analytics.identify(`user-id-${idKey()}`, {
        //         userAgent: window.navigator.userAgent,
        //         type: 'coding',
        //         email: userInfo.email ? userInfo.email: '',
        //         deseaseCode: selectedCode,
        //         noDCode: false
        //     })
        // }

			navigator.clipboard.writeText(pageCode);
			codeDiseaseChoice(pageCode)
			setCodingModal(prev => !prev)
    };

  return (
    <div className={style.wrapper}>
      <div className={style.codeContainer}>
        <CopyLineCode pageCode={pageCode} />
      </div>
      <div className={style.buttonContainer}>
        <SecondButton buttonHandler={buttonHandler} buttonLabel="Выбрать" />
      </div>
    </div>
  );
}

export default CopyLine;
