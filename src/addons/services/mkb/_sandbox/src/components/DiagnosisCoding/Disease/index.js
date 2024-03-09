import React, { useCallback, useState, useEffect, useContext } from 'react';
import style from './index.module.css';

import { idKey } from '../../../utilites/idKey';

import JMarker from '../../img/JMarker';
import KMarker from '../../img/KMarker';
import EqualsMarker from '../../img/EqualsMarker';
import PlusMarker from '../../img/PlusMarker';
import ResultInsert from '../ResultInsert/index';
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { getUserInfo } from '@src/modules/api';
import isEmpty from "../../../utilites/isEmpty";
import { UserContext } from '@src/App';

function Disease({ ismobileleftmenu, setmobileleftmenu, diseases, codeDiseaseChoice }) {
	const [typeOpen, setTypeOpen] = useState('');
  const [insert, setInsert] = useState(false);
  const [isBlueTitle, setIsBlueTitle] = useState(diseases.entity.isBlueTitle);
  // const [userInfoStorage, setUserInfoStorage] = useLocalStorage('__userInfo', undefined);
  const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
  // const [accessToken, setAccessToken] = useLocalStorage('accessToken', null);
  // const [userInfo, setUserInfo] = useState(undefined);
  const {userInfo} = useContext(UserContext);
  // console.log(userContextValue);
  const closeInsert = (event) => {
      const user = !isEmpty(userInfo) ? userInfo.email : anonUser
      analytics.page();
      analytics.identify(user, {
          userAgent: window.navigator.userAgent,
          deseaseCode: diseases.uri,
          action: 'coding_select_entity'
      })
			setTypeOpen(event.currentTarget.dataset.type);
      setInsert(!insert);
  };

    // useEffect(() => {
    //     if (accessToken) {
    //         getUserInfo(accessToken)
    //             .then(data => {
    //                 setUserInfo(data.data)})
    //             .catch(error => {
    //                 console.log(error);
    //             })
    //     } else {
    //         setUserInfo(undefined)
    //     }
    // }, [])
  const onClickHandler = event => {
      let selectedCode = event.currentTarget.dataset.cod
      // console.log('-------------- userInfoStorage ----- selectedCode ----------------', userInfoStorage, selectedCode)

      const user = !isEmpty(userInfo) ? userInfo.email : anonUser
      analytics.page();
      analytics.identify(user, {
          userAgent: window.navigator.userAgent,
          deseaseCode: selectedCode,
          action: 'coding_click_code_entity'
      })

      navigator.clipboard.writeText(event.currentTarget.dataset.cod);
      codeDiseaseChoice(event.currentTarget.dataset.cod);
  };

  return (
    <div data-cod={diseases.entity.code} className={style.container}>
      <div className={isBlueTitle ? style.upBlockBlue : style.upBlock}>
        {/* выводится код болезни */}
        <div
          data-cod={diseases.entity.code}
          className={style.code}
          onClick={onClickHandler}
        >
          {diseases.entity.code}
        </div>

        {/* выводится имя болезни с подкрашенным искомым словом */}
        <div
          data-cod={diseases.entity.code}
          className={style.word}
          onClick={onClickHandler}
          dangerouslySetInnerHTML={{ __html: diseases.title }}
        ></div>

        <div className={style.link}>
          {(diseases.entity.postcoordinationScale) && (
            <>
              {diseases.entity.postcoordinationScale[0]
								.requiredPostcoordination ? (
									<div className={style.marker} typemark="plusNecessarily" data-type="plusmarker">
										<PlusMarker color="#FACDAC" onClick={closeInsert} />
									</div>
								) : (
									<div className={style.marker} typemark="plusMaby">
                		<PlusMarker color="#EAEAEA" onClick={closeInsert} />
									</div>
              )}
            </>
          )}

          {/* если есть отсылка к главе о материнстве */}
          {(diseases.entity.relatedEntitiesInMaternalChapter && diseases.entity.relatedEntitiesInMaternalChapter.length > 0) && (
            <div className={style.marker} onClick={closeInsert} typemark="jmark" data-type="jmarker">
              <JMarker />
            </div>
          )}

          {/* если есть отсылка к перинатальной главе */}
          {(diseases.entity.relatedEntitiesInPerinatalChapter && diseases.entity.relatedEntitiesInPerinatalChapter.length > 0) && (
            <div className={style.marker} onClick={closeInsert} typemark="kmark" data-type="kmarker">
              <KMarker />
            </div>
          )}

          {/* если есть примечания */}
          {diseases.entity.codingNote['@value'] && (
            <div className={style.marker} onClick={closeInsert} typemark="equals" data-type="equalsmarker">
              <EqualsMarker />
            </div>
          )}

          <div className={style.marker} typemark="details">
            <div className={style.title} onClick={closeInsert} data-type="details">
              Подробнее
            </div>
          </div>
        </div>
      </div>
      <div className={style.downBlock}>
        {insert && (
          <ResultInsert
						ismobileleftmenu={ismobileleftmenu}
						setmobileleftmenu={setmobileleftmenu}
						closeInsert={closeInsert}
						diseases={diseases}
						typeOpen={typeOpen}
						codeDiseaseChoice={codeDiseaseChoice}
          />
        )}
          {(!insert && diseases.entity.indexTerm && diseases.entity.indexTerm.length) ? (
            <div
              className={
                diseases.entity.indexTerm[0].label.isBlueIndexTerm ? style.iTermBlue : style.iTerm
              }
              key={idKey()}
              dangerouslySetInnerHTML={{ __html: diseases.entity.indexTerm[0].label['@value'] }}
            ></div>) : (<></>)}
      </div>
    </div>
  );
}

export default Disease;
