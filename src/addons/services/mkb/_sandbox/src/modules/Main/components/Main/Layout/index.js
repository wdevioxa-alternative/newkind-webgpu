import './index.css';
import React, {useState, useEffect, useRef, useLayoutEffect, useCallback} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import style from './index.module.css';
import scrollContent from './scroll.module.css';
import { isMobile, isTablet } from "react-device-detect";
import {useNavigate} from "react-router-dom";
import {search} from '../../../../../utilites/search';
import {checkList} from '../../../../../config';
import {tocActions} from '../../../reducers/tableOfContent';
import {TreeViews} from './TreeViews';
import {ModalWindow} from '../../../../../components/modal';
import InputSearch from '../../../../../components/InputSearch';
import InputSearchExtend from '../../../../../components/InputSearchExtend';
import CrossHelp from '../../../../../components/img/CrossHelp/CrossHelp';
import Close from '../../../../../components/img/Close';
import {IconEye} from './Icons/IconEye';
import {IconColspan} from './Icons/IconColspan';
import {ExtendedSearch} from '../../../../../components/modal/template';
import ModalResultSearch from '../../../../../components/ModalResultSearch';
import ModalResultSearchNull from '../../../../../components/ModalResultSearchNull';
import {Breadcrumbs} from '../../../../../components/Breadcrumbs'
import {SideBar} from '../../../../../components/img/SideBar'
import CheckBoxModal from '../../../../../components/CheckBoxModal';
import {idKey} from "../../../../../utilites/idKey";
import {getApi} from '../../../../../utilites/API'
import {SecondButton} from '../../../../../components/Button/Button';
import ResultSearchField from '../../../../../components/ResultSearchField';
import {config} from '../../../../../config/modules'
import routers from "../../../.."

