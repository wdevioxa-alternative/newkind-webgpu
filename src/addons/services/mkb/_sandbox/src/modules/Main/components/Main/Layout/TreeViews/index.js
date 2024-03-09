import React, {useEffect, useRef, useState, useCallback, useContext} from "react";
import TreeView, { flattenTree, addChildren } from "../../../../../../components/react-accessible-treeview/src";
import style from  "./index.module.css";
import css from  "./index.css";
import TreeSVG from '../../../../../../components/img/treeSVG'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector, useStore} from 'react-redux'
import {api, href} from '../../../../../../utilites/Icd-11'
import isEmpty from "../../../../../../utilites/isEmpty";
import {tocActions} from "../../../../reducers/tableOfContent";
import {Spinner} from "../../../../../../components/img/Spinner";
import { inputSearchCoordActions } from "../../../../reducers/inputSearchCoord";
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { UserContext } from '@src/App';

const DEFAULT_OPTIONS = {
    config: { attributes: true, childList: true, subtree: true },
};

const getToc = (store) => {
    return store.getState().icd.toc.chapter
}

function useMutationObservable(targetEl, cb, options = DEFAULT_OPTIONS) {
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        const obs = new MutationObserver(cb);
        setObserver(obs);
    }, [cb, options, setObserver]);

    useEffect(() => {
        if (!observer) return;
        const { config } = options;
        observer.observe(targetEl, config);
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [observer, targetEl, options]);
}

const current = (store) => {
    return store.getState().icd.toc.current
}

