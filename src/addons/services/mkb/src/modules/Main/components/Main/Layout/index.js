import style from './index.module.css';
import './index.css';
import { search } from '../../../../../utilites/search';
import { checkList } from '../../../../../config';
import React, {useState, useEffect, useRef, useLayoutEffect, useCallback} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';

import { tocActions } from '../../../reducers/tableOfContent';
import { TreeViews } from './TreeViews';
import { ModalWindow } from '../../../../../components/modal';
import InputSearch from '../../../../../components/InputSearch';
import InputSearchExtend from '../../../../../components/InputSearchExtend';

import CrossHelp from '../../../../../components/img/CrossHelp/CrossHelp';
import Close from '../../../../../components/img/Close';
import { IconEye } from './Icons/IconEye';
import { IconColspan } from './Icons/IconColspan';
import { ExtendedSearch } from '../../../../../components/modal/template';

// import ModalResultSearchField from '../../../../../components/ModalResultSearchField';
import ModalResultSearch from '../../../../../components/ModalResultSearch';
import ModalResultSearchNull from '../../../../../components/ModalResultSearchNull';
import {Breadcrumbs} from '../../../../../components/Breadcrumbs'
import { SideBar } from '../../../../../components/img/SideBar'
import {isDesktop, isMobile, isTablet} from "react-device-detect";

import CheckBoxModal from '../../../../../components/CheckBoxModal';
import {idKey} from "../../../../../utilites/idKey";

import {getApi} from '../../../../../utilites/API'
import {useNavigate} from "react-router-dom";
import { SecondButton } from '../../../../../components/Button/Button';
import ResultSearchField from '../../../../../components/ResultSearchField';

const HEIGHT_HEADER = 20;
const HEIGHT_FOOTER = 30;
const HEIGHT_HEADER_FOOTER = HEIGHT_HEADER + HEIGHT_FOOTER;

