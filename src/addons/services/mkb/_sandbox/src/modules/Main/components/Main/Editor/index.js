import React, {useRef, useState, useContext} from 'react';
import style from './index.module.css'
import pureStyle from './index.css'
import InputSearchWrapper from '../../../../../components/InputSearchWrapper';
import StyleMap from '../../../../../components/img/StyleMap/StyleMap';
import CrossHelp from '../../../../../components/img/CrossHelp/CrossHelp';
import CirclePlus from '../../../../../components/img/CirclePlus/CirclePlus';
import { idKey } from '../../../../../utilites/idKey';
import { ModalWindow } from '../../../../../components/modal';
import { SearchDisease } from '../../../../../components/modal/template';
import {additionalCodes, chaptersOfXV, TreeViews} from "./TreeViews";
import Close from "../../../../../components/img/Close";
import { Rnd } from "../../../../../components/react-draggable";
import {useDispatch, useSelector, useStore} from "react-redux";
import { coordinationActions } from "../../../reducers/coordination";
import { globalActions } from "../../../reducers/global";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { UserContext } from '@src/App';

import {
    childForPostcoordination,
    foundationChildElsewhere,
    getAxisName,
    getParentChapter,
    getPostcoordinationScale,
    href,
    transformPostcoordinationScale
} from "../../../../../utilites/Icd-11";
import isEmpty from "../../../../../utilites/isEmpty";
import {isMobile} from "react-device-detect";
import {getCode} from "../Coder";

const allPostcoordinationScale = (store, axisName) => {
    return store.getState().icd.coordination.postcoordinationScale
}

const mainId = (store) => {
    return store.getState().icd.coordination.coordination[0].substrate
}

const globalToc = (store) => {
    return store.getState().icd.global.coordination.toc
}

export const globalPosition = (store) => {
    return store.getState().icd.global.coordination.tree
}

/**
 * @param props {Object} - компонент для отображения посткоординации
 * @returns {JSX.Element}
 * @constructor
 */
