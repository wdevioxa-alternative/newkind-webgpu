import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { href } from '../../../utilites/Icd-11';

import style from './index.module.css';
import {useDispatch} from "react-redux";
import {tocActions} from "../../../modules/Main/reducers/tableOfContent";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import isEmpty from "../../../utilites/isEmpty";
import {getCode} from "../../../modules/Main/components/Main/Coder";
import { UserContext } from '@src/App';

function IndexTermModalResultSearch({ setToc, setExpand, setUpdateToc, term, i = 1, onClickOpen = () => {}, disease, isDescendant }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [userInfoStorage, setUserInfoStorage] = useLocalStorage('__userInfo', undefined);
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext);

    const onClickHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        onClickOpen();
    };

	const onClickNavigate = event => {
		event.preventDefault();

        let request = {
            pathname: new URL(`${window.location.origin}${disease.uri}`).pathname,
            href: new URL(`${window.location.origin}${disease.uri}`).href
        }

        const user = !isEmpty(userInfo) ? userInfo.email : anonUser
        analytics.page();
        analytics.identify(user, {
            userAgent: window.navigator.userAgent,
            deseaseCode: request,
            action: 'select_entity_from_search_results'
        })

        navigate(href.decoder(disease.uri, window.location.pathname === '/coding' ? 'coding': 'page'))
        dispatch(
            tocActions.fetchSearch({
                pathname: request,
                type: "window",
                cb: (error, content) => {
                    if (error) {
                        console.log('error', error)
                        return;
                    }
                    setToc(content.data)
                    setExpand(content.expand)
                    setUpdateToc(undefined)
                }
            })
        );
    }

  const [isNull, setIsNull] = useState();
  useEffect(() => {
    if (i === 0) {
      setIsNull(true);
    }
  });
	if (disease) {

		if (isDescendant) {
			return (
				<div className={style.wrapper}>
				<div
					className={style.iTerm}
					onClick={onClickNavigate}
					dangerouslySetInnerHTML={{ __html: term.label['@value'] }}
				></div>
			</div>

				)
		}

  return (
    <>
      {isNull ? (
        <div className={style.wrapper}>
          <div
            className={style.iTerm}
            onClick={onClickNavigate}
            dangerouslySetInnerHTML={{ __html: term.label['@value'] }}
          ></div>
          <div className={style.icon} onClick={onClickHandler}>
            ▤
          </div>
        </div>
      ) : (
        <div className={style.wrapper}>
          <div
            className={style.iTerm}
            onClick={onClickNavigate}
            dangerouslySetInnerHTML={{ __html: term.label['@value'] }}
          ></div>
        </div>
      )}
    </>
  );
}
}

export default IndexTermModalResultSearch;
