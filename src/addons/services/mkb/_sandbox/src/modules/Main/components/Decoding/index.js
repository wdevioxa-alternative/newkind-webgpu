import React, {useRef, useState, useCallback, useEffect, useContext} from 'react';

import style from './index.module.css';

import InputSearch from '../../../../components/InputSearch';
import { Diagnosis } from './Diagnosis'
import { decoder, search } from '../../../../utilites/search';
import isEmpty from "../../../../utilites/isEmpty";
import { idKey } from "../../../../utilites/idKey";
import { getAxisName, api, href} from "../../../../utilites/Icd-11";
import { Breadcrumbs } from "../../../../components/Breadcrumbs";
import { isMobile } from 'react-device-detect';
import { Link } from "react-router-dom";
import { RedСircle } from '../../../../components/img/RedСircle'
import { RedСross } from '../../../../components/img/RedСross'
import highlightWords from './modules/highlight-words';
import { GreenSuccess } from '../../../../components/img/GreenSuccess'
import IndexCopyWrapper from '../../../../components/IndexCopyWrapper';
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import {useSelector} from "react-redux";
import { UserContext } from '@src/App';

const type = {
    NotFound: {
        first: 'Первый указанный основной код не найден в справочнике МКБ-11',
        else: "Код (коды), выделенные красным цветом, не найдены среди допустимых расширений или дополнений основного диагноза"
    },
    ExtraCode: {
        default: 'Количество указанных кодов расширений (дополнений) превышает количество доступных для них осей посткоординации'
    }
}

const errorQueue = (title, self, data, count) => {
    if (isEmpty(self[`${title}`])) {
        self[`${title}`] = []
    }
    data.position = count && count >= 0 ? count : 0
    self[`${title}`].push(data)

    return self
}

