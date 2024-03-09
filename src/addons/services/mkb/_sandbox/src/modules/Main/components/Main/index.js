import React, {useState, useRef, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";
import style from './index.module.css';
import css from './index.css'
import {useLocation} from 'react-router-dom';
import {idKey} from '../../../../utilites/idKey'
import isEmpty from "../../../../utilites/isEmpty";
import {href, API} from '../../../../utilites/Icd-11'
import {useDispatch, useSelector, useStore} from "react-redux";
import {coordinationActions} from "../../reducers/coordination";
import {codesActions} from "../../reducers/codes";
import {Editor} from './Editor';
import {Layout} from './Layout'
import { Coder } from './Coder'
import CrossHelp from "../../../../components/img/CrossHelp/CrossHelp";
import {ModalWindow} from "../../../../components/modal";
import {PostCoordination} from "../../../../components/modal/template";
import {Diagnosis} from './Diagnosis'
import {tocActions} from "../../reducers/tableOfContent";
import {Notification} from "@src/components/Notification"
import {globalActions} from "../../reducers/global";
import CopyLine from '../../../../components/CopyLine';
import ShowAll from '../../../../components/img/ShowAll';
import ArrowSecond from '../../../../components/img/Arrow_second';
import {getCode} from './Coder'
import {IconCopy} from "./Icons/Copy";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { UserContext } from '@src/App';
import routes from '../../../../modules'
import { renderToStaticMarkup } from 'react-dom/server';

const HEIGHT_HEADER = 64
const HEIGHT_FOOTER = 80
const HEIGHT_SEARCH = 135
const HEIGHT_CONCEPTPAGE = 164
const HEIGHT_HEADER_FOOTER = HEIGHT_HEADER + HEIGHT_FOOTER + HEIGHT_SEARCH

const globalToc = (store) => {
    return store.getState().icd.global.coordination.toc
}

const getCoordination = (store) => {
    return store.getState().icd.coordination.coordination
}

const getPages = (store) => {
    return store.getState().icd.toc.pages
}

export const rootId = (store) => {
    if (isEmpty(store.icd.coordination.coordination)) {
        return undefined
    } else {
        return store.icd.coordination.coordination[0].substrate
    }
}

const getHeight = (conceptPage) => {
    let innerData = window.innerHeight - HEIGHT_CONCEPTPAGE
    let delta = 0
    let heightWindow = window.innerHeight - HEIGHT_HEADER_FOOTER
    if (conceptPage.current) {
        delta = innerData - conceptPage.current.scrollHeight
    }
    return delta < 0 ? heightWindow - delta : heightWindow
}


export const Main = ({ className, uri, id, type, ismobileleftmenu, setmobileleftmenu, isCodingPage = false, setCodingModal, codeDiseaseChoice }) => {
    const [isICDLatest, setICDLatest] = useState(false);
    const [isMkb, setIsMkb] = useState(false);
    const [activeClass, setActiveClass] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();
    const conceptPage = useRef(null);
    const store = useStore();
    const slotMain = useRef(null);
    const ROOT_ID = rootId(store.getState())
    const chapters = useSelector(state => state.icd.toc.chapter)
    const axisPostCoordination = useSelector(state => state.icd.coordination.post)
    const [copyButtonMessage, setCopyButtonMessage] = useState('');
    const [isDefaultPage, setIsDefaultPage] = useState(true)
    const [page, setPage] = useState({
        id: '',
        title: '',
        subTitle: '',
        definition: '',
        exclusion: '',
        ancestor: '',
        foundationChildElsewhere: undefined,
        postcoordinationScale: undefined
    });
    const [allToc, setAllToc] = useState({});
    const [isAncestor, setAncestor] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [isCodingNoteFromAboveLevels, setCodingNoteFromAboveLevels] = useState(false);
    const [height, setHeight] = useState(getHeight(conceptPage));
    const [updatePage, setUpdate] = useState();
    const [currentTocData, setCurrentTocData] = useState(undefined);
    const [isModal, setModal] = useState(false);
    const exclusionsFromAboveLevels = []
    const codingNoteFromAboveLevels = []
    const [isExclusionsFromAboveLevels, setExclusionsFromAboveLevels] = useState([]);
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext);
    // const dataContext = useContext(UserContext);

    const onClickHelpHandler = (event) => {
        const user = !isEmpty(userInfo) ? userInfo.email : anonUser
        analytics.page();
        analytics.identify(user, {
            userAgent: window.navigator.userAgent,
            deseaseCode: 'help',
            action: 'copy_postcoordination_code'
        })
        event.preventDefault()
        setModal(!isModal)
    }

    const onUpdateTocHandler = (item) => {
        setCurrentTocData({
            pathname: item.id
        })
    }

    const onRemoveCodeHandler = (item) => {
        dispatch(
            coordinationActions.changeCode({
                data: {
                    type: 'delete',
                    id: item.id,
                    axisName: item.axisName,
                    code: item.code,
                    key: item.key,
                    isUnspecified: item.object.isUnspecified,
                    unspecified: item.object.unspecified
                }
            }))
    }

    const copyToClipBoard = async event => {
        try {
            await navigator.clipboard.writeText(new URL(event.currentTarget.querySelector('a').textContent).pathname);
        } catch (err) {

        }
    };

    const onResize = () => setHeight(getHeight(conceptPage))

    useEffect(() => {
        if(userInfo !== null) {
            dispatch(
                coordinationActions.loaderCheck({
                    cb: (error, ICDLatest) => {
                        if (error) {
                            console.log('error', error)
                            return;
                        }

                        setICDLatest(ICDLatest)
                    }
                })
            );
        }
    }, [])

    useEffect(() => {
        if(window.location.pathname.startsWith('/page')) {
            setIsDefaultPage(false)
            const pages = getPages(store)
            let page = undefined
            for(let key in pages) {
                if(key === window.location.pathname) {
                    page = pages[key]
                    break
                }
            }
            setActiveClass(false)
            if ((window.location.pathname !== `${process.env.BASE_URL}` && window.location.pathname !== `${process.env.BASE_URL}testing/` && window.location.pathname !== '/' && window.location.pathname !== '/testing' && window.location.pathname !== '/testing/') && !page) {
                let toc = globalToc(store)

                for(let axis in toc) {
                    toc[axis].isModal = false
                }

                dispatch(
                    globalActions.coordination.toc(toc)
                )

                let request = ''

                let path = window.location.pathname[window.location.pathname.length -1].includes('/')
                    ? (window.location.pathname.replace(/.$/,""))
                    : window.location.pathname

                if(window.location.pathname.startsWith('/coding') || window.location.pathname.startsWith('/testing/coding')) {
                    request = uri
                } else {
                    request = href.encode(path, window.location.pathname.startsWith('/coding') ? 'coding': 'page')
                }

                if(routes.some(item => item.path.startsWith(request) || request.startsWith('/v1/') || request.startsWith('/page') || request.startsWith('/coding/page'))) {
                    dispatch(
                        coordinationActions.getPage({
                            pathname: request,
                            root: ROOT_ID,
                            cb: (error, content) => {
                                if (error) {
                                    console.log('error', error)
                                    return;
                                }
                                if(!isEmpty(content.exclusionsFromAboveLevels)) {
                                    const array = Array(content.exclusionsFromAboveLevels.array.length).fill(false);
                                    setExclusionsFromAboveLevels( value => ([...array]))
                                }

                                dispatch(
                                    tocActions.setCurrent(`${window.location.origin}${content.id}`)
                                )

                                dispatch(
                                    tocActions.setPage(content, window.location.pathname.includes('/coding') ? 'coding': 'page')
                                );

                                setPage(prevState => ({
                                    ...content
                                }));

                                dispatch(
                                    tocActions.setLoading(false)
                                );
                            }
                        })
                    );
                }
            } else {
                if(page) {
                    if(page.code) {
                        dispatch(coordinationActions.setRoot(page.code))
                    }

                    dispatch(
                        tocActions.setCurrent(`${window.location.origin}${page.id}`)
                    )

                    dispatch(
                        coordinationActions.changeCode({
                            data: {
                                type: 'reset'
                            }
                        }))

                    setPage(page)
                } else {
                    setIsDefaultPage(true)
                    setPage({
                        id: '',
                        title: 'МКБ-11 для ведения статистики смертности и заболеваемости',
                        subTitle: 'Справочник МКБ-11 опубликован в ознакомительных целях и в настоящий момент не применяется на территории Российской Федерации.',
                        definition: '',
                        exclusion: '',
                        ancestor: '',
                        foundationChildElsewhere: undefined,
                        postcoordinationScale: undefined
                    })
                }
            }
        } else {
            setIsDefaultPage(true)
            setPage({
                id: '',
                title: 'МКБ-11 для ведения статистики смертности и заболеваемости',
                subTitle: 'Справочник МКБ-11 опубликован в ознакомительных целях и в настоящий момент не применяется на территории Российской Федерации.',
                definition: '',
                exclusion: '',
                ancestor: '',
                foundationChildElsewhere: undefined,
                postcoordinationScale: undefined
            })
        }
    }, [location])

    useEffect(() => {
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    useEffect(() => {
        setHeight(getHeight(conceptPage))
    });

    let dataPostcoordination = []
    let axisPostCoordinationKeys = []
    const postcoordinationAxisTransform = (postcoordination, keys) => {
        let result = []
        let first = []
        let second = []
        for (let key of keys) {
            const currentId = key.split('_')[0].trim()
            const currentAxis = key.split('_')[1].trim()
            if (currentId === ROOT_ID) {
                first.push({
                    code: currentId,
                    name: currentAxis,
                    children: postcoordination[key]
                })
            } else {
                second.push({
                    code: currentId,
                    name: currentAxis,
                    children: postcoordination[key]
                })
            }
        }

        for (let list of first) {
            for (let children of list.children) {
                if(isEmpty(children.axis)) {
                    children.axis = {}
                    children.axis.children = {}
                }
                if(!isEmpty(children.layer)) {
                    for(let axis of children.layer) {
                        let data = second.filter(item => item.code === axis)
                        if(!isEmpty(data)) {
                            for(let secondItem of data) {
                                children.axis.children[secondItem.name] = secondItem.children
                                for(let key in children.axis.children) {
                                    if(isEmpty(children.axis.children[key])) {
                                        delete children.axis.children[key]
                                    }
                                }
                                children.axis.keys = Object.keys(children.axis.children)
                            }
                        }
                    }
                }
            }
        }

        return first
    }

    if (!isEmpty(axisPostCoordination)) {
        axisPostCoordinationKeys = Object.keys(axisPostCoordination)
        dataPostcoordination = postcoordinationAxisTransform(axisPostCoordination, axisPostCoordinationKeys)
    }
    function getCodes(codes) {
        dispatch(codesActions.setCodes(codes.self));
    }

    useEffect(() => {
        dispatch(codesActions.deleteCodes());
    }, [])

    // useEffect(() => {
    //     if(slotMain.current) {
            // const main = slotMain.current.assignedNodes()[0]
            // const shadowMain = slotMain.current.assignedNodes()[0].shadowRoot
        // }
    // }, [slotMain.current])

    useEffect(() => {
        dispatch(codesActions.setCodes(page.code));
    }, [page.code])

    if(page.ancestor) {
        for(let ancestor of page.ancestor) {
            for(let item of chapters) {
                if(item.link) {
                    let ancestorID = ancestor.id.substring(ancestor.id.lastIndexOf('/') + 1)
                    let itemID = item.link.substring(item.link.lastIndexOf('/') + 1)

                    if(ancestorID === itemID) {
                        if(item.exclusion) {
                            for(let data of item.exclusion) {
                                exclusionsFromAboveLevels.push({
                                    self: ancestor,
                                    exclusions: data['label']['@value']
                                })
                            }
                        }

                        if(!isEmpty(item.codingNote)) {
                            codingNoteFromAboveLevels.push({
                                self: item,
                                codingNote: item.codingNote['@value']
                            })
                        }
                    }
                }
            }
        }
    }

    const onClickHandler = () => {
        setActiveClass(!activeClass);
    };

    const onClickHeandler = async () => {
        const code = getCode.all(getCoordination(store))
        await navigator.clipboard.writeText(code.self);
        setCopyButtonMessage('Код скопирован')

        const user = !isEmpty(userInfo) ? userInfo.email : anonUser
        analytics.page();
        analytics.identify(user, {
            userAgent: window.navigator.userAgent,
            deseaseCode: code.self,
            action: 'coding_select_entity'
        })

        let clear = setTimeout(() => {
            setCopyButtonMessage('')
            clearTimeout(clear)
        }, "4000")
    }

    const renderPage = () => {

        return(
            <div
                ref={conceptPage}
                className={style.content}
            >
                {type === 'window' &&
                    <div  className={style.containerTitle_coding}>
                        <div
                            className={`${type === 'window' ? style.titlePage_coding: style.titlePage}`}
                        >
                            {`${page.code ? page.code : ''} ${page.title}`}
                        </div>
                    </div>}

                {page.id &&
                    <p
                        className={`${type === 'window' ? style.uri_coding : style.uri}`}
                        onClick={copyToClipBoard}
                    >
                        URI объекта:
                        <a
                            href={href.decoder(page.id)}
                        >
                            {`${window.location.origin}${href.decoder(API.transform.url.linearization(page.id))}`}
                        </a>
                    </p>}

                {isCodingPage && <CopyLine setCodingModal={setCodingModal} codeDiseaseChoice={codeDiseaseChoice} />}

                {type !== 'window' &&
                    <>
                        <div className={style.titlePage}>
                            {`${page.code ? page.code : ''} ${page.title}`}
                        </div>
                        <div className={style.subTitlePage}>
                            {page.subTitle}
                        </div>
                    </>
                }

                {page.ancestor &&
                    <>
                        {isAncestor ? (
                            <div className={style.ancesorContainer}>
                                <h2
                                    className={style.container_parent}
                                >
                                    {'Все родительские записи в иерархии'}
                                </h2>
                                <ul className={style.ul}>
                                    {page.ancestor.map((item, index) => {
                                        return (
                                            <li
                                                key={idKey()}
                                                className={style.li}
                                                style={{
                                                    marginLeft: 8 * (index + 1)
                                                }}
                                            >
                                                <div
                                                    className={style.link}
                                                    onClick={() => {
                                                        let data = item
                                                        if(type === 'window') {
                                                            data.id = data.id.replace('page/','')
                                                        }
                                                        onUpdateTocHandler(data)
                                                    }}
                                                >
                                                    {item.title}
                                                </div>
                                            </li>
                                        )})}
                                </ul>
                                <div
                                    className={`${style.title_ancessor}`}
                                    onClick={() => setAncestor(!isAncestor)}
                                >
                                    {'Скрыть родительские записи'}

                                    <ShowAll
                                        isOpen={true}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={style.ancesorContainer}>
                                <h2
                                    className={style.container_parent}
                                >
                                    {'Родитель'}
                                </h2>
                                <div
                                    className={style.container_ancestor}
                                >
                                    <div
                                        to={page.ancestor[page.ancestor.length - 1].id}
                                        className={`${style.link} first`}
                                        onClick={() => {
                                            let id = page.ancestor[page.ancestor.length - 1].id
                                            if(type === 'window') {
                                                id = id.replace('page/','')
                                            }

                                            onUpdateTocHandler({
                                                    id: id
                                                }
                                            )}}
                                    >
                                        {page.ancestor[page.ancestor.length - 1].title}
                                    </div>
                                </div>
                                {page.ancestor.length > 1 &&
                                    <div
                                        className={`${style.title_ancessor}`}
                                        onClick={() => setAncestor(!isAncestor)}
                                    >
                                        Показать все родительские записи
                                        <ShowAll
                                            isOpen={false}
                                        />
                                    </div>}
                            </div>
                        )}
                    </>}

                {page.definition &&
                    <div className={style.description}>
                        <h2>Описание</h2>
                        <p className={style.p}>
                            {page.definition}
                        </p>
                    </div>}

                {page.residual && type !== 'window' ? (<>
                    <p
                        className={`${style.unspecified} ${style.p}`}
                    >
                        {page.residual}
                    </p>
                </>):''}

                {!isEmpty(page.exclusion) ? (
                    <div className={style.exclusion}>
                        <h2>Исключения</h2>
                        <ul className={style.ul}>
                            {page.exclusion.map(item => {
                                return (
                                    <li key={idKey()} className={style.li}>
                                        {item.title}
                                        <span className={style.link}>
                                        <Link
                                            to={href.transform(new URL(item.id).pathname, 'page')}
                                            className={style.link}
                                        >
                                            ({item.code})
                                        </Link>
                                    </span>
                                    </li>
                                )})}
                        </ul>
                    </div>
                ) : ''}

                {!isEmpty(page.exclusionsFromAboveLevels) && type === 'window' ?
                    <div
                        className={style.exclusionFromAboveLevels_continer}
                    >
                        <div
                            className={style.exclusionFromAboveLevels}
                        >
                            <h2>
                                Исключения из вышеперечисленных уровней
                            </h2>

                            <div className={style.selectListWrapper}>
                                <div className={style.text} onClick={onClickHandler}>
                                    {activeClass ? `Свернуть все [${page.exclusionsFromAboveLevels.array.length}]` : `Показать все [${page.exclusionsFromAboveLevels.array.length}]`}
                                </div>
                                <div
                                    className={
                                        activeClass
                                            ? `${style.rotateArrow} ${style.rotateArrowActive}`
                                            : `${style.rotateArrow}`
                                    }
                                    onClick={onClickHandler}
                                >
                                    <ArrowSecond
                                        className={style}
                                    />
                                </div>
                            </div>
                        </div>

                        {activeClass ?(<div>
                            <ul className={style.ul}>
                                {page.exclusionsFromAboveLevels.array.map((item, index) => {
                                    let dataLink = new URL(item['@id']).pathname
                                    dataLink = href.icdToPath(dataLink, type === 'window' ? 'coding': 'page')

                                    return(
                                        <li key={idKey()} className={style.li}>
                                            <div className={style.exclusionsFromAboveLevels_result}>
                                                <div
                                                    className={style.exclusionsFromAboveLevels_title}
                                                >
                                                    {item.title[`@value`]}
                                                    <Link
                                                        to={dataLink}
                                                        className={style.link}
                                                    >
                                                        ({item.codeRange ? item.codeRange: item.code})
                                                    </Link>
                                                </div>
                                                <div
                                                    className={
                                                        isExclusionsFromAboveLevels[index]
                                                            ? `${style.rotateArrow_FromAboveLevels} ${style.rotateArrowActive_FromAboveLevels}`
                                                            : `${style.rotateArrow_FromAboveLevels}`
                                                    }
                                                    onClick={() => {
                                                        isExclusionsFromAboveLevels[index] = !isExclusionsFromAboveLevels[index]
                                                        setExclusionsFromAboveLevels( value => ([...isExclusionsFromAboveLevels]))
                                                    }}
                                                >
                                                    <ArrowSecond
                                                        width={16}
                                                        height={16}
                                                        className={style}
                                                    />
                                                </div>
                                                {isExclusionsFromAboveLevels[index] ?(<>
                                                    <div className={style.link_exclusion}>
                                                        <p
                                                            className={style.link_from}
                                                        >
                                                            из
                                                            <span className={style.highlight}>{item.classKind === 'chapter' ? page.exclusionsFromAboveLevels.object[index].id : ''}</span>
                                                            {page.exclusionsFromAboveLevels.object[index].from}
                                                        </p>
                                                    </div>
                                                </>) : ''}
                                            </div>
                                        </li>)
                                })}
                            </ul>
                        </div>):(<></>)}
                    </div>: ''}

                {codingNoteFromAboveLevels.length && type === 'window' ?
                    <>
                        <div
                            className={style.codingNoteFromAboveLevels_continer}
                        >
                            <div
                                className={style.exclusionFromAboveLevels}
                            >
                                <h2
                                    className={style.codingNoteFromAboveLevels_title}
                                >
                                    Примечания к кодированию из вышеперечисленных уровней
                                </h2>

                                <div className={style.selectListWrapper}>
                                    <div
                                        className={style.text}
                                        onClick={() => {setCodingNoteFromAboveLevels(!isCodingNoteFromAboveLevels)}}
                                    >
                                        {isCodingNoteFromAboveLevels ? `Свернуть все [${codingNoteFromAboveLevels.length}]` : `Показать все [${codingNoteFromAboveLevels.length}]`}
                                    </div>
                                    <div
                                        className={
                                            isCodingNoteFromAboveLevels
                                                ? `${style.rotateArrow} ${style.rotateArrowActive}`
                                                : `${style.rotateArrow}`
                                        }
                                        onClick={() => {setCodingNoteFromAboveLevels(!isCodingNoteFromAboveLevels)}}
                                    >
                                        <ArrowSecond
                                            className={style}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {isCodingNoteFromAboveLevels ?(
                            <div className={style.codingNoteFromAboveLevels_content}>
                                <ul className={style.ul}>
                                    {codingNoteFromAboveLevels.map(item => {
                                        return(
                                            <li key={idKey()} className={style.li}>
                                                <div className={style.codingNoteFromAboveLevels_result}>
                                                    <div className={style.codingNoteFromAboveLevels_title}>{item.codingNote}</div>
                                                </div>
                                            </li>)
                                    })}
                                </ul>
                            </div>
                        ):(<></>)}
                    </>
                    : ''}

                {!isEmpty(page.inclusion) ? (
                    <div className={style.inclusions}>
                        <h2>Включения</h2>
                        <ul className={style.ul}>
                            {page.inclusion.map(item => (
                                <li key={idKey()} className={style.li}>
                                    {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : ''}

                {!isEmpty(page.foundationChildElsewhere) ? (
                    <div className={style.foundationChildElsewhere}>
                        <h2>Классифицировано в других рубриках</h2>
                        <ul className={style.ul}>
                            {page.foundationChildElsewhere.map(item => (
                                <li key={idKey()} className={style.li}>
                                    {item.title}
                                    <span className={style.link}>
                                        <a
                                            className={style.link}
                                            href={href.decoder(API.transform.url.linearization(item.id))}
                                        >
                                            ({item.code})
                                        </a>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : ''}

                {page.codingNote ? (
                    <>
                        <div className={style.codingNote}>
                            <h2 className={style.codingNote_title}>Примечание по кодированию</h2>
                        </div>
                        <div className={style.codingNote_data}>{page.codingNote}</div>
                    </>) : ''}


                {!isEmpty(page.relatedEntitiesInMaternalChapter) && type === 'window' ? (
                    <div className={style.inclusions}>
                        <h2>Связанные рубрики в классе о материнстве</h2>
                        <ul className={style.ul}>
                            {page.relatedEntitiesInMaternalChapter.map(item => (
                                <li key={idKey()} className={style.li}>
                                    {item.title['@value']}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : ''}

                {!isEmpty(page.relatedEntitiesInPerinatalChapter) && type === 'window' ? (
                    <div className={style.inclusions}>
                        <h2>Связанные рубрики в классе о перинатальном периоде</h2>
                        <ul className={style.ul}>
                            {page.relatedEntitiesInPerinatalChapter.map(item => (
                                <li key={idKey()} className={style.li}>
                                    {item.title['@value']}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : ''}

                {page.postcoordinationScale &&
                    <div>
                        <div className={style.postCoordinationHelp}>
                            <h2>Посткоординация</h2>
                            <div className={style.postCoordinationButtons}>
                                <div
                                    onClick={onClickHelpHandler}
                                    className={style.postCoordinationWrapperIcon}
                                >
                                    <CrossHelp
                                        width={16}
                                        height={16}
                                        className={style.postCoordinationIcon}
                                    />
                                </div>
                                <div
                                    onClick={onClickHeandler}
                                >
                                    <div className={style.copyButton}>
                                        {!isEmpty(copyButtonMessage) ? (<>
                                            <div className={style.copyCode}>{`${copyButtonMessage}`}</div>
                                        </>): ''}
                                        <IconCopy
                                            width={16}
                                            height={16}
                                            className={style}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.treeContainer_wrapper}>
                            <div className={style.treeContainer}>
                                <div className={style.postCoordination}>
                                    <div className={style.postCoordinationData}>
                                        <div className={style.postCoordinationName}>
                                            <div className={style.postCoordinationName_title}>
                                                <strong>{`${page.code} ${page.title}`}</strong>
                                            </div>
                                            <Coder
                                                onClickHeandler={onClickHeandler}
                                                getCodes={getCodes}
                                            />
                                        </div>
                                        <div className={style.postCoordinationCode}>
                                            {dataPostcoordination.map((axis, index) => {
                                                return (
                                                    <React.Fragment key={idKey()}>
                                                        <div className={style.postCoordinationCodeTitle}>
                                                            { axis.name }
                                                        </div>
                                                        {axis.children.map((item) => (
                                                            <React.Fragment key={idKey()}>
                                                                <div
                                                                    className={`${style.postCoordinationCodeItem} ${dataPostcoordination.length  === 1 || dataPostcoordination.length - 1  === index ? '' : style.postCoordinationCodeItemActive}`}
                                                                >
                                                                    <Diagnosis
                                                                        isNextLayer={false}
                                                                        title={item.title}
                                                                        postcoordination={item}
                                                                        onClick={() => {onRemoveCodeHandler({
                                                                            key: `${axis.code}_${axis.name}`,
                                                                            id: item.id,
                                                                            axisName: axis.name,
                                                                            code: item.code ? item.code : '',
                                                                            object: item,
                                                                            isSecondLayer: false
                                                                        })}}
                                                                        name={`${item.code ? item.code : ''} ${item.title}`}
                                                                        isBlock={item.classKind === 'block' && !item.code}
                                                                    />
                                                                    {!isEmpty(item.axis.children) ? (
                                                                        <>
                                                                            {item.axis.keys.map((key, index) => (
                                                                                <React.Fragment key={idKey()}>
                                                                                    {!isEmpty(item.axis.children[key]) && (
                                                                                        <div className={style.postCoordinationCodeTitleSecond}>
                                                                                            { key }
                                                                                        </div>
                                                                                    )}
                                                                                    {item.axis.children[key].map(data => (
                                                                                        <React.Fragment key={idKey()}>
                                                                                            <div
                                                                                                className={`${style.postCoordinationCodeItem} ${item.axis.keys.length  === 1 || item.axis.keys.length - 1  === index ? '' : style.postCoordinationCodeItemActiveSecond}`}
                                                                                            >
                                                                                                <Diagnosis
                                                                                                    isNextLayer={true}
                                                                                                    title={data.title}
                                                                                                    postcoordination={data}
                                                                                                    onClick={() => {onRemoveCodeHandler({
                                                                                                        key: `${item.code}_${key}`,
                                                                                                        id: data.id,
                                                                                                        axisName: key,
                                                                                                        code: data.code ? data.code : '',
                                                                                                        object: data,
                                                                                                        isSecondLayer: true
                                                                                                    })}}
                                                                                                    name={`${data.code ? data.code : ''} ${data.title}`}
                                                                                                    isBlock={data.classKind === 'block' && !data.code}
                                                                                                />
                                                                                            </div>
                                                                                        </React.Fragment>
                                                                                    ))}
                                                                                </React.Fragment>
                                                                            ))}
                                                                        </>
                                                                    ) : ''}
                                                                    {item.isNextLayer ? (
                                                                        <Editor
                                                                            type={type}
                                                                            allToc={allToc}
                                                                            className={style}
                                                                            setAllToc={setAllToc}
                                                                            isRoot={false}
                                                                            forceUpdate={forceUpdate}
                                                                            setForceUpdate={setForceUpdate}
                                                                            root={item.code}
                                                                            setHeight={setHeight}
                                                                            title={item.title}
                                                                            postcoordination={{
                                                                                title: item.title,
                                                                                postcoordinationScale: item.postcoordinationScale.hasOwnProperty('postcoordinationScale') ? item.postcoordinationScale.postcoordinationScale : item.postcoordinationScale,
                                                                                code: item.code
                                                                            }}
                                                                        />
                                                                    ) : ''}
                                                                </div>
                                                            </React.Fragment>
                                                        ))}
                                                    </React.Fragment>
                                                )})}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Editor
                                type={type}
                                allToc={allToc}
                                setAllToc={setAllToc}
                                isRoot={true}
                                className={{}}
                                forceUpdate={forceUpdate}
                                setForceUpdate={setForceUpdate}
                                root={page.code}
                                setHeight={setHeight}
                                title={page.title}
                                postcoordination={page.postcoordinationScale}
                            />
                        </div>
                    </div>}


                {page.longDefinition &&
                    <>
                        <div className={style.longDefinition}>
                            <h2 className={style.longDefinition_h2}>Диагностические требования</h2>
                            <p className={style.longDefinition_p}>
                                {page.longDefinition}
                            </p>
                        </div>
                    </>}
                {isDefaultPage &&
                    <>
                        <div className={style.defaultContainer}>
                            <p>Международная статистическая классификация болезней и проблем, связанных со здоровьем, одиннадцатого пересмотра (МКБ-11) - это инструмент для регистрации, отчетности и группировки состояний и факторов, влияющих на здоровье. Она содержит рубрики болезней и расстройств, состояний, связанных со здоровьем, внешних причин болезни или смерти, анатомии, мест, видов деятельности, лекарств, вакцин и многого другого.</p>
                            <p>Цель МКБ-11 состоит в том, чтобы обеспечить систематическую регистрацию, анализ, интерпретацию и сравнение данных о смертности и заболеваемости.</p>
                            <p>МКБ-11 используется для перевода диагнозов болезней и других проблем со здоровьем в буквенно-цифровые коды, что позволяет хранить, извлекать и анализировать данные. МКБ - это международная стандартная диагностическая классификация для всех общих эпидемиологических целей и многих целей управления здравоохранением. Эти цели включают анализ общей ситуации со здоровьем в группах населения, мониторинг заболеваемости и распространенности заболеваний и изучение других проблем со здоровьем в связи с другими переменными, такими как характеристики и обстоятельства пострадавших лиц. МКБ-11 также подходит для изучения финансовых аспектов системы здравоохранения, таких как выставление счетов или распределение ресурсов.</p>
                            <h3>Общие характеристики</h3>
                            <h4>Структура кода</h4>
                            <p>Коды МКБ-11 являются буквенно-цифровыми и охватывают диапазон от 1A00.00 до ZZ9Z.ZZ. Они называются основными кодами.</p>
                            <p>Структура основных кодов описана ниже:</p>
                            <ul className={style.defaultUl}>
                                <li>
                                    Первый символ кода всегда относится к номеру класса. Это может быть цифра или буква.
                                </li>
                                <li>
                                    Коды, начинающиеся с "X", указывают на код расширения.
                                </li>
                                <li>
                                    Во второй позиции всегда есть буква, чтобы отличать коды МКБ-11 от кодов в МКБ–10.
                                </li>
                                <li>
                                    Включение принудительного числа в третьей позиции символа предотвращает написание "нежелательных слов".
                                </li>
                                <li>
                                    Буквы "O" и "I" опущены, чтобы избежать путаницы с цифрами "0" и "1".
                                </li>
                            </ul>
                            <p>Например, 1A00 - это код в классе 01, а BA00 - это код в классе 11.</p>
                            <p>Буква Y зарезервирована для остаточной рубрики "другие определенные", а буква Z зарезервирована для остаточной рубрики "неопределенные". Для классов, содержащих более 240 блоков, "F" ("другие определенные") и "G" ("неопределенные") также используются для обозначения остаточных рубрик (из-за ограничений в пространстве кодирования).</p>
                            <h4>Единые идентификаторы ресурсов</h4>
                            <p>Все объекты имеют единый идентификатор ресурса (URI), который представляет собой строку символов, однозначно идентифицирующую конкретный объект МКБ-11. Каждая сущность занимает определенное место в иерархии групп и рубрик.</p>
                            <h4>Блоки рубрик</h4>
                            <p>Объекты более высокого уровня в МКБ-11 по отношению к рубрикам (называемые блоками) могут использоваться для представления агрегированной статистики. Однако блоки не имеют кодов, поскольку они не должны использоваться при кодировании. Блоки имеют свои собственные URI (например, URI для неоплазм - 02 Неоплазмы). На блоки также могут ссылаться идентификаторы блоков. Структура кода для идентификаторов блоков имеет длину 11 символов (например, BlockL1-1A0).</p>
                            <h4>Основные коды</h4>
                            <p>Коды в табличном списке МКБ-11, которые могут использоваться отдельно для описания заболевания или состояния.</p>
                            <h4>Коды расширений и посткоординация</h4>
                            <p>Коды расширений состоят из групп кодов, например, анатомии, агента, гистопатологии и других, которые могут быть использованы для добавления деталей к основному коду. Коды расширений не должны использоваться отдельно в контексте статистической классификации, но должны быть добавлены к основному коду. Дополнительные коды могут использоваться в другом контексте. Не все коды расширения можно использовать с каждым основным кодом.</p>
                            <p>Посткоординация - это новая функция в МКБ-11, которая создает возможность при желании связывать основные диагностические концепции (т.е. основной код + основной код) и/или добавлять клинические концепции, зафиксированные в кодах расширений. Связанные диагностические концепции называются кластером или кодовой последовательностью. Следует подчеркнуть, что способность к посткоординации, присущая МКБ-11, является одним из существенных изменений по сравнению с МКБ-10. Кластер описывает одну клиническую концепцию, описанную практикующим врачом. </p>
                            <h4>Структура МКБ-11</h4>
                            <p>Иерархическая структура МКБ-11 состоит из следующих элементов:</p>
                            <ul className={style.defaultUl}>
                                <li>
                                    класс
                                </li>
                                <li>
                                    блок рубрик
                                </li>
                                <li>
                                    рубрика
                                </li>
                                <li>
                                    подрубрика
                                </li>
                            </ul>
                            <h3>Отличия МКБ-11 от МКБ-10</h3>
                            <div className={style.defaultTable}>
                                <div className={`${style.defaultTableHeader} ${style.defaultBold}`}>
                                    МКБ-10
                                </div>
                                <div className={`${style.defaultTableHeader} ${style.defaultBold}`}>
                                    МКБ-11
                                </div>
                                <div className={`${style.defaultTableGap} ${style.defaultBold}`}>
                                    <div>
                                        Коды
                                    </div>
                                </div>
                                <div>
                                    Классы нумеруются римскими цифрами
                                </div>
                                <div>
                                    Классы нумеруются арабскими цифрами
                                </div>
                                <div>
                                    Трех-символьные рубрики, каждая из которых может быть дополнительно разделена на 10 четырех-символьных подрубрик
                                </div>
                                <div>
                                    Основной код (рубрика) состоит из четырех символов и имеет два уровня подрубрик
                                </div>

                                <div>
                                    Буквенно-цифровой код с буквой в первой позиции и цифрой во второй, третьей и четвертой позициях. Четвертый символ следует за десятичной точкой
                                </div>
                                <div>
                                    Буквенно-цифровой код с буквой во второй позиции и цифрой в третьей символьной позиции для отличия от кодов МКБ-10. Включение принудительного числа в третьей позиции символа предотвращает написание "нежелательных слов". Буква во второй позиции символа позволяет четко различать код из МКБ-11 и код из МКБ-10. Буквенно-цифровые коды охватывают диапазон от 1A00.00
                                    до ZZ9Z.ZZ. Коды, начинающиеся с "X", указывают на код расширений. Буквы "O" и "I" опущены, чтобы избежать путаницы с цифрами "0" и "1"
                                </div>

                                <div>
                                    Первый символ кода является буквой и не относится к номеру класса. Буква могла быть одинаковой для двух коротких классов (например, класс VII (H00-H5) и класс VIII (H60-H95), или две буквы могли быть использованы для одного длинного класса (например, класс XIX (S00-T98))
                                </div>
                                <div>
                                    Первый символ кода всегда относится к классу. Первый символ 1-9 используется для классов с 01 по 09, а для классов с 10 по 26 первый символ - это буква. Диапазон кодов одного класса всегда имеет один и тот же символ в первой позиции. Например, 1A00 - это код в классе 01, а BA00 - это код в классе 11
                                </div>


                                <div>
                                    Остаточная рубрика, обозначенная числовым символом .8 и неопределенная рубрика, обозначенная числовым символом .9
                                </div>
                                <div>
                                    Буква "Y" зарезервирована для остаточной рубрики "другие определенные", а буква "Z" зарезервирована для остаточной рубрики "неопределенные"
                                </div>


                                <div>
                                    Концепция кодового кластера (кодовой последовательности) не существует в МКБ-10
                                </div>
                                <div>
                                    МКБ-11 поддерживает посткоординацию и связывание кодов
                                </div>

                                <div className={`${style.defaultTableGap} ${style.defaultBold}`}>
                                    <div>
                                        Терминология
                                    </div>
                                </div>

                                <div>
                                    Ряд выражений используется для описания причинно-следственной связи между условиями в заголовке кода
                                </div>
                                <div>
                                    Предпочтительным термином является "из-за" для рубрик, где упоминаются два условия и существует причинно-следственная последовательность. Другие термины, такие как "вызвано"; или "приписывается", могут быть допустимыми синонимами. Фраза "вторичный по отношению" эквивалентна и также может быть включена в качестве синонима
                                </div>

                                <div>
                                    Диапазон выражений, указывающих на совпадение двух условий в названии кода (например, "в" или "с")
                                </div>
                                <div>
                                    Предпочтительным термином является "связанное с" для рубрик, в которых упоминаются два условия и не подразумевается причинно-следственная связь
                                </div>

                                <div className={`${style.defaultTableGap} ${style.defaultBold}`}>
                                    <div>
                                        Система «Кинжал-звездочка» и дополнительные подклассификации
                                    </div>
                                </div>

                                <div>
                                    МКБ-10 (и МКБ-9) использовали систему «Кинжал-звездочка» для описания этиологического состояния для первичной табуляции (код «Кинжал») и клинического проявления, соответствующего участка и/или других аспектов (код «Звездочка»). Кроме того, существовали наборы кодов, которые можно было использовать для добавления большей детализации (например, B95-B97), или списки подклассификаций для добавления анатомических деталей к рубрикам
                                </div>
                                <div>
                                    Эквиваленты кодов звездочки МКБ-11 (т.е. кодов проявлений) и других кодов, которые служили для добавления деталей, можно найти в классе 21 "Симптомы, признаки или клинические данные, не классифицированные в других рубриках", в классе X "Дополнительные коды" или в соответствующем классе о системе организма. Дополнительные коды включают в себя группы классов анатомия, агенты, гистопатология и другие аспекты, которые могут быть использованы для добавления деталей в код
                                </div>

                                <div className={`${style.defaultTableGap} ${style.defaultBold}`}>
                                    <div>
                                        Использование нескольких кодов для одного условия/дополнительные подклассификации
                                    </div>
                                </div>

                                <div>
                                    Для указания более подробной информации для другой рубрики можно использовать более одной рубрики. Например, инфекционные агенты (B95-B97) или коды со звездочкой
                                </div>

                                <div>
                                    Посткоординация - использование нескольких кодов (например, основных кодов и/или кодов расширения) вместе для полного описания документированной клинической концепции
                                </div>


                                <div className={`${style.defaultTableGap} ${style.defaultBold}`}>
                                    <div>
                                        Указание «Кодировать также»
                                    </div>
                                </div>

                                <div>
                                    При желании используйте дополнительный код для идентификации» присутствовали примечания, предлагающие дополнительное кодирование
                                </div>
                                <div>
                                    Указание «Кодировать также» информируют о дополнительной информации, которую необходимо закодировать в сочетании с определенными рубриками, поскольку эта дополнительная информация имеет отношение к первичной таблице
                                </div>
                            </div>

                            <h2>Инструкции для пользователей</h2>
                            <p>
                                Средства ознакомления и пользовательского взаимодействия со справочником, предоставляемые локализованным Контейнером МКБ-11, а также инструкция по применению МКБ-11 разработчиками медицинских информационных систем Вы можете просмотреть по следующим ссылкам:
                            </p>
                            <ul className={style.defaultUl}>
                                <li>
                                    {'для разработчиков МИС: '}
                                    <a href={'/Руководство_для_МИС.pdf'}>
                                        {'Руководство по работе с контейнером МКБ 11'}
                                    </a>
                                </li>
                                <li>
                                    {'для медицинских работников: '}
                                    <a href={'/Руководство пользователя.pdf'}>
                                        {'Руководство пользователя'}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </>}
            </div>
        )
    }

    // useEffect(() => {
    //     if(window.location.pathname === '/') {
    //         const node = ()
            // var content = renderToStaticMarkup(renderPage());
            // console.log('===================== $$$$$$$$$$$$$$$$$$$$$$ =====================',  content)
            // console.log('@@@@@@ WINDOW LOCATION @@@@@@@@@@@', renderPage())
            // setIsMkb(true)
        // } else {
        //     setIsMkb(false)
        // }
    // }, [window.location.pathname])

    return (
        <Layout
            type={type}
            uri={uri}
            ismobileleftmenu={ismobileleftmenu}
            setmobileleftmenu={setmobileleftmenu}
            conceptPage={conceptPage}
            updatePage={setUpdate}
            className={className}
            currentTocData={currentTocData}
            setAncestor={setAncestor}
        >
            <div
                className={style.banner}
            >
                {!!userInfo && !isEmpty(userInfo?.roles) && userInfo?.roles.includes('mkb_admin') && (process.env.REACT_APP_MAIN_THEME === 'true') && type !== 'window' && isICDLatest &&
                    <Notification />}
            </div>
            <ModalWindow
                setModal={setModal}
                isModal={isModal}
            >
                <PostCoordination/>
            </ModalWindow>
            {!isMkb ? (
                <>
                    <slot
                        ref={slotMain}
                        name={'grid__main'}
                    ></slot>
                    {/*<slot*/}
                    {/*    name="fer-default"*/}
                    {/*></slot>*/}
                    {/*<slot*/}
                    {/*    name="domain-entity"*/}
                    {/*></slot>*/}
                    {/*<slot*/}
                    {/*    ref={slotMain}*/}
                    {/*    name="grid__body"*/}
                    {/*></slot>*/}
                </>
            ):(
                <slot
                    ref={slotMain}
                    name={'grid__main'}
                ></slot>)}

<slot name="grid__footer"></slot>
{/*<slot name="system"></slot>*/}
{/* <slot name="header_base"></slot> */}
{/* <slot name="TabAccounts"></slot> */}
{/* <slot name="TabSend"></slot> */}
{/*  */}
{/* <slot name="TabDapps"></slot> */}
{/* <slot name="TabSharding"></slot> */}
{/* <slot name="TabExplorer"></slot>  */}
</Layout>)}


export default Main;