export function Layout({
                           setAncestor,
                           currentTocData,
                           className = {},
                           type,
                           uri,
                           children,
                           updatePage,
                           conceptPage,
                           ismobileleftmenu,
                           setmobileleftmenu
                       }) {
    const navigate = useNavigate();
    const aside = useRef(null)
    const tocPage = useRef(null);
    const useLayoutContainer = useRef(null);
    const treeViews = useRef(null);
    const [isChildElsewhere, setChildElsewhere] = useState(true)
    const chapters = useSelector(state => state.icd.toc.chapter)
    const dispatch = useDispatch();
    const [expand, setExpand] = useState([1]);
    const [isModal, setModal] = useState(false);
    const dialog = React.useRef(null);
    const [isOpenSearch, setOpenSearch] = useState(false);
    const [typeInputSearch, _setTypeInputSearch] = useState('input-search');
    const [updateToc, setUpdateToc] = useState(undefined)
    const [checked, setChecked] = useState([]);
    const API_DATA = getApi()
    const [toc, setToc] = useState([{
        children: [1],
        id: 0,
        name: "",
        parent: null
    }, {
        id: 1,
        parent: 0,
        link: `/v1/icd/release/11/${API_DATA.Release}/mms`
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

        if (window.location.pathname.startsWith('/coding')
            || window.location.pathname.startsWith('/testing/coding')) {
            request.pathname = uri
            request.href = `${window.location.origin}${uri}`
        }

        const {pathname} = window.location

        if (!routers.some(item => {
            const path = item.path.replace('/*', '')
            return path.length !== 0 && pathname.startsWith(path)

        })) {
            const url = new URL(window.location.href)
            url.pathname = '/'
            url.search = ''
            url.hash = ''
            request = url
        }

        dispatch(
            tocActions.fetchChapter({
                pathname: request,
                type,
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

        if (currentTocData) {
            const currentID = currentTocData.pathname.substring(currentTocData.pathname.lastIndexOf('/') + 1)
            const items = aside.current.querySelectorAll('[data-id]')
            for (let i = 0; i < items.length; ++i) {
                const item = items[i].querySelector('.isActive')
                if (item !== null) {
                    item.classList.remove('isActive')
                }
            }

            let index = 0
            const current = chapters.find((item, i) => {
                if (item.link) {
                    if (item.link.indexOf(currentID) !== -1) {
                        index = i
                        return true
                    }

                    return false
                }
                    return false

            })

            setAncestor(false)
            navigate(currentTocData.pathname)
        }
    }, [currentTocData]);

    const setState = () => {
        if (isOpenSearch) {
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
            if (value) {
                let response = [];
                const responseWord = await search.getResultMain(value);
                let responseCode;
                if (value.length < 8) {
                    responseCode = await search.api.apiSearchCode(value);
                    if (responseCode.length > 0) response = responseCode;
                }
                if (responseWord.length > 0) response = responseWord;
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
            switch (event.target.dataset.text) {
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
            switch (event.target.dataset.text) {
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
        ? checked.reduce((total, item) => `${total  }, ${  item}`)
        : "";

    const isChecked = (item) => (checked.includes(item) ? "checked-item" : "not-checked-item")

    // let heightSize = 0
    //
    // if(size) {
    //     heightSize = getHeight(size.height, type)
    // }

    useEffect(() => {
        if (updateToc) {
            if (!(toc[updateToc.id].children.length - 1)) {
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

                            setToc(previous => [...content.data])
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
    // if(treeViews.current)
    const isMKB = true

    if(!isMKB && treeViews.current !== null) {
        const tree = treeViews.current.assignedNodes()[0]
        if(tree.setState) {
            tree.setState('tree',toc)
            tree.setState('expandedArray',expand)
        }
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
                    <ExtendedSearch/>
                </ModalWindow>
            ) : ''}
            {type !== 'window' &&
                <div ref={dialog} className={style.dialog}>
                    <div className={style.header}>
                        <div className={style.titleHeader}>Расширенный поиск</div>
                        <div
                            onClick={closeSearch}
                        >
                            <Close className={style.icon}/>
                        </div>
                    </div>
                    <hr/>
                    <div className={style.searchContainer}>
                        <div className={style.searchEnhance}>
                            <div onKeyDown={onclickDownHandler} className={style.searchExtend}>
                                <InputSearchExtend
                                    className={style}
                                    inputValue={resultExtendSearch}
                                    typeInputSearch={typeInputSearch}
                                />
                            </div>
                            {/* {isExtendModalResultSearch && (
                                <div onClick={onClickCloseExtendModalResultSearch}>
                                    <ModalResultSearchField
                                        setToc={setToc}
                                        setExpand={setExpand}
                                        setUpdateToc={setUpdateToc}
                                        view='extendWrapper'
                                        diseases={infoExtendModalResultSearch}
                                    />
                                </div>)
                            } */}
                            <div
                                onClick={onClickHelpHandler}
                                className={style.help}
                            >
                                <CrossHelp className={style.crossHelp}/>
                            </div>
                        </div>
                        <div className={style.searchWarning}>Пожалуйста, проверьте свойства, которые вы хотели бы
                            включить в поиск
                        </div>
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
                    <div className={style.searchResultWrapper}>
                        <SecondButton buttonLabel="Поиск" buttonHandler={onclickHandler} buttonCheckImg={false}/></div>
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
                                        <ModalResultSearchNull view='mainWrapper'/>
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
                                        [ Расширенный поиск ]
                                    </label>
                                </div>
                            </div>
                        </>
                    }
                    <section
                        ref={tocPage}
                        className={`${scrollContent.treeViews} ${style.treeViews} ${className.result_insert__layout_treeViews}`}
                    >
                        {isMKB
                            ? (<TreeViews
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
                            />)
                            : (<slot
                                    ref={treeViews}
                                    name="fer-tree"
                                 />)}

                    </section>
                </aside>
            }
            <div
                className={style.conceptPage}
            >
                <slot name="grid__header" />
                {isMobile && !isTablet ? (
                    <div
                        style={{display: ismobileleftmenu === 'true' ? 'none' : 'flex'}}
                        className={`
                        ${scrollContent.content}
                        ${config.Layout.content.header ? style.content__mkb_admin : style.content__mkb}
                    `}
                    >
                        {children}
                    </div>
                ) : (
                    <div className={`
${scrollContent.content}
${config.Layout.content.header ? style.content__mkb_admin : style.content__mkb}
${className.result_insert_content}
${style[classContentShort]}`
                    }>
                        {children}
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