export const Decoding = () => {
    const [copySuccess, setCopySuccess] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [typeInputSearch, _setTypeInputSearch] = useState('input-search');
    const [postcoordination, setPostcoordination] = useState([]);
    const [selectedCode, setSelectedCode] = useState([]);
    const [request, setRequest] = useState([]);
    const [tree, setTree] = useState({});
    const [text, setText] = useState('');
    const [requestData, setRequestData] = useState([]);
    const [systems, setSystems] = useState('');
    const [wordForAddBySearchInInput, setWordForAddBySearchInInput] = useState('');
    const [errorArrayMessage, setErrorArrayMessage] = useState({});
    const checkRef = useRef(false);
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext); 

    let error = []
    let system = ''
    const inputValue = useCallback(async value => {
        const dataAfterFilter = decoder.validationCode(value.toUpperCase());
        if (value.length !== 0) {
            if (!isEmpty(dataAfterFilter.error)) {
                setErrorMessage(dataAfterFilter.error)
                return
            } else {
                const code = dataAfterFilter.data.replace(/\s/g,'').toUpperCase()
                decoder.searchCode(code)
                    .then(resultSearch => {
                        if (!isEmpty(resultSearch.error)) {
                            let message = ''
                            switch (resultSearch.error.errorType) {
                                case 1:
                                    message = `Cущность не найдена для кода: ${resultSearch.error.code}`
                                    break
                                default:
                                    message = resultSearch.error.message
                                    break
                            }

                            setErrorMessage(message)
                        } else {
                            console.log('resultSearch.codeChain', resultSearch.requested)
                            setSelectedCode(resultSearch.requested)
                            setErrorMessage('')
                            setRequest(resultSearch.requested)
                            setPostcoordination(resultSearch.codeChain)
                        }
                    });
            }
        } else {
            setErrorArrayMessage('')
            setErrorMessage('')
            setTree({})
            setPostcoordination({})
        }
    }, []);
    const filter = (data) => {
        let tmp = {
            data: {
                object: {
                    keys: [],
                    value: []
                }
            },
            raw: data
        }

        for (let item of data) {
            if (item.axisName) {
                if (isEmpty(tmp.data.object.value[item.axisName])) {
                    tmp.data.object.value[item.axisName] = []
                }
                tmp.data.object.value[item.axisName].push(item)
            } else {
                tmp.data.object.value['0'] = item
            }
        }

        tmp.data.object.keys = Object.keys(tmp.data.object.value)
        tmp.raw = data
        return tmp
    }

    let codeStringData = []
    const codeString = (code, ext, isError) => {
        if(!isEmpty(ext)) {
            codeStringData.push({
                text: ext,
                match: isError
            })
        }

        codeStringData.push({
            text: code,
            ext: ext,
            match: isError
        })
    }
    const convert = (data) => {
        let text = ``
        let result = []
        const isError = !isEmpty(data.error)

        result.push({
            code: data.code
        })

        if (isError) {
            data.error.message = type.NotFound.first
        }

        result[0].id = !isError ? new URL(href.decoder(api.transform.url.linearization(data.id))).pathname : undefined
        result[0].title = !isError ? data.title : ''
        result[0].isError = isError

        if (isError) {
            error = errorQueue(type.NotFound.first, error, result[0], 0)
        }

        text = text + `Код: ${request}`
        text = text + `\n     ${data.code} ${result[0].title}`
        system = `${request}: ${data.code} ${result[0].title}`
        codeString(data.code, '', isError)

        if (data.clarification) {
            if (isEmpty(result.axis)) {
                if (!isEmpty(data.clarification)) {
                    for (let axis of data.clarification) {
                        if (axis.id) {
                            axis.id = new URL(href.decoder(api.transform.url.linearization(axis.id))).pathname
                        }
                        if (isEmpty(axis.error)) {
                            axis.axisName = getAxisName(axis.axis)
                        } else {
                            axis.isError = true
                            axis.axisName = 'Ошибка'
                            axis.id = axis.id ? axis.id : undefined
                            axis.title = axis.title ? axis.title : ''
                            error = errorQueue(type.NotFound.else, error, axis)
                        }
                    }
                }

                let object = {
                    keys: [],
                    value: {}
                }

                for (let item of data.clarification) {
                    if (isEmpty(object.value[item.axisName])) {
                        object.value[item.axisName] = []
                    }

                    object.value[item.axisName].push(item)
                }

                object.keys = Object.keys(object.value)

                result[0].axis = {
                    ...object,
                    raw: data
                }
            }
        }

        if (data.editions) {
            let count = -1
            for (let axis of data.editions) {
                count++
                let datatmp = {}

                datatmp.code = axis.code
                datatmp.title = axis.title
                datatmp.id = axis.id

                if (!isEmpty(axis.error)) {
                    datatmp.isError = true
                    datatmp.axisName = 'Ошибка'
                    datatmp.id = datatmp.id ? new URL(href.decoder(api.transform.url.linearization(datatmp.id))).pathname : undefined
                    datatmp.title = datatmp.title ? datatmp.title : ''

                    if (!isEmpty(axis.clarification)) {
                        for (let data of axis.clarification) {
                            if (!isEmpty(data.error)) {
                                if (isEmpty(datatmp.axis)) {
                                    datatmp.axis = {}
                                }

                                if (isEmpty(datatmp.axis[`Ошибка`])) {
                                    datatmp.axis[`Ошибка`] = []
                                }

                                data.isError = true
                                data.id = data.id ? new URL(href.decoder(api.transform.url.linearization(data.id))).pathname : undefined
                                data.title = data.title ? data.title : ''
                                error = errorQueue(type.NotFound.else, error, data)
                                datatmp.axis[`Ошибка`].push(data)
                            } else {
                                data.axisName = getAxisName(data.axis)

                                if (isEmpty(datatmp.axis)) {
                                    datatmp.axis = {}
                                }

                                if (isEmpty(datatmp.axis[`${data.axisName}`])) {
                                    datatmp.axis[`${data.axisName}`] = []
                                }

                                data.id = new URL(href.decoder(api.transform.url.linearization(data.id))).pathname
                                if (!isEmpty(axis.error)) {
                                    error = errorQueue(type.NotFound.else, error, data)
                                }
                                datatmp.axis[`${data.axisName}`].push(data)
                            }
                        }
                    }

                    error = errorQueue(axis.error.errorType === 2 ? type.ExtraCode.default : type.NotFound.else, error, datatmp, count)
                } else {
                    datatmp.isError = false
                    datatmp.axisName = getAxisName(axis.axis)
                    datatmp.id = new URL(href.decoder(api.transform.url.linearization(axis.id))).pathname

                    if (axis.clarification) {
                        if (!isEmpty(axis.clarification)) {
                            for (let data of axis.clarification) {
                                if (!isEmpty(data.error)) {
                                    if (isEmpty(datatmp.axis)) {
                                        datatmp.axis = {}
                                    }

                                    if (isEmpty(datatmp.axis[`Ошибка`])) {
                                        datatmp.axis[`Ошибка`] = []
                                    }

                                    data.isError = true
                                    data.id = data.id ? new URL(href.decoder(api.transform.url.linearization(data.id))).pathname : undefined
                                    data.title = data.title ? data.title : ''
                                    error = errorQueue(type.NotFound.else, error, data)
                                    datatmp.axis[`Ошибка`].push(data)
                                } else {
                                    data.axisName = getAxisName(data.axis)

                                    if (isEmpty(datatmp.axis)) {
                                        datatmp.axis = {}
                                    }

                                    if (isEmpty(datatmp.axis[`${data.axisName}`])) {
                                        datatmp.axis[`${data.axisName}`] = []
                                    }

                                    data.id = new URL(href.decoder(api.transform.url.linearization(data.id))).pathname
                                    datatmp.axis[`${data.axisName}`].push(data)
                                }
                            }
                        }

                        datatmp.keys = Object.keys(datatmp.axis)
                        datatmp.isSecond = true
                    } else {
                        datatmp.isSecond = false
                    }
                }
                result.push(datatmp)
            }
        }

        result = filter(result)

        if (!isEmpty(result.data.object.keys)) {
            for (let i = 0; i < result.data.object.keys.length; ++i) {
                if (i === 0) {
                    const obj = result.data.object.value[result.data.object.keys[i]]
                    if (!isEmpty(obj.axis)) {
                        if (!isEmpty(obj.axis.keys)) {
                            for (let j = 0; j < obj.axis.keys.length; ++j) {
                                const item = obj.axis.value[obj.axis.keys[j]]
                                system = `${system} & (${obj.axis.keys[j]})`
                                text = text + ` \n        ${obj.axis.keys[j]}`
                                for (let k = 0; k < item.length; ++k) {
                                    codeString(item[k].code, '&', !!item[k].isError)
                                    system = `${system} ${item[k].code} ${item[k].title}`
                                    text = text + ` \n            ${item[k].code} ${item[k].title}`
                                }
                            }
                        }
                    }
                } else {
                    const obj = result.data.object.value[result.data.object.keys[i]]
                    system = `${system} (${result.data.object.keys[i]})`
                    text = text + `\n        ${result.data.object.keys[i]}`
                    for (let item of obj) {
                        if (item.isSecond) {
                            codeString(item.code, '/', !!item.isError)
                            system = `${system} / ${item.code} ${item.title}`
                            text = text + `\n            ${item.code} ${item.title}`
                            for (let l = 0; l < item.keys.length; ++l) {
                                system = `${system} & (${item.keys[l]})`
                                text = text + `\n                ${item.keys[l]}`
                                for (let m = 0; m < item.axis[item.keys[l]].length; ++m) {
                                    codeString(item.axis[item.keys[l]][m].code, '&', !!item.axis[item.keys[l]][m].isError)
                                    system = `${system} ${item.axis[item.keys[l]][m].code} ${item.axis[item.keys[l]][m].title}`
                                    text = text + `\n                    ${item.axis[item.keys[l]][m].code} ${item.axis[item.keys[l]][m].title}`
                                }
                            }
                        } else {
                            codeString(item.code, '/', item.isError)
                            system = `${system}${item.code} ${item.title}`
                            text = text + `\n            ${item.code} ${item.title}`
                            if (!isEmpty(item.axis)) {
                                for(let key in item.axis) {
                                    text = text + ` \n                ${key}`
                                    system = `${system} & (${key})`
                                    for(let i = 0; i < item.axis[key].length; ++i) {
                                        system = `${system} & ${item.axis[key][i].code} ${item.axis[key][i].title}`
                                        codeString(item.axis[key][i].code, '&', !!item.axis[key][i].isError)
                                        text = text + ` \n                  ${item.axis[key][i].code} ${item.axis[key][i].title}`
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        setRequestData(codeStringData)
        setSystems(system)
        setText(text)
        setTree(result.data.object)
        setErrorArrayMessage(error)
        codeStringData = []
        return result.data.object
    }

    const onChangeChecking = event => {}

    useEffect(() => {
        if (!isEmpty(postcoordination)) {
                convert(postcoordination)
        }
    }, [postcoordination]);

    const copyToClipBoard = async event => {
        try {
            const user = !isEmpty(userInfo) ? userInfo.email : anonUser
            analytics.page();
            analytics.identify(user, {
                userAgent: window.navigator.userAgent,
                deseaseCode: selectedCode,
                action: 'copying_decoding_result'
            })

            console.log('event.currentTarget.textContent', event.currentTarget.textContent)
            await navigator.clipboard.writeText(event.currentTarget.textContent);
        } catch (err) {
            setCopySuccess('Не получилось скопировать!');
        }
    };

    const onClickHeandler = async event => {
        try {
            if (!checkRef.current.checked) {
                console.log(systems)
                await navigator.clipboard.writeText(systems);
            }

            if (checkRef.current.checked) {
                console.log(text)
                await navigator.clipboard.writeText(text);
            }

            const user = !isEmpty(userInfo) ? userInfo.email : anonUser
            analytics.page();
            analytics.identify(user, {
                userAgent: window.navigator.userAgent,
                deseaseCode: selectedCode,
                action: 'copying_decoding_result'
            })

            setCopySuccess('Расшифровка кодовой последовательности скопирована.')

            let clear = setTimeout(() => {
                setCopySuccess('')
                clearTimeout(clear)
            }, "4000")
        } catch (err) {
            setCopySuccess('Не получилось скопировать!');
        }
    };

    return (
        <div className={style.wrapper}>
            <div className={style.inputContainer}>
                {!isMobile &&
                    <Breadcrumbs className={style}/>
                }

                <div className={style.inputWrapper}>
                    <InputSearch
                        placeholder={'Код для расшифровки'}
                        isOnlyEn={true}
                        className={style}
                        inputValue={inputValue}
                        typeInputSearch={typeInputSearch}
                        wordForAddBySearchInInput={wordForAddBySearchInInput}
                    />
                    {copySuccess &&
                        <div className={style.sucessMessage}>
                            <GreenSuccess />
                                {copySuccess}
                        </div>}
                    {errorMessage && !copySuccess &&
                        <div className={style.errorMessage}>
                            <RedСircle />
                               {errorMessage}
                        </div>}
                </div>
            </div>
            <div className={style.contentContainer}>
                {!isEmpty(tree.keys) &&
                    <div className={style.resultSearch}>
                        <div className={style.switcherBlock}>
                            <div className={style.wrapperSw}>
                                <div className={style.titleSw}>Скопировать в виде строки</div>
                                    <label className={style.switch} >
                                        <input type="checkbox" ref={checkRef} onChange={onChangeChecking}/>
                                        <span className={`${style.slider} ${style.round}`}></span>
                                    </label>
                                <div className={style.titleSw}>Скопировать в виде иерархии</div>
                            </div>
                            <div
                                onClick={onClickHeandler}
                            >
                                <IndexCopyWrapper
                                    className={style}
                                />
                            </div>
                        </div>


                        <div
                            className={style.postCoordinationCodeList}
                        >
                            <div className={style.postCoordinationCodeString}>Код:</div>
                            <div
                                className={style.code}
                                onClick={copyToClipBoard}
                            >

                                {requestData.map(chank => {
                                    return(
                                        <p
                                            key={idKey()}
                                            className={chank.match ? style.isActiveItemCode:''}
                                        >
                                            {chank.text}
                                        </p>)
                                })}
                            </div>
                        </div>
                        {tree.value[0].isError ? (
                            <div
                                className={`${style.postCoordinationName} ${tree.value[0].isError ? style.isError : ''}`}
                            >
                                {`${tree.value[0].code}`} <span
                                className={`${tree.value[0].isError ? style.isError : ''}`}>{`${tree.value[0].title}`}</span>
                            </div>
                        ) :(
                            <Link
                                to={tree.value[0].id}
                                target={"_blank"}
                                className={`${style.postCoordinationName} ${tree.value[0].isError ? style.isError : ''}`}
                            >
                                {`${tree.value[0].code}`} <span
                                className={`${tree.value[0].isError ? style.isError : ''}`}>{`${tree.value[0].title}`}</span>
                            </Link>
                        )}

                        <div className={style.treeContainer}>
                            <div className={style.postCoordination}>
                                <div className={style.postCoordinationData}>
                                    <div className={style.postCoordinationCode}>
                                        {!isEmpty(tree.keys) && tree.keys.map((key, index) => {
                                            return (
                                                <React.Fragment key={idKey()}>
                                                    {index === 0 ? (<>
                                                        {!isEmpty(tree.value[key].axis) && !isEmpty(tree.value[key].axis.keys) && tree.value[key].axis.keys.map((type, count) => (
                                                            <React.Fragment key={idKey()}>
                                                                <div
                                                                    className={`${style.postCoordinationCodeItem} ${tree.keys.length === 1 || tree.keys.length - 1 === index ? '' : style.postCoordinationCodeItemActive}`}
                                                                >
                                                                    <div
                                                                        className={`${style.postCoordinationCodeTitle} ${type === 'Ошибка' ? style.isError : ''}`}>
                                                                        {type}
                                                                    </div>
                                                                    {!isEmpty(tree.value[key].axis) && tree.value[key].axis.value[type].map(item => (
                                                                        <React.Fragment key={idKey()}>
                                                                            <Diagnosis
                                                                                isActive={tree.value[key].axis.keys.length - 1 !== count}
                                                                                isNextLayer={false}
                                                                                isError={item.isError}
                                                                                title={item.title}
                                                                                code={item.code}
                                                                                postcoordination={item}
                                                                                id={item.id}
                                                                                name={`${item.code} ${item.title}`}
                                                                            />
                                                                        </React.Fragment>)
                                                                    )}
                                                                </div>
                                                            </React.Fragment>
                                                        ))}
                                                    </>) : (<>
                                                        <div
                                                            className={`${style.postCoordinationCodeItem} ${tree.keys.length === 1 || tree.keys.length - 1 === index ? '' : style.postCoordinationCodeItemActive}`}
                                                        >
                                                            <div
                                                                className={`${style.postCoordinationCodeTitle} ${key === 'Ошибка' ? style.isError : ''}`}>
                                                                {key}
                                                            </div>
                                                            {!isEmpty(tree.value[key]) && tree.value[key].map((item) => {
                                                                return (
                                                                    <React.Fragment key={idKey()}>
                                                                        {!!item.isSecond ? (<>
                                                                            <Diagnosis
                                                                                isActive={false}
                                                                                isNextLayer={false}
                                                                                error={item}
                                                                                isError={item.isError}
                                                                                code={item.code}
                                                                                title={item.title}
                                                                                postcoordination={item}
                                                                                id={item.id}
                                                                                name={`${item.code} ${item.title}`}
                                                                            />
                                                                            {item.keys.map((type, count) => {
                                                                                return (<React.Fragment key={idKey()}>
                                                                                    <div
                                                                                        className={`${style.postCoordinationCodeItemSecond} ${tree.keys.length === 1 || tree.keys.length - 1 === index ? '' : style.postCoordinationCodeItemActive}`}
                                                                                    >
                                                                                        <div
                                                                                            className={`${style.postCoordinationCodeTitleSecond} ${type === 'Ошибка' ? style.isError : ''}`}>
                                                                                            {type}
                                                                                        </div>
                                                                                    </div>
                                                                                    {item.axis[type].map((object, index) => {
                                                                                        return (<React.Fragment
                                                                                            key={idKey()}>
                                                                                            <Diagnosis
                                                                                                isActive={item.keys.length - 1 !== count}
                                                                                                isNextLayer={true}
                                                                                                isError={object.isError}
                                                                                                code={object.code}
                                                                                                title={object.title}
                                                                                                postcoordination={object}
                                                                                                id={object.id}
                                                                                                name={`${object.code} ${object.title}`}
                                                                                            />
                                                                                        </React.Fragment>)
                                                                                    })}
                                                                                </React.Fragment>)
                                                                            })}
                                                                        </>) : (<>
                                                                            <Diagnosis
                                                                                isActive={false}
                                                                                isError={item.isError}
                                                                                isNextLayer={false}
                                                                                title={item.title}
                                                                                postcoordination={item}
                                                                                code={item.code}
                                                                                id={item.id}
                                                                                name={`${item.code} ${item.title}`}
                                                                            />
                                                                            {!isEmpty(item.axis) &&
                                                                                Object.keys(item.axis).map((type, count) => {
                                                                                    return (
                                                                                        <React.Fragment key={idKey()}>
                                                                                            <div
                                                                                                className={`${style.postCoordinationCodeItemSecond} ${tree.keys.length === 1 || tree.keys.length - 1 === index ? '' : style.postCoordinationCodeItemActive}`}
                                                                                            >
                                                                                                <div
                                                                                                    className={`${style.postCoordinationCodeTitleSecond} ${style.isError}`}>
                                                                                                    {type}
                                                                                                </div>
                                                                                            </div>
                                                                                            {item.axis[type].map((object) => {
                                                                                                const keys = Object.keys(item.axis)
                                                                                                return (<React.Fragment
                                                                                                    key={idKey()}>
                                                                                                    <Diagnosis
                                                                                                        isActive={keys.length - 1 !== count}
                                                                                                        isNextLayer={true}
                                                                                                        isError={true}
                                                                                                        code={object.code}
                                                                                                        title={object.title}
                                                                                                        postcoordination={object}
                                                                                                        id={object.id}
                                                                                                        name={`${object.code} ${object.title}`}
                                                                                                    />
                                                                                                </React.Fragment>)
                                                                                            })}
                                                                                        </React.Fragment>)
                                                                                })
                                                                            }
                                                                        </>)}
                                                                    </React.Fragment>
                                                                )
                                                            })}
                                                        </div>
                                                    </>)}
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                <div className={style.resultError}>
                    {!isEmpty(errorArrayMessage) &&
                        <div className={style.errorMessageContainer}>
                            <div className={style.errorMessageContainer_header}>
                                <div className={style.errorMessageContainer_header_left}>
                                    <RedСircle
                                        className={style}
                                        color={'white'}
                                    />
                                    Внимание!
                                </div>
                                <RedСross
                                    className={style}
                                    color={'white'}
                                />
                            </div>
                            <div
                                className={style.errorMessageContainer_content}
                            >
                                {Object.keys(errorArrayMessage).map(type => {
                                    return (
                                        <React.Fragment key={idKey()}>

                                            <div className={style.errorMessageContainer_content_text}>
                                                {type}
                                            </div>
                                            <ul
                                                className={style.errorMessageContainer_content_list}
                                                key={idKey()}
                                            >
                                                {errorArrayMessage[type].map(item => {

                                                    return (<li
                                                        key={idKey()}
                                                        className={style.errorMessageContainer_content_code}
                                                    >
                                                        {item.code}
                                                    </li>)
                                                })}
                                            </ul>
                                        </React.Fragment>)
                                })}
                            </div>
                        </div>}
                </div>
            </div>
        </div>)
};

export default Decoding;
