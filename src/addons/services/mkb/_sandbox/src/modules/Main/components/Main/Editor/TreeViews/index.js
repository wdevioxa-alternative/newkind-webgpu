import React, {useContext} from "react";
import TreeView from "../../../../../../components/react-accessible-treeview/src";
import style from  "./index.module.css";
import css from  "./index.css";
import TreeSVG from '../../../../../../components/img/treeSVG'
import {useDispatch, useSelector, useStore} from 'react-redux'
import {tocActions} from "../../../../reducers/tableOfContent";
import {coordinationActions} from "../../../../reducers/coordination";
import {globalActions} from "../../../../reducers/global";
import isEmpty from "../../../../../../utilites/isEmpty";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import {getCode} from '../../Coder'
import { UserContext } from '@src/App';
import {href} from '../../../../../../utilites/Icd-11'

import {
    getAxisName,
    foundationChildElsewhere,
    getPostcoordinationScale,
    transformPostcoordinationScale,
    childForPostcoordination
} from "../../../../../../utilites/Icd-11";
import { Spinner } from '../../../../../../components/img/Spinner'
import {idKey} from "../../../../../../utilites/idKey";
import translate from '../../../../../../utilites/Icd-11/axisTranslate'

export const additionalCodes = [translate('Associated with', 'ru'),translate('Associated with'), translate('Has manifestation'), translate('Has manifestation', 'ru'), translate('Has causing condition', 'ru'), translate('Has causing condition')]

export const chaptersOfXV = ["X", "V"]

const mainId = (store) => {
    return store.getState().icd.coordination.coordination[0].substrate
}

// const coordinationScale = (store, axisName) => {
//     return store.getState().icd.coordination.postcoordinationScale[axisName]
// }

const allPostcoordinationScale = (store) => {
    return store.getState().icd.coordination.postcoordinationScale
}

const globalToc = (store) => {
    return store.getState().icd.global.coordination.toc
}

const treeToc = (store, axisName) => {
    return store.getState().icd.coordination.postcoordinationScale
}

/**
 * @kind function
 * @param props {Object} - компонент для отображения Table Of Content
 * @returns {JSX.Element}
 * @example
 * const {infoAgent, relation, setInfoAgent, setRelation, page} = props
 * return (
 *   <User age={age} name={name} />
 * )
 */