export const Editor = ({type, postcoordination, className, title, root, isRoot, forceUpdate, setForceUpdate, allToc, setAllToc }) => {
    const rndRef = useRef(null);
    const dispatch = useDispatch();
    const store = useStore();
    const isLoading = useSelector(state => state.icd.coordination.isLoading);
    const [isModal, setModal] = useState(false);
    const requiredPostcoordination = ['кодировать также', 'если потребуется, используйте дополнительный код']
    const coordination = useSelector(state => state.icd.coordination.coordination)
    // const [userInfoStorage, setUserInfoStorage] = useLocalStorage('__userInfo', undefined);
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext);

    const onClickHelpHandler = (event) => {
        setModal(!isModal)
    }

    const onClickAxisHandler = (item, target) => {
        let toc = globalToc(store)
        if(isEmpty(toc[`${item.axisName}`])) {
            for(let key in toc) {
                toc[key].isModal = false
                toc[key].expand = [1]
            }

            toc[`${root}_${item.axisName}`] = {
                isModal: true,
                expand: [1]
            }
        } else {
            for(let key in toc) {
                if(key !==`${root}_${item.axisName}` ) {
                    toc[key].isModal = false
                    toc[key].expand = [1]
                } else {
                    toc[key].isModal = true
                    toc[key].expand = [1]
                }
            }
        }

        dispatch(
            globalActions.coordination.toc(toc)
        )

        setForceUpdate(!forceUpdate)
    }

    const onCloseTreeHandler = (item) => {
        let toc = globalToc(store)
        toc[`${root}_${item.axisName}`] = {
            isModal: false,
            expand: [1]
        }

        setAllToc(previous => {
            return {... toc}
        })
    }

    const onSetCode = async (axis, element) => {
        if(!isLoading) {
            const tocStore = allPostcoordinationScale(store)
            const tocStoreKeys = Object.keys(tocStore)

            const chapter = await getParentChapter(element.ancestor[element.ancestor.length - 1], '22222')

            element.name = `${element.code} ${element.title}`
            const isAdditional = additionalCodes.includes(axis.axisName)
            const isXV = chaptersOfXV.includes(chapter.code)
            const isBlock = element.classKind === 'block'
            const codeBlock = isBlock && !!element.codeRange ? element.codeRange.split('-')[1] : undefined

            if(!isEmpty(element.postcoordinationScale)) {
                element.postcoordinationScale = element.postcoordinationScale.filter(item => !additionalCodes.includes(getAxisName(item.axisName)))
            }

            const ID = mainId(store)
            const isNextLayer = !isEmpty(element.postcoordinationScale)
            const isForSecondLayer = root !== ID

            let postToc = []
            if(!isEmpty(element.postcoordinationScale)) {
                postToc = await getPostcoordinationScale(element);

                for(let coordination of postToc.postcoordinationScale) {
                    let count = 0
                    for(let item of coordination.scaleEntity) {
                        if(!isEmpty(item.foundationChildElsewhere)) {
                            const childElsewhere = await foundationChildElsewhere(item);
                            if(isEmpty(coordination.scaleEntity[count].child)) {
                                coordination.scaleEntity[count].child = []
                            }
                            coordination.scaleEntity[count].child = coordination.scaleEntity[count].child.concat([...childElsewhere])
                        }
                    }
                    count++
                }

                postToc = await childForPostcoordination(postToc)
                postToc = await transformPostcoordinationScale(postToc);
            }
     
            let axisParenName = ''
            for(let key of tocStoreKeys) {
                for(let item of tocStore[key]) {
                    if(element.code === item.code) {
                        for(let object of tocStore[key]) {
                            if(object.parent === 0) {
                                axisParenName = `${root}_${object.name}`
                            }
                        }
                    }
                }
            }

            let data = {
                type: 'set',
                root: root,
                rootAxis: axisParenName,
                axisName: axis.axisName,
                allowMultipleValues: axis.allowMultipleValues,
                object: {
                    isAdditional: isAdditional,
                    isXV: isXV,
                    isBlock: isBlock,
                    isNextLayer: isNextLayer,
                    isForSecondLayer: isForSecondLayer,
                    codeBlock: codeBlock,
                    id: element.id,
                    title: element.title,
                    chapter: chapter.code,
                    code: element.code,
                    ancestor: element.ancestor,
                    postcoordinationScale: postToc,
                    codeRange: element.codeRange,
                    classKind: element.classKind,
                    name: element.name,
                    child: element.child
                }
            }

            const user = !isEmpty(userInfo) ? userInfo.email : anonUser

            analytics.page();
            analytics.identify(user, {
                userAgent: window.navigator.userAgent,
                deseaseCode: getCode.all(coordination).self,
                action: 'select_postcoordination_code'
            })

            dispatch(
                coordinationActions.changeCode({
                    data: data,
                    cb: () => {
                        setForceUpdate(!forceUpdate)
                    }
                })
            );
        } else {
            console.log('страница загружается...')
        }
    }

    const windowPostcoordination = {
        position: 'absolute',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const isPostCoordination = !isEmpty(postcoordination)
    const TOC = globalToc(store)
    const treePos = globalPosition(store)

    return (<>{isPostCoordination ? (
        <div className={`${style.container} ${className.editor__container}`}>
            <ModalWindow
                setModal={setModal}
                isModal={isModal}
            >
                <SearchDisease />
            </ModalWindow>
            <div className={style.detailsTitle}>
                <div className={style.detailsTitleLabel}>Добавить подробности к/в</div>
                <strong style={{ color: "blue"}}>{title}</strong>
            </div>
            {postcoordination.postcoordinationScale.map(axis => {
                return (
                    <React.Fragment key={idKey()} >
                        {(isRoot || !additionalCodes.includes(axis.axisName)) &&
                            <React.Fragment key={idKey()} >
                                <div className={style.details}>
                                    <div className={style.details}>
                                        <div className={style.detailsAgent}>
                                            <p className={style.detailsAgentTitle}>{`${getAxisName(axis.axisName)}`}</p>
                                            <p className={style.detailsAgentInfo}>{axis.requiredPostcoordination ? requiredPostcoordination[0] :requiredPostcoordination[1]}</p>
                                        </div>
                                    </div>
                                </div>
                                {axis.isVisible ? (
                                    <React.Fragment key={idKey()} >
                                        <div className={style.editor}>
                                            {axis.scaleEntity.map(object => (
                                                <React.Fragment key={idKey()}>
                                                    <div
                                                        onClick={() => {
                                                            onSetCode(axis, object).catch(e => console.error(e))
                                                        }}
                                                        className={style.editorItem}
                                                    >
                                                        <div
                                                            className={style.editorDescription}
                                                        >
                                                            <span>
                                                                {`${object.code}`}
                                                            </span>
                                                            {`${object.title}`}
                                                        </div>
                                                    </div>
                                                    {object.child
                                                        ? object.child.map(child => {
                                                            return (
                                                                <React.Fragment key={idKey()}>
                                                                    <div
                                                                        className={style.editorItemChild}
                                                                        onClick={() => {
                                                                            onSetCode(axis, child).catch(e => console.error(e))
                                                                        }}
                                                                    >
                                                                        <div className={style.editorDescription}><span>{`${child.code}`}</span>{`${child.title}`}</div>
                                                                    </div>
                                                                    {child.child
                                                                        ? child.child.map(data => {
                                                                            return (
                                                                            <React.Fragment key={idKey()}>
                                                                                <div
                                                                                    className={style.editorItemChildSecond}
                                                                                    onClick={() => {
                                                                                        onSetCode(axis, data).catch(e => console.error(e))
                                                                                    }}
                                                                                >
                                                                                    <div className={style.editorDescription}><span>{`${data.code}`}</span>{`${data.title}`}</div>
                                                                                </div>
                                                                            </React.Fragment>
                                                                        )}) : ''}
                                                                </React.Fragment>)}) : ''}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </React.Fragment>
                                ) : ''}
                                <div className={style.search}>
                                    {!axis.isVisible ? (
                                        <>
                                            <InputSearchWrapper
                                                className={style}
                                                axis={axis}
                                                onSetCode={onSetCode}
                                            />
                                            {!isMobile &&
                                                <div onClick={onClickHelpHandler}>
                                                    <CrossHelp className={style.crossHelp} />
                                                </div>
                                            }
                                        </>
                                    ) : ''}
                                </div>
                                {!axis.isVisible ? (
                                    <div className={style.treeViews}>
                                        <TreeViews
                                            type={type}
                                            className={style}
                                            forceUpdate={forceUpdate}
                                            setForceUpdate={setForceUpdate}
                                            allToc={allToc}
                                            setAllToc={setAllToc}
                                            root={root}
                                            axis={{
                                                allowMultipleValues: axis.allowMultipleValues,
                                                axisName: axis.axisName
                                            }}
                                            axisName={axis.axisName}
                                            data={axis.toc}
                                        />
                                    </div>
                                ) : ''}
                            </React.Fragment>
                        }

                    </React.Fragment>
                )})}                                
        </div>
    ) : (<div>Загружается</div>)}</>)
}


export default Editor;