export const Layout = ({ setAncestor, currentTocData, className = {}, type, uri, children, updatePage, conceptPage, ismobileleftmenu, setmobileleftmenu}) => {
    const navigate = useNavigate();
    const aside = useRef(null)
    const tocPage = useRef(null);
    const useLayoutContainer = useRef(null);
    const [isChildElsewhere, setChildElsewhere] = useState(true)
    const chapters = useSelector(state => state.icd.toc.chapter)
    const dispatch = useDispatch();
    const [expand, setExpand] = useState([1]);
    const [isModal, setModal] = useState(false);
    const [text, setText] = useState('');
    const dialog = React.useRef(null);
    const [isOpenSearch, setOpenSearch] = useState(false);
    const [typeInputSearch, _setTypeInputSearch] = useState('input-search');
    const [updateToc, setUpdateToc] = useState(undefined)
    const [checked, setChecked] = useState([]);
    const API_DATA = getApi()
    const [toc, setToc] = useState([{
        children:[1],
        id: 0,
        name:"",
        parent: null
    }, {
        id: 1,
        parent: 0,
        link:`/v1/icd/release/11/${API_DATA.Release}/mms`
    }
    ]);

    const [isMainModalResultSearch, setIsMainModalResultSearch] = useState(false);
    const [infoMainModalResultSearch, setInfoMainModalResultSearch] = useState();
    const [isMainModalResultSearchNull, setIsMainModalResultSearchNull] = useState(false);

    const [isExtendModalResultSearch, setIsExtendModalResultSearch] = useState(false);
		const [infoExtendModalResultSearch, setInfoExtendModalResultSearch] = useState();
		const [classContentShort, setClassContentShort] = useState('');

    useEffect(() => {
        if (isMainModalResultSearch) {
            document.addEventListener('click', () => setIsMainModalResultSearch(false))
            return document.removeEventListener('click', () => setIsMainModalResultSearch(false))
        }
    }, [isMainModalResultSearch])

    useEffect(() => {
        let request = {
            pathname: window.location.pathname,
            href: window.location.href
        }

        if(window.location.pathname === '/coding'
            ||  window.location.pathname === '/coding/'
            ||  window.location.pathname === '/testing/coding'
            ||  window.location.pathname === '/testing/coding/') {
            request.pathname = uri
            request.href = `${window.location.origin}${uri}`
        }

        dispatch(
            tocActions.fetchChapter({
                pathname: request,
                type: type,
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
    }, []);

    useEffect(() => {
        if(currentTocData) {
            let currentID = currentTocData.pathname.substring(currentTocData.pathname.lastIndexOf('/') + 1)
            let items = aside.current.querySelectorAll('[data-id]')
            for(let i = 0; i < items.length; ++i) {
                let item = items[i].querySelector('.isActive')
                if(item !== null) {
                    item.classList.remove('isActive')
                }
            }

            let index = 0
            const current = chapters.find((item, i) => {
              if(item.link) {
                  if(item.link.indexOf(currentID) !== -1) {
                      index = i
                      return  true
                  }

                  return false
              } else {
                  return false
              }
            })

            setAncestor(false)
            navigate(currentTocData.pathname)
        }
    }, [currentTocData]);

    const setState = () => {
        if(isOpenSearch) {
            dialog.current.classList.add("selected")
            dialog.current.classList.remove("dismiss")
        } else {
            dialog.current.classList.add("dismiss")
            dialog.current.classList.remove("selected")
        }
    }

    const closeSearch = (event) => {
        setOpenSearch(!isOpenSearch);
        setState()
    }

    const resultMainSearch = async (value) => {
        try {
            if(value) {
                let response = [];
                const responseWord = await search.getResultMain(value);
                let responseCode;
                if (value.length < 8) {
                    responseCode = await search.api.apiSearchCode(value);
                    if (responseCode.length > 0) {
                        response = responseCode;
                    }
                }
                if (responseWord.length > 0) {
                    response = responseWord;
                }
                if (response && response.length > 0) {
                    setIsMainModalResultSearchNull(false);
                    setIsMainModalResultSearch(true);
                    setInfoMainModalResultSearch(response);
                } else if (response && response.length === 0 && value.length >= 3) {
                    setIsMainModalResultSearch(false);
                    setIsMainModalResultSearchNull(true);
                    setInfoMainModalResultSearch();
                } else {
                    setIsMainModalResultSearchNull(false);
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                }
            } else {
                setIsMainModalResultSearchNull(false);
                setIsMainModalResultSearch(false);
                setInfoMainModalResultSearch();

            }
        } catch (err) {
            console.log(err);
        }
    };

    const [inputExtendValue, setInputExtendValue] = useState('');
    const resultExtendSearch = (value) => {
        if (!value) {
          setIsExtendModalResultSearch(false);
					setInfoExtendModalResultSearch();
					setClassContentShort('')
        } else {
            setInputExtendValue(value);
        }
    };

    const onClickCloseMainModalResultSearch = () => {
        setIsMainModalResultSearch(false);
        setInfoMainModalResultSearch();
    };

    const onClickCloseExtendModalResultSearch = () => {
      setIsExtendModalResultSearch(false);
			setInfoExtendModalResultSearch();
			setClassContentShort('');
    };

    const onclickHandler = async () => {
        try {
            const response = await search.getResultForAdvancedSearch(inputExtendValue, checked);
            if (response && response.length > 0) {
              setIsExtendModalResultSearch(true);
							setInfoExtendModalResultSearch(response);
							setClassContentShort('contentShort');
            } else {
              setIsExtendModalResultSearch(false);
							setInfoExtendModalResultSearch();
							setClassContentShort('');
            }
        } catch (err) {
            console.log(err);
        }
    }
    const onclickDownHandler = async (event) => {
        if (event.keyCode === 13) {
            try {
                const response = await search.getResultForAdvancedSearch(inputExtendValue, checked);
                if (response && response.length > 0) {
                  setIsExtendModalResultSearch(true);
									setInfoExtendModalResultSearch(response);
									setClassContentShort('contentShort');
                } else {
                  setIsExtendModalResultSearch(false);
									setInfoExtendModalResultSearch();
									setClassContentShort('');
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    const onclickSearchHandler = (event) => {
        setOpenSearch(!isOpenSearch);
        event.preventDefault();
        setState();
    }
    const onClickHelpHandler = (event) => {
        event.preventDefault()
        setModal(!isModal)
    }
    const [checkedRu, setCheckedRu] = useState([]);
    const onResetAllHandler = (event) => {
        event.preventDefault();
        event.target.checked = false;
        handleCheck(event);
    }
    const onSelectAllHandler = (event) => {
        event.preventDefault();
        event.target.checked = true;
        handleCheck(event);
    }
    const handleCheck = useCallback((event) => {
        let updatedList = [...checked];
        let updatedListRu = [...checkedRu];

        if (event.target.checked) {
            switch(event.target.dataset.text) {
                case 'Название':
                    updatedList.push('FieldTitle');
                    updatedListRu.push('Название');
                    break;
                case 'Синоним':
                    updatedList.push('FieldSynonym');
                    updatedListRu.push('Синоним');
                    break;
                case 'Описание':
                    updatedList.push('FieldDefinition');
                    updatedListRu.push('Описание');
                    break;
                case 'Включение':
                    updatedList.push('FieldInclusion');
                    updatedListRu.push('Включение');
                    break;
                case 'Исключение':
                    updatedList.push('FieldExclusion');
                    updatedListRu.push('Исключение');
                    break;
                case 'all':
                    updatedList = [];
                    updatedListRu = [];
                    updatedList.push('FieldExclusion');
                    updatedList.push('FieldInclusion');
                    updatedList.push('FieldDefinition');
                    updatedList.push('FieldSynonym');
                    updatedList.push('FieldTitle');
                    updatedListRu.push('Название');
                    updatedListRu.push('Синоним');
                    updatedListRu.push('Описание');
                    updatedListRu.push('Включение');
                    updatedListRu.push('Исключение');
                    break;
            }
        } else {
            switch(event.target.dataset.text) {
                case 'Название':
                    updatedList.splice(checked.indexOf('FieldTitle'), 1);
                    updatedListRu.splice(checkedRu.indexOf('Название'), 1);
                    break;
                case 'Синоним':
                    updatedList.splice(checked.indexOf('FieldSynonym'), 1);
                    updatedListRu.splice(checkedRu.indexOf('Синоним'), 1);
                    break;
                case 'Описание':
                    updatedList.splice(checked.indexOf('FieldDefinition'), 1);
                    updatedListRu.splice(checkedRu.indexOf('Описание'), 1);
                    break;
                case 'Включение':
                    updatedList.splice(checked.indexOf('FieldInclusion'), 1);
                    updatedListRu.splice(checkedRu.indexOf('Включение'), 1);
                    break;
                case 'Исключение':
                    updatedList.splice(checked.indexOf('FieldExclusion'), 1);
                    updatedListRu.splice(checkedRu.indexOf('Исключение'), 1);
                    break;
                case 'nothing':
                    // updatedList = [...checked, 'FieldExclusion'];
                    updatedList = [];
                    updatedListRu = [];
                    break;
            }
        }
        setChecked(updatedList);
        setCheckedRu(updatedListRu);
    });


    const checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    let isChecked = (item) => (checked.includes(item) ? "checked-item" : "not-checked-item")

    useEffect(() => {
        if(updateToc) {
            if(!(toc[updateToc.id].children.length - 1)) {
                dispatch(
                    tocActions.fetchChildren({
                        type: 'chapter',
                        link: updateToc.link,
                        isFoundationChildElsewhere: updateToc.isFoundationChildElsewhere,
                        classKind: updateToc.classKind,
                        id: updateToc.id,
                        previous: toc,
                        child: updateToc.child,
                        cb: (error, content) => {
                            if (error) {
                                console.log('error', error)
                                return;
                            }

                            setToc(previous => {
                                return [...content.data]
                            })
                        }
                    })
                );
            }
        }
    }, [updateToc]);

    const onColspanHandler = (event) => {
        event.preventDefault()
        setExpand([1])
    }

    const onGrayDataHandler = (event) => {
        setChildElsewhere(!isChildElsewhere)
    }

    return (
        <div
            ref={useLayoutContainer}
            className={`${style.container}`}
        >
            {isModal ? (
                <ModalWindow
                    setModal={setModal}
                    isModal={isModal}
                >
                    <ExtendedSearch />
                </ModalWindow>
            ) : ''}
            {type !== 'window' &&
                <div ref={dialog} className={style.dialog} >
                    <div className={style.header}>
                        <div className={style.titleHeader}>Расширенный поиск</div>
                        <div
                            onClick={closeSearch}
                        >
                            <Close className={style.icon}/>
                        </div>
                    </div>
                    <hr />
                    <div className={style.searchContainer}>
                        <div className={style.searchEnhance}>
                            <div onKeyDown={onclickDownHandler} className={style.searchExtend}>
                                <InputSearchExtend
                                    className={style}
                                    inputValue={resultExtendSearch}
                                    typeInputSearch={typeInputSearch}
                                    setText={setText}
                                    text={text}
                                />
                            </div>
                            <div
                                onClick={onClickHelpHandler}
                                className={style.help}
                            >
                                <CrossHelp className={style.crossHelp} />
                            </div>
                        </div>
                        <div className={style.searchWarning}>Пожалуйста, проверьте свойства, которые вы хотели бы включить в поиск</div>
                        <div className={style.searchButton}>
                            <div
                                onClick={onSelectAllHandler}
                                className={style.searchItem}
                                data-text='all'
                            >
                                Выбрать все
                            </div>
                            <div
                                onClick={onResetAllHandler}
                                className={style.searchItem}
                                data-text='nothing'
                            >
                                Отменить все
                            </div>
                        </div>
                        <div className={style.listFilter}>
                            {checkList.map((item, index) => (
                                <div className={style.checkbox} key={idKey()}>
                                    <CheckBoxModal
                                        key={index}
                                        i={index}
                                        handleCheck={handleCheck}
                                        item={item}
                                        // isSelect={isSelect}
                                        checkedRu={checkedRu}
                                    />
                                    <span
                                        className={`${style.editorDescription} ${isChecked(item)}`}
                                    >
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div  className={style.searchResultWrapper} >
                        <SecondButton buttonLabel="Поиск" buttonHandler={onclickHandler} buttonCheckImg={false}/>				</div>
                </div>
            }
            {ismobileleftmenu === 'true' &&
                <aside
                    ismobileleftmenu={ismobileleftmenu}
                    ref={aside}
                    className={style.aside}
                >
                    {type !== 'window' &&
                        <>
                            <Breadcrumbs
                                className={style}
                            />
                            <div className={style.search}>
                                <InputSearch
                                    className={style}
                                    inputValue={resultMainSearch}
                                    typeInputSearch={typeInputSearch}
                                    setText={setText}
                                    text={text}
                                >
                                    {isMobile && !isTablet &&
                                        <div
                                            onClick={() => setmobileleftmenu('false')}
                                        >
                                            <SideBar
                                                ismobileleftmenu={ismobileleftmenu}
                                                className={style}
                                            />
                                        </div>}
                                </InputSearch>
                                {isMainModalResultSearch && (
                                    <div onClick={onClickCloseMainModalResultSearch}>
                                        <ModalResultSearch
                                            view='mainWrapper'
                                            diseases={infoMainModalResultSearch}
                                            setToc={setToc}
                                            setExpand={setExpand}
                                            setUpdateToc={setUpdateToc}
                                        />
                                    </div>
                                )}
                                {isMainModalResultSearchNull && (
                                    <div>
                                        <ModalResultSearchNull  view='mainWrapper'/>
                                    </div>
                                )}
                                <div className={style.propertyTree}>
                                    <div className={style.propertyIcon}>
                                        <IconColspan
                                            onColspanHandler={onColspanHandler}
                                        />
                                        <IconEye
                                            onGrayDataHandler={onGrayDataHandler}
                                            isEnable={isChildElsewhere}
                                        />
                                    </div>
                                    <label
                                        className={style.advancedSearch}
                                        onClick={onclickSearchHandler}
                                    >
                                        <input
                                            type="button"
                                        />
                                        {'[ Расширенный поиск ]'}
                                    </label>
                                </div>
                            </div>
                        </>
                    }
                    <section
                        ref={tocPage}
                        className={`${style.treeViews} ${className.result_insert__layout_treeViews}`}
                    >
                        <TreeViews
                            type={type}
                            data={toc}
                            expand={expand}
                            isChildElsewhere={isChildElsewhere}
                            tocPage={tocPage}
                            setUpdateToc={setUpdateToc}
                            updatePage={updatePage}
                            setToc={setToc}
                            setExpand={setExpand}
                            dataHtml={aside.current}
                        />
                    </section>
                </aside>
				}
				<div
                    className={style.conceptPage}
                >
            {isMobile && !isTablet ? (
                <div
                    style={{display: ismobileleftmenu === 'true' ? 'none' : 'flex'}}
                    className={style.content}
                >
                    { children }
                </div>
            ) : (
                <div className={`${style.content} ${className.result_insert_content} ${style[classContentShort]}`}>
                    { children }
                </div>
					)}
					<div className={style.resultSearch}>
						{isExtendModalResultSearch && (

							<ResultSearchField
								setToc={setToc}
								setExpand={setExpand}
								setUpdateToc={setUpdateToc}
								view='extendWrapper'
								diseases={infoExtendModalResultSearch}
								close={onClickCloseExtendModalResultSearch}
							/>
						)}
					</div>
				</div>

        </div>)

}