export const TreeViews = ({ type, allToc, className, forceUpdate, setForceUpdate, data, axis, root }) => {
    const dispatch = useDispatch();
    const store = useStore();
    const postcoordinationScale = useSelector(state => state.icd.coordination.postcoordinationScale)
    const isLoading_page = useSelector(state => state.icd.coordination.isLoading)
    const isLoading_toc = useSelector(state => state.icd.toc.isLoading)
    const coordination = useSelector(state => state.icd.coordination.coordination)
    // const [userInfoStorage, setUserInfoStorage] = useLocalStorage('__userInfo', undefined);
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext); 

    const TOC = globalToc(store)
    const updateState = (current, items, callback) => {
        dispatch(
            tocActions.fetchChildren({
                type: 'postcoordination',
                isFoundationChildElsewhere: items.isFoundationChildElsewhere,
                id: items.id,
                link: href.icd2self(new URL(items.element.link).pathname, items.element.link),
                previous: current,
                axisName: items.axisName,
                root: items.root,
                child: items.child,
                cb: (error, content) => {
                    if (error) {
                        callback({error: {
                                status: true,
                                message: error
                            }})
                        return;
                    }

                    callback({error: {
                        status: false,
                        message: ''
                    }})

                    dispatch(
                        tocActions.setLoading(false)
                    );
                }
            })
        );
    }

    let expanded = undefined
    if(TOC[`${root}_${axis.axisName}`]) {
        expanded = TOC[`${root}_${axis.axisName}`].expand
    }

    return (
        <TreeView
            data={ postcoordinationScale[axis.axisName] ? postcoordinationScale[axis.axisName] :data }
            label={'axis'}
            aria-label="axis of content"
            className={`${style.treeView} ${className.treeView}`}
            togglableSelect={false}
            defaultExpandedIds={expanded ? expanded: [0]}
            propagateSelectUpwards={true}
            onExpand={({element, isBranch, isExpanded, isSelected, isHalfSelected, isDisabled, treeState }) => {
                try {
                    if(element.id !== 0) {
                        let isNextLayer = !isEmpty(element.postcoordinationScale)
                        let dataToc = treeToc(store)
                        dataToc = dataToc ? dataToc : data
                        let axisCurrent = dataToc[`${root}_${axis.axisName}`]
                        let axisChildren = undefined
                        let itemChildren = undefined
                        let isEmptyItem = true
                        let includesChildren = undefined

                        if(element.id) {
                            axisChildren = dataToc[`${root}_${axis.axisName}`][element.id]
                        }

                       if(axisChildren) {
                           if(axisChildren.children[0] && axisChildren.children.length === 1) {
                               itemChildren = axisCurrent[axisChildren.children[0]]
                               isEmptyItem = isEmpty(itemChildren.name.trim())

                               if(isEmptyItem) {
                                   includesChildren = axisCurrent.filter(item => {
                                       if(item.name === element.name && item.id !== element.id) {
                                           return true
                                       }
                                   })

                                   if(!isEmpty(includesChildren)) {
                                       if(includesChildren[0].children.length === 1) {

                                       } else {
                                           isEmptyItem = false
                                       }

                                   } else {

                                   }
                               } else {

                               }

                           } else {
                               isEmptyItem = false
                           }
                       } else {
                           console.error('нет объекта')
                       }

                        if(isEmptyItem) {
                            element.isLoading = true
                            dispatch(
                                tocActions.setLoading(true)
                            );

                            const user = !isEmpty(userInfo) ? userInfo.email : anonUser
                            analytics.page();
                            analytics.identify(user, {
                                userAgent: window.navigator.userAgent,
                                deseaseCode: getCode.all(coordination).self,
                                action: 'select_entity'
                            })


                            updateState(postcoordinationScale[axis.axisName] ? postcoordinationScale[axis.axisName] :data, {
                               id: element.id,
                               child: element.child,
                               classKind: element.classKind,
                               axisName: axis.axisName,
                                root: root,
                               isFoundationChildElsewhere: element.isFoundationChildElsewhere,
                               element: element
                            }, (error) => {
                                if(!error.status) {
                                    let toc = globalToc(store)
                                    const expand = Array.from(treeState.expandedIds);
                                    toc[`${root}_${axis.axisName}`] = {
                                        isModal: true,
                                        expand: expand
                                    }

                                    dispatch(globalActions.coordination.toc(toc))
                                } else {
                                    console.error('error from toc', error)
                                }
                            })

                        } else {
                            let toc = globalToc(store)
                            const expand = Array.from(treeState.expandedIds);
                            toc[`${root}_${axis.axisName}`] = {
                                isModal: true,
                                expand: expand
                            }

                            dispatch(globalActions.coordination.toc(toc))
                        }
                    }
                } catch (e) {
                    console.log('error: ', e)
                }
            }}
            onSelect={async ({element, isExpandIcon, isBranch, isExpanded, isSelected, isHalfSelected, isDisabled, treeState }) => {
                if(!isLoading_toc && !isLoading_page) {
                    if(!isExpandIcon && isSelected && axis.axisName !== element.name || isExpandIcon && isSelected && !element.child && !isLoading_page && axis.axisName !== element.name) {
                        dispatch(
                            coordinationActions.setLoading(true)
                        );

                        const tocStore = allPostcoordinationScale (store)
                        const tocStoreKeys = Object.keys(tocStore)

                        const isAdditional = additionalCodes.includes(axis.axisName)
                        const isXV = chaptersOfXV.includes(element.chapter)
                        const isBlock = element.classKind === 'block'
                        const codeBlock = isBlock && !!element.codeRange ? element.codeRange.split('-')[1] : undefined

                        if(!isEmpty(element.postcoordinationScale)) {
                            element.postcoordinationScale = element.postcoordinationScale.filter(item => !additionalCodes.includes(getAxisName(item.axisName)))
                        }

                        const ID = mainId(store)
                        let isNextLayer = !isEmpty(element.postcoordinationScale)
                        const isForSecondLayer = root !== ID
                        let postToc = []

                        if(isNextLayer) {
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

                            let toc = globalToc(store)

                            toc[`${root}_${axis.axisName}`] = {
                                isModal: false,
                                expand: [1]
                            }

                            dispatch(
                                globalActions.coordination.toc(toc)
                            )

                            for(let axisItem of postToc.postcoordinationScale) {
                                dispatch(
                                    coordinationActions.postcoordinationScale({
                                        axisName: `${element.code}_${axisItem.axisName}`,
                                        toc: axisItem.toc
                                    })
                                )
                            }
                        }

                        let data = {}
                        if(axis.allowMultipleValues === "AllowedExceptFromSameBlock") {
                            const toc = postcoordinationScale[`${root}_${axis.axisName}`]
                           if(element.classKind !== 'block') {
                               for(let parent of element.ancestor) {
                                   const pathname = new URL(parent).pathname
                                   data = toc.find(item => {
                                       if(item.link) {
                                           let link = new URL(item.link).pathname
                                           link = link.startsWith('/v1') ? link: `/v1${link}`
                                           return link === pathname
                                       } else {
                                           return  false
                                       }
                                   })
                                   if(data.classKind === 'block') {
                                       break
                                   }
                               }
                           } else {
                                data = element
                           }
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

                        let unspecified = undefined
                        if(!element.code) {
                            unspecified = element.child.find(item => {
                                if(typeof item !== 'string') {
                                    if(item?.id?.includes('unspecified')) {
                                        return item
                                    }
                                }
                            })

                            if(unspecified) {
                                unspecified = unspecified.code
                            }
                        }

                        const object = {
                            type: 'set',
                            root: root,
                            rootAxis: axisParenName,
                            axisName: axis.axisName,
                            allowMultipleValues: axis.allowMultipleValues,
                            parentBlock: data.title,
                            object: {
                                isAdditional: isAdditional,
                                isXV: isXV,
                                isBlock: isBlock,
                                isForSecondLayer: isForSecondLayer,
                                isNextLayer: isNextLayer,
                                isUnspecified: !!(!element.code && unspecified),
                                codeBlock: codeBlock,
                                id: element.link,
                                title: element.title,
                                chapter: element.chapter,
                                unspecified: unspecified,
                                code: element.code,
                                ancestor: element.ancestor,
                                postcoordinationScale: postToc.postcoordinationScale,
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
                                data: object,
                                cb: () => { }
                            })
                        );

                    } else {

                    }
                }
            }}
            nodeRenderer={({
                    element,
                    handleExpand,
                    getNodeProps,
                    dispatch,
                    level,
                    handleSelect,
                    isSelected,
                    isBranch,
                    isExpanded,
                }) => {
                const styleName = isBranch ? style.isBranch : style.isNotBranch
                const isChildren = isEmpty(element.children)
                let color = 'var(--black-100per)'
                let isLoadingItem = false

                if(element.link && (element.link.includes('unspecified') || element.link.includes('other') )) {
                    color = `var(--burgundy-100per)`
                }

                if(element.isLoading && isSelected) {
                    isLoadingItem =  isLoading_toc
                }

                if(element.isFoundationChildElsewhere) {
                    color = `var(--gray-100per)`
                }

                return (
                    <div
                        {...getNodeProps()}
                        style={{
                            paddingLeft: isChildren ? `${(1.3 * (level - 1) + 1.3)}vw` : `${(1.3 * (level - 1))}vw`
                        }}>
                        {isLoadingItem ? (<Spinner />) : (
                            <TreeSVG
                                isBranch={isBranch}
                                isOpen={isExpanded}
                                width={"20"}
                                height={"20"}
                            />)}
                        <div
                            style={{
                                color: color
                            }}
                            className={styleName}
                        >
                            {element.code ? (<span
                                style={{
                                    color: color
                                }}
                                className={style.bold}>{element.code}
                            </span>) : ''}
                            {element.title}
                        </div>
                    </div>)
            }}
        />
    );
}