const stateLoading = (store) => {
    return store.getState().icd.toc.isLoading
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
export const TreeViews = ({ dataHtml, setToc, setExpand, data, setUpdateToc, updatePage, expand, tocPage, isChildElsewhere, type }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const store = useStore();
    const currentId = useSelector(state => state.icd.toc.current)
    const isLoading_page = useSelector(state => state.icd.coordination.isLoading)
    const isLoading_toc = useSelector(state => state.icd.toc.isLoading)
    const listRef = useRef();
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext);
    const onListMutation = useCallback(
        (mutationList) => {
            const id = current(store)
            for(let i = 0; i < mutationList.length; ++i) {
                switch (mutationList[i].type) {
                    case 'childList':
                        let item = mutationList[i].target.querySelector(`.isActive`)
                        if(item) {
                            item.scrollIntoView({
                                behavior: 'smooth',
                                inline: 'nearest',
                                block: 'center'
                            });
                            break
                        }
                        break
                    case 'attributes':
                        if(mutationList[i].target.dataset.isactive === 'true') {
                            mutationList[i].target.scrollIntoView({
                                behavior: 'smooth',
                                inline: 'nearest',
                                block: 'center'
                            });
                            break
                        }
                        break
                    default:
                        break

                }
            }
        },[]
    );

    useMutationObservable(listRef.current, onListMutation,DEFAULT_OPTIONS);

    return (
        <TreeView
            ref={listRef}
            data={ data }
            label={'toc'}
            aria-label="table of content"
            className={style.treeView}
            defaultExpandedIds={expand}
            togglableSelect={false}
            propagateSelect={false}
            propagateSelectUpwards={false}
            onExpand={({element, isBranch, isExpanded, isSelected, isHalfSelected, isDisabled, treeState }) => {
                if(element.id !== 1) {
                    const toc = getToc(store)
                    let childrenId = undefined
                    let isInclude = false

                    if(element.child) {
                        childrenId = typeof element.child[0] === 'object' ? element.child[0].id : element.child[0]
                        isInclude = false
                    }

                    if(!isInclude && !expand.some(id => element.id === id)) {
                        if(element.child || element.isChild ) {
                            element.isLoading = true

                            dispatch(
                                tocActions.setLoading(true)
                            );

                            const user = !isEmpty(userInfo) ? userInfo.email : anonUser
                            analytics.page();
                            analytics.identify(user, {
                                userAgent: window.navigator.userAgent,
                                deseaseCode: element.code ? element.code : element.title,
                                action: 'select_entity'
                            })

                            setUpdateToc({
                                isChild: !isEmpty(element.child) || element.isChild,
                                isFoundationChildElsewhere: element.isFoundationChildElsewhere,
                                classKind: element.classKind,
                                link: element.link,
                                id: element.id,
                                child: element.child,
                                children: element.children
                            })

                            dispatch(
                                tocActions.setLoading(false)
                            );
                        }
                    }
                }
            }}
            onSelect={({element, isBranch, isExpanded, isSelected, isHalfSelected, isDisabled, treeState }) => {
                if(isSelected && !isLoading_toc && !isLoading_page) {
                    if(dataHtml) {
                        let items = dataHtml.querySelectorAll('[data-id]')
                        for(let i = 0; i < items.length; ++i) {
                            let item = items[i].querySelector('.isActive')
                            if(item !== null) {
                                item.classList.remove('isActive')
                            }
                        }
                    }

                    const url = new URL(element.link)
                    dispatch(tocActions.setCurrent(url.href))
                    dispatch(inputSearchCoordActions.deleteResultSearch());

                    if(type !== 'window') {
                        navigate(`${href.decoder(url.pathname, 'page')}`)
                    } else {
                        if(url.pathname !== '/') {
                            navigate(`${href.decoder(`${url.pathname}`, 'coding')}`)
                        }
                    }
                }
            }}
            nodeRenderer={ ({
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
                const isFoundationChildElsewhere = element.isFoundationChildElsewhere ;
                let props = {...getNodeProps()};
                let color = 'var(--black-100per)'
                let isLoadingItem = false
                let isActive = false
                if(element.link && (element.link.includes('unspecified') || element.link.includes('other') )) {
                    color = `var(--burgundy-100per)`
                }

                if(element.isFoundationChildElsewhere) {
                    color = `var(--gray-100per)`
                }

                if(element.isLoading && isSelected) {
                    isLoadingItem =  isLoading_page
                }

                if(element.link === currentId) {
                    element.isLoading = true
                    isLoadingItem =  isLoading_page
                    props.className = `${props.className} isActive`
                }

                return (
                    <>
                        {isFoundationChildElsewhere ?
                            isChildElsewhere ? (
                                <div
                                    {...props}
                                    data-isactive={element.link === currentId}
                                    style={{
                                        paddingLeft: `${(1.3 * (level - 1))}vw`
                                        // paddingLeft: isChildren ? (28 * (level - 1) + 29) : (28 * (level - 1))
                                    }}
                                >
                                    <div className={style.spinnerWrapper}></div>
                                    <TreeSVG
                                        isBranch={isBranch}
                                        isOpen={isExpanded}
                                        width={"20"}
                                        height={"20"}
                                        className={style.squarePlus}
                                    />
                                    <div
                                        style={{
                                            color: color
                                        }}
                                        className={styleName}
                                    >
                                        {element.name}
                                    </div>
                                </div>) : ''

                            : (
                            <div
                                data-isactive={element.link === currentId}
                                {...props}
                                style={{
                                    paddingLeft: `${(1.3 * (level - 1))}vw`
                                    // paddingLeft: isChildren ? (28 * (level - 1) + 29) : (28 * (level - 1))
                                }}
                            >
                                <div className={style.spinnerWrapper}>
                                {isLoadingItem ? (<Spinner />) : (
                                    <TreeSVG
                                        isBranch={isBranch}
                                        isOpen={isExpanded}
                                        width={"20"}
                                        height={"20"}
                                        className={style.squarePlus}
                                    />)
                                }
														</div>
                                <div
                                    style={{
                                        color: color
                                    }}
                                    className={styleName}
                                >
                                    {element.name}
                                </div>
                            </div>)}
                    </>
                )

            }}
        />
    );
}
