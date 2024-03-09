import React, {useState,useRef, useEffect} from 'react';

import style from './index.module.css';
import InputSearch from '@src/components/InputSearch';
import ModalResultSearch from "@src/components/ModalResultSearch";
import ModalResultSearchNull from "@src/components/ModalResultSearchNull";
import { search } from '@src/utilites/search';
let children = Symbol.for("children");

export const InputSearchWithRelease = (props) => {
    const { setDeseaseData, releaseGroup, releaseId, releaseLang } = props
    const [typeInputSearch, _setTypeInputSearch] = useState('input-search');
    const [wordForAddBySearchInInput, setWordForAddBySearchInInput] = useState('');
    const [isIconLoupe, setIsIconLoupe] = useState(false);
    const [text, setText] = useState('');
    const [isMainModalResultSearch, setIsMainModalResultSearch] = useState(false);
    const [infoMainModalResultSearch, setInfoMainModalResultSearch] = useState();
    const [isMainModalResultSearchNull, setIsMainModalResultSearchNull] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    window.localStorage.setItem('releaseGroup', releaseGroup)
    window.localStorage.setItem('releaseId', releaseId )
    window.localStorage.setItem('releaseLang', releaseLang)

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsMainModalResultSearch(false)
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const resultMainSearch = async (value, type) => {
        try {
            if(value && releaseGroup.length !== 0 && releaseId.length !== 0 && releaseLang.length !== 0) {
                window.localStorage.setItem('releaseGroup', releaseGroup)
                window.localStorage.setItem('releaseId', releaseId )
                window.localStorage.setItem('releaseLang', releaseLang)

                // const releaseGroup = window.localStorage.getItem('releaseGroup')
                // const releaseId = window.localStorage.getItem('releaseId')
                // const releaseLang = window.localStorage.getItem('releaseLang')
                const responseWord = await search.getResultMain(value, [], [], {
                    status: true,
                    releaseGroup: releaseGroup,
                    releaseId: releaseId,
                    releaseLang: releaseLang
                }, {isAdmin: true});

                let response = [];
                let responseCode;

                if (value.length < 8 && responseWord.length === 0) {
                    responseCode = await search.api.apiSearchCode(value.toUpperCase(), {
                        status: true,
                        releaseGroup: releaseGroup,
                        releaseId: releaseId
                    });

                    if (responseCode.length > 0) {
                        response = responseCode
                    }
                }

                if (responseWord.length > 0) {
                    response = responseWord
                }

                if (response && response.length > 0) {
                    setIsMainModalResultSearch(true);
                    setInfoMainModalResultSearch(response);
                    setIsMainModalResultSearchNull(false);
                } else if (response && response.length === 0 && value.length >= 3) {
                    setIsMainModalResultSearch(false);
                    setIsMainModalResultSearchNull(false);
                    setInfoMainModalResultSearch();
                } else {
                    setIsMainModalResultSearch(false);
                    setIsMainModalResultSearchNull(true);
                    setInfoMainModalResultSearch();
                }
            }
        } catch (e) {
            console.error(e)
        }
    };

    const onClickCloseMainModalResultSearch = async (disease) => {
        try {
            // console.trace()
            console.log('------------- GET RESULT onClickCloseMainModalResultSearch', disease.entity)
            setDeseaseData(disease)
            setIsMainModalResultSearch(false);
            setIsMainModalResultSearchNull(false);
            setInfoMainModalResultSearch();
        } catch (e) {
            console.error('/v1/code/version/icd11/comparison', e)
        }
    };

    return (<div className={style.container}>
        <InputSearch
            placeholder={'Укажите код диагноза по МКБ-11'}
            className={style}
            typeModule={'admin'}
            isIconLoupe={isIconLoupe}
            inputValue={async (event) => {
                await resultMainSearch(text, 'admin')
            }}
            typeInputSearch={typeInputSearch}
            setText={setText}
            text={text}
            isOnlyEn={false}
            wordForAddBySearchInInput={wordForAddBySearchInInput}
        />
        {isMainModalResultSearch && (
            <div
                ref={wrapperRef}
            >
                <ModalResultSearch
                    view='mainWrapper'
                    className={style}
                    diseases={infoMainModalResultSearch}
                    onClickCloseMainModalResultSearch={onClickCloseMainModalResultSearch}
                />
            </div>
        )}
        {isMainModalResultSearchNull && (
            <div>
                <ModalResultSearchNull
                    className={style}
                    view='mainWrapper'
                />
            </div>
        )}
    </div>)
};

export default InputSearchWithRelease;
