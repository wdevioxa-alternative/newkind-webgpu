import React, {useRef, useState, useCallback, useEffect, useContext} from 'react';

import style from './index.module.css';
import InputSearch from '../../../../components/InputSearch';
import isEmpty from "../../../../utilites/isEmpty";
import { idKey } from "../../../../utilites/idKey";
import { Breadcrumbs } from '../../../../components/Breadcrumbs';
import {decoder, search} from '../../../../utilites/search';
import { RedСircle } from '../../../../components/img/RedСircle';
import IndexCopyWrapper from '../../../../components/IndexCopyWrapper';
import { Link, useNavigate } from 'react-router-dom';
import { Diagnosis } from './Diagnosis';
import analytics from '@src/utilites/analytics'
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { UserContext } from '@src/App';
import ModalResultSearch from "../../../../components/ModalResultSearch";
import ModalResultSearchNull from "../../../../components/ModalResultSearchNull";
import {api, getAxisName, href} from "../../../../utilites/Icd-11";
import {useSearchParams} from 'react-router-dom';
import {IconCopy} from "../Main/Icons/Copy";
import {getCode} from "../Main/Coder";

let children = Symbol.for("children");

const type = {
    NotFound: {
        first: 'Первый указанный основной код не найден в справочнике МКБ-11',
        else: "Код (коды), выделенные красным цветом, не найдены среди допустимых расширений или дополнений основного диагноза"
    },
    ExtraCode: {
        default: 'Количество указанных кодов расширений (дополнений) превышает количество доступных для них осей посткоординации'
    }
}

let request = ''
let error = []

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
const errorQueue = (title, self, data, count) => {
    if (isEmpty(self[`${title}`])) {
        self[`${title}`] = []
    }
    data.position = count && count >= 0 ? count : 0
    self[`${title}`].push(data)

    return self
}

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


const convert = (data) => {
    console.log('CODE: ', data)
    let text = ``
    let result = []
    const isError = !isEmpty(data.error)
    let status = true

    let system = ''
    let error = []

    result.push({
        code: data.code
    })

    if (isError) {
        status = false
        data.error.message = type.NotFound.first
    }

    result[0].id = !isError ? new URL(href.decoder(api.transform.url.linearization(data.id))).pathname : undefined
    result[0].title = !isError ? data.title : ''
    result[0].isError = isError

    if (isError) {
        status = false
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
                        status = false
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
                status = false
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
                            status = false
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
                                status = false
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
                                status = false
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

    return {
        result: result.data.object,
        status: status
    }
}
export const Сomparison = () => {
    const navigate = useNavigate();
    const [anonUser, setAnonUser] = useLocalStorage('__anon_id', undefined);
    const {userInfo} = useContext(UserContext);
    const [mkb10, setMkb10] = useState({});
    const [isActive, setActive] = useState(false);
    const [mkb11, setMkb11] = useState({});
    const [isActiveMkb11, setActiveMkb11] = useState(false);
    const [isError, setError] = useState(false);
    const [isFirstCodeError, setIsFirstCodeError] = useState(false);
    const [textError, setTextError] = useState('');
    const [isResult, setResult] = useState(false);
    const [isSetInput, setInput] = useState(false);
    const [tree, setTree] = useState({});
    const [valueMkb10, setValueMkb10] = useState('');
    const [valueMkb11, setValueMkb11] = useState('');
    const [isActiveMkb10, setIsActiveMkb10] = useState(false);
    const [typeInputSearch, _setTypeInputSearch] = useState('input-search');
    const [wordForAddBySearchInInput, setWordForAddBySearchInInput] = useState('');

    const [isIconLoupe, setIsIconLoupe] = useState(false);
    const [isCodeRange, setIsCodeRange] = useState(false);
    const [isMkb11Code, setMkb11Code] = useState(false);
    const [isReqest, setIsRequest] = useState(true);
    const [isMkb10Code, setMkb10Code] = useState(false);
    const [requestData, setRequestData] = useState([]);
    const [text, setText] = useState('');
    const [textInfo, setTextInfo] = useState('');
    const [textMkb10, setTextMkb10] = useState('');
    const [isGetParams, setGetParams] = useState(false);
    const [isMainModalResultSearch, setIsMainModalResultSearch] = useState(false);
    const [infoMainModalResultSearch, setInfoMainModalResultSearch] = useState();
    const [isMainModalResultSearchNull, setIsMainModalResultSearchNull] = useState(false);
    const [copyButtonMessage, setCopyButtonMessage] = useState('');
    const [copyCode, setCopyCode] = useState('');
    const [link, setLink] = useState(false);
    const [pathname, setPathname] = useState(false);
    const [codeinfo, setCodeinfo] = useState(false);

    useEffect(() => {
        if(codeinfo) {
            setRequestData([])
            setTree({})
            setLink(codeinfo)
            setCopyCode(codeinfo)
            search.api.apiCodeInfo({
                combination: codeinfo
            }).then(response => {
                codeStringData = []
                const toc = convert(response[0].data.codeChain)
                console.log('CODE INFO',codeStringData, toc.result)
                setTree(toc.result)
                setRequestData(codeStringData)
            }).catch(e => {
                console.log('error: ', e)
                setTextInfo(`Для последовательности <span>${codeinfo.trim().toUpperCase()}</span> по МКБ-11 не найдено соответствия.`)
            })
        }
    }, [codeinfo]);

    useEffect(() => {
        const init = async () => {
            let searchParams = new URL(window.location).searchParams;
            if(searchParams.has('axis')) {
                const postcoordination = decodeURIComponent(searchParams.get('axis'))
                setCodeinfo(postcoordination)
                const root = postcoordination.split('&')[0].split('/')[0]

                const responseCode = await search.api.apiSearchCode(root.toUpperCase());
                const url = new URL(responseCode[0].entity['@id'])
                setPathname(`${href.transform(url.pathname)}`)
                setText(root)
                setGetParams(true)
            }
            return true;
        };

       init().catch(console.error)

        const windowMessage = (event) => {
            if(event.data.status === true) {
                setPathname(event.data.link)
                if(window[children]) {
                    window[children].close()
                    window.focus()
                    navigate(`/comparison`)
                    setCodeinfo(event.data.code)
                }
            }
        }

        window.addEventListener ("message", windowMessage);

        return () => {
            window.removeEventListener("message", windowMessage);
        };
    }, []);


    const onClickHeandler = async () => {
        await navigator.clipboard.writeText(copyCode);

        const user = !isEmpty(userInfo) ? userInfo.email : anonUser

        analytics.page();
        analytics.identify(user, {
            icd10Code: mkb10[0].code,
            icd10Name: mkb10[0].title,
            icd11Code: copyCode,
            action: 'comparison_browse_copy'
        })

        setCopyButtonMessage('Код скопирован')
        let clear = setTimeout(() => {
            setCopyButtonMessage('')
            clearTimeout(clear)
        }, "4000")
    }
    const onResetCilck = () => {
        setText('')
        setTextMkb10('')
        setResult(false)
        setError(false)
        setCodeinfo(false)
        codeStringData = []
        navigate(`/comparison/`)
    }

    window.onbeforeunload = function () {
        if(window[children]) {
            window[children].postMessage({
                link: 'CLOSE',
                status: true,
                code: "CLOSE"
            })
        }

        return null;
    };

    const setCode = async event => {
        window[children] = window.open(`${window.location.origin}`, "_blank")
        window[children].focus();
    };

    const copyToClipBoard = async event => {
        let children = Symbol.for("children");
        window[children] = window.open(`${pathname}?axis=${encodeURIComponent(link)}`, "_blank")
        window[children].focus();
    };

    const onClickHendleLink = (item) => {
        let children = Symbol.for("children");
        window[children] = window.open(item.link, "_blank")
        window[children].focus();
    };

    const onClickHeandlerComparison = async (event, type) => {
        try {
            if(isActive && isActiveMkb11) {
                let regex = /([.])\1/;
                let regexSlash = /([\/])\1/;
                let regexAnd = /([&])\1/;
                const regexSymbol = /[a-zA-Z0-9.&\/]/;

                if (valueMkb11.endsWith('/')) {
                    setError(true)
                    setTextError(`Символ "/" не может быть указан последним для корректного поиска соответствия`)
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                if (valueMkb11.endsWith('.')) {
                    setError(true)
                    setTextError(`Символ "." не может быть указан последним для корректного поиска соответствия`)
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                if (valueMkb11.endsWith('&')) {
                    setError(true)
                    setTextError(`Символ "&" не может быть указан последним для корректного поиска соответствия`)
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                if (regex.test(valueMkb11)) {
                    setError(true)
                    setTextError("Введен недопустимый символ. Могут быть использованы только буквы русского, латинского алфавитов без учета регистра, цифры 0-9, а также символы «.», «/» и «&» не более одного раза подряд")
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                if (regexSlash.test(valueMkb11)) {
                    setError(true)
                    setTextError("Введен недопустимый символ. Могут быть использованы только буквы русского, латинского алфавитов без учета регистра, цифры 0-9, а также символы «.», «/» и «&» не более одного раза подряд")
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                if (regexAnd.test(valueMkb11)) {
                    setError(true)
                    setTextError("Введен недопустимый символ. Могут быть использованы только буквы русского, латинского алфавитов без учета регистра, цифры 0-9, а также символы «.», «/» и «&» не более одного раза подряд")
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                if (!regexSymbol.test(valueMkb11)) {
                    setError(true)
                    setTextError("Введен недопустимый символ. Могут быть использованы только буквы русского, латинского алфавитов без учета регистра, цифры 0-9, а также символы «.», «/» и «&» не более одного раза подряд")
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                const comparison = await search.api.apiSearchComparison(valueMkb11.trim().toUpperCase(), 'icd11')

                const isCoordination = valueMkb11.split('&').length > 1 || valueMkb11.split('/').length > 1

                if (isCoordination) {
                    setCodeinfo(false)
                    setCodeinfo(valueMkb11)
                }

                if (comparison[0].data.codes.length !== 0) {
                    let code = valueMkb11.split('&')[0].split('/')[0]
                    const responseCode = await search.api.apiSearchCode(code.toUpperCase());
                    let url = ''
                    let data = []
                    if (responseCode[0].status === 200) {
                        setIsMainModalResultSearch(false);
                        setInfoMainModalResultSearch();

                        url = new URL(responseCode[0].entity['@id'])

                        data.push({
                            link: href.transform(url.pathname),
                            code: responseCode[0].entity.code,
                            title: responseCode[0].entity.title['@value']
                        })

                        const user = !isEmpty(userInfo) ? userInfo.email : anonUser

                        analytics.page();
                        analytics.identify(user, {
                            icd10Code: comparison[0].data.codes[0].code,
                            icd10Name: comparison[0].data.codes[0].title,
                            icd11Code: data[0].code,
                            icd11Name: data[0].title,
                            action: 'comparison_browse'
                        })

                        setMkb11(data)
                    }

                    setError(false)
                    setActive(false)
                    setMkb10Code(true)
                    setMkb11Code(false)
                    setInput(false)
                    setResult(true)

                    const codes = comparison[0].data.codes.length
                    if (codes === 1) {
                        setIsMainModalResultSearch(false);
                        setPathname(data[0].link)
                        setMkb10(comparison[0].data.codes)

                        if (!isCoordination) {
                            setTextInfo('Найдено одно соответствие:')
                        } else {
                            setTextInfo(`Для кода <span>${valueMkb11.trim().toUpperCase()}</span> по МКБ-11 не найдено соответствие в справочнике МКБ-10. \n Основной код <span>${code.toUpperCase()}</span> в МКБ-11 имеет следующие соответствия в справочнике МКБ-10:`)
                        }

                    } else if (codes > 1) {
                        setTextInfo(`Код <span>${mkb11[0].code.toUpperCase()}</span> в МКБ-11 соответствует нескольким кодам в МКБ-10:`)
                    }
                } else {
                    let isCodeChain = valueMkb11.split('&').length + valueMkb11.split('/').length > 2
                    let code = valueMkb11.split('&')[0].split('/')[0]
                    setActive(false)
                    setError(true)
                    let text = `Для кода <span>${valueMkb11.toUpperCase()}</span> по МКБ-11 не найдено соответствия в справочнике МКБ-10`
                    if(isCodeChain && !isFirstCodeError) {
                        text = `Для кодовой последовательности <span>${valueMkb11.toUpperCase().trim()}</span>, а также для основного кода <span>${code.toUpperCase().trim()}</span> по МКБ-11 не найдено соответствия в справочнике МКБ-10.`
                    }

                    if(isCodeChain && isFirstCodeError) {
                        text = `Основной код <span>${code}</span>, по которому осуществляется поиск соответствия кодов МКБ-10 для МКБ-11, не найден в справочнике МКБ-11. Проверьте корректность указанного кода.`
                    }

                    setTextError(text)
                    setIsFirstCodeError(false)
                }
            }

            if(isActive && isActiveMkb10) {
                const value = valueMkb10.replaceAll(' ', '')
                const regexSymbol = /^[a-zA-Z0-9.]+$/;
                let regex = /([.])\1/;

                if(regex.test(value)) {
                    setError(true)
                    setTextError("Введен недопустимый символ. Могут быть использованы только буквы латинского алфавита без учета регистра, цифры 0-9, а также символ «.»  не более одного раза подряд")
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                if(!regexSymbol.test(value)) {
                    setError(true)
                    setTextError("Введен недопустимый символ. Могут быть использованы только буквы латинского алфавита без учета регистра, цифры 0-9, а также символ «.»  не более одного раза подряд")
                    setIsMainModalResultSearch(false);
                    setInfoMainModalResultSearch();
                    setActive(false)
                    return
                }

                let comparison = [{data: {codes: -1}}]

                comparison = await search.api.apiSearchComparison(value.toUpperCase(), 'icd10')

                if(comparison.length !== 0 && comparison[0].data.codes.length !== 0) {
                    const codes = comparison[0].data.codes.length

                    if(codes === 1) {
                        setTextInfo('Найдено одно соответствие:')
                    } else if(codes > 1) {
                        setTextInfo(`Код <span>${value.toUpperCase()}</span> в МКБ-10 соответствует нескольким кодам в МКБ-11:`)
                    } else {
                        setError(true)
                        setTextError(`Для кода <span>${value.toUpperCase()}</span> по МКБ-10 не найдено соответствия в справочнике МКБ-11:`)
                    }

                    if(codes !== 0) {
                        if(codes === 1) {
                            let code = comparison[0].data.codes[0].code.split('&')[0].split('/')[0]
                            const responseCode = await search.api.apiSearchCode(code.toUpperCase());

                            const url = new URL(responseCode[0].entity['@id'])
                            const isCoordination =  comparison[0].data.codes[0].code.split('&').length > 1 || comparison[0].data.codes[0].code.split('/').length > 1

                            const data = []
                            let codeData = comparison[0].data.codes[0].code
                            codeData = codeData.endsWith('/') ? codeData.slice(0, -1): codeData

                            if(isCoordination) {
                               const codeChain =  await search.api.apiCodeInfo({
                                    combination: codeData
                                })
                                const verify = convert(codeChain[0].data.codeChain).status

                                data.push({
                                    link: verify? `${href.transform(url.pathname)}?axis=${encodeURIComponent(codeData)}`: `${href.transform(url.pathname)}`,
                                    code: verify? comparison[0].data.codes[0].code: comparison[0].data.codes[0].code.split('/')[0].split('&')[0],
                                    title: comparison[0].data.codes[0].title
                                })
                            } else {
                                data.push({
                                    link: href.transform(url.pathname),
                                    code: comparison[0].data.codes[0].code,
                                    title: comparison[0].data.codes[0].title
                                })
                            }

                            const user = !isEmpty(userInfo) ? userInfo.email : anonUser

                            analytics.page();
                            analytics.identify(user, {
                                userAgent: window.navigator.userAgent,
                                deseaseCode: value.toUpperCase(),
                                icd10Code: value.toUpperCase(),
                                icd10Name: comparison[0].data.originTitle,
                                icd11Code: data[0].code,
                                icd11Name: data[0].title,
                                action: 'comparison_browse'
                            })

                            console.log('@@@@@@@@@ SATISTIC @@@@@@@@@@@@@@@@@@@', {
                                code: value.toUpperCase(),
                                title: comparison[0].data.originTitle
                            })

                            setMkb11(data)
                            setMkb10([{
                                code: value.toUpperCase(),
                                title: comparison[0].data.originTitle
                            }])
                            setActive(false)
                        } else {
                            const data = []
                            for(let item of comparison[0].data.codes) {
                                const isCode = item.code.length > 0
                                const url = new URL(item.uri)
                                let link = href.transform(url.pathname)

                                if(!isCode) {
                                    data.push({
                                        link: link,
                                        code: '',
                                        title: item.title
                                    })
                                } else {
                                    const isCoordination = item.code.split('&').length > 1 || item.code.split('/').length > 1
                                    const response = await search.api.apiSearchCode(item.code.split('&')[0].split('/')[0]);
                                    const url = new URL(response[0].entity['@id'])

                                    let link = href.transform(url.pathname)
                                    link = link.endsWith('/') ? link.slice(0, -1): link
                                    let code = item.code.endsWith('/') ? item.code.slice(0, -1): item.code

                                    if(isCoordination) {
                                        const codeChain =  await search.api.apiCodeInfo({
                                            combination: item.code
                                        })
                                        const verify = convert(codeChain[0].data.codeChain).status

                                        data.push({
                                            link: verify? `${link}?axis=${encodeURIComponent(code)}`: `${link}`,
                                            code: verify? item.code: item.code.split('/')[0].split('&')[0],
                                            title: item.title
                                        })
                                    } else {
                                        data.push({
                                            link: link,
                                            code: item.code,
                                            title: item.title
                                        })
                                    }
                                }
                            }

                            const user = !isEmpty(userInfo) ? userInfo.email : anonUser

                            analytics.page();
                            analytics.identify(user, {
                                userAgent: window.navigator.userAgent,
                                icd10Code: value.toUpperCase(),
                                icd10Name: comparison[0].data.originTitle,
                                icd11Code: data[0].code,
                                icd11Name: data[0].title,
                                action: 'comparison_browse'
                            })

                            setMkb11(data)
                            setMkb10([{
                                code: value.toUpperCase(),
                                title: comparison[0].data.originTitle
                            }])
                        }

                        setActive(false)
                    } else {
                        setActive(false)
                    }

                    setResult(true)
                } else {
                    setMkb11([])
                    setMkb10([{
                        code: value.toUpperCase(),
                        title: ''
                    }])
                    setError(true)
                    setTextError(`Для кода <span>${value.toUpperCase()}</span> по МКБ-10 не найдено соответствия в справочнике МКБ-11.`)
                }

                return
            }
        } catch (e) {
            console.error('error: ', e)
        }
    }

    const onClickCloseMainModalResultSearch = async (disease) => {
        try {
            setMkb11Code(true)
            setInput(true)

            const url = new URL(disease.entity['@id'])

            const data = []

            data.push({
                link: href.transform(url.pathname),
                code: disease.entity.code,
                title: disease.entity.title['@value']
            })

            setValueMkb11(disease.entity.code)
            setMkb11(data)
            setActive(true)
            setText(data[0].code)
            setInfoMainModalResultSearch();
            setIsMainModalResultSearch(false);
        } catch (e) {
            console.error('/v1/code/version/icd11/comparison', e)
        }
    };

    const resultMainSearch = async (value, type) => {
        try {
            if(value && type === 'icd11') {
                setResult(false)
                setCodeinfo(false)
                setTree(false)
                setRequestData(false)
                setActiveMkb11(true)
                setError(false)
                setTextMkb10('')
                codeStringData = []

                const rusLang = /[а-яА-ЯёЁ]/.test(value)
                const isNumber = /^\d+$/.test(value)

                if(!rusLang) {
                    if(isNumber) {
                        setActive(false)
                    } else {
                        setActive(true)
                    }
                } else {
                    setActive(false)
                }
                const isAxis = value.split('&').length > 1 || value.split('/').length > 1

                if(!isAxis) {
                    const responseWord = await search.getResultMain(value);

                    let response = [];
                    let responseCode;

                    if (value.length < 8 && responseWord.length === 0) {
                        responseCode = await search.api.apiSearchCode(value.toUpperCase());
                        if (responseCode.length > 0) {
                            response = responseCode
                        }
                    }

                    if (responseWord.length > 0) {
                        response = responseWord
                    }

                    setValueMkb11(value)

                    if (response && response.length > 0 && !isSetInput) {
                        if(!rusLang) {
                            if(isNumber) {
                                setActive(false)
                            } else {
                                setActive(true)
                            }
                        } else {
                            setActive(false)
                        }
                        setActiveMkb11(true)
                        setIsMainModalResultSearch(true);
                        setInfoMainModalResultSearch(response);
                        setIsMainModalResultSearchNull(false);
                    } else if (response && response.length === 0 && value.length >= 3) {
                        if(!rusLang) {
                            if(isNumber) {
                                setActive(false)
                            } else {
                                setActive(true)
                            }
                            setIsMainModalResultSearchNull(false);
                        } else {
                            setActive(false)
                            setIsMainModalResultSearchNull(true);
                        }
                        setIsMainModalResultSearch(false);
                        setInfoMainModalResultSearch();
                    } else {
                        if(!rusLang) {
                            if(isNumber) {
                                setActive(false)
                            } else {
                                setActive(true)
                            }
                            setIsMainModalResultSearchNull(false);
                        } else {
                            setActive(false)
                            setIsMainModalResultSearchNull(true);
                        }

                        setInput(false)
                        setIsMainModalResultSearch(false);
                        setInfoMainModalResultSearch();
                    }
                } else {
                    let regex = /(\..*){2,}/;
                    let regexSlash = /(\.\/*){2,}/;
                    let regexAnd = /([&])\1/;

                    const code = value.split('/')[0].split('&')[0]

                    setResult(false)
                    setCodeinfo(false)
                    setActiveMkb11(true)
                    setIsMainModalResultSearchNull(false);
                    setIsMainModalResultSearch(false);
                    setError(false)
                    setTextMkb10('')
                    codeStringData = []

                    const responseCode = await search.api.apiSearchCode_t(code.toUpperCase());

                    if(responseCode[0]?.status === 200) {
                        const data = []

                        const url = new URL(responseCode[0].entity['@id'])

                        data.push({
                            link: `${href.transform(url.pathname)}`,
                            code: responseCode[0].entity.code,
                            title: responseCode[0].entity.title[`@value`]
                        })

                        setValueMkb11(value.trim().toUpperCase())
                        setMkb11(data)
                        setCodeinfo(value.trim().toUpperCase())
                        setActive(true)
                    } else if(responseCode[0]?.status === 323) {
                        setIsFirstCodeError(true)
                        setActive(true)
                        setValueMkb11(value.trim().toUpperCase())
                    } else {
                        setActive(true)
                        setValueMkb11(value.trim().toUpperCase())
                    }
                }
            }

            if(value && type === 'icd10') {
                setIsMainModalResultSearch(false);
                setActive(true)
                setActiveMkb11(false)
                setResult(false)
                setCodeinfo(false)
                setText('')
                setTree({})
                setRequestData([])
                setActiveMkb11(false)
                setError(false)
                codeStringData = []
                setIsActiveMkb10(true)
                setValueMkb10(value)
            }

            if(!value && type === 'icd10' || value.length === 0 && type === 'icd10') {
                setCodeinfo(false)
                setError(false)
                setTree({})
                setRequestData([])
                setError(false)
                codeStringData = []
                setIsActiveMkb10(false)
                setValueMkb10('')
                setResult(false)
                setActive(false)
                setText('')
                setIsMainModalResultSearchNull(false);
                setIsMainModalResultSearch(false);
                setInfoMainModalResultSearch();
            }

            if(!value && type === 'icd11' || value.length === 0 && type === 'icd11') {
                setResult(false)
                setActive(false)
                setError(false)
                setText('')
                setIsMainModalResultSearchNull(false);
                setIsMainModalResultSearch(false);
                setInfoMainModalResultSearch();
            }
        } catch (e) {

        }
    };

    return (<div className={style.container}>
                <div className={style.wrapper}>
                    <Breadcrumbs className={style}/>
                    <div className={style.content}>
                        <div className={style.main}>
                            <div className={style.data}>
                                <h1 className={style.h1}>Соответствие кодов МКБ-10 и МКБ-11</h1>
                                <p
                                  className={style.warning}
                                  dangerouslySetInnerHTML={{
                                      __html: `Инструмент для информирования пользователей о возможных вариантах сопоставления кодов *.</br>
                                                 Предлагаемые результаты автоматического сопоставления носят рекомендательный характер и не являются обязательными для использования.`,
                                  }}
                                />
                                <p className={style.p}>Укажите код в требуемой классификации болезней или выберите из
                                    соответствующего справочника</p>
                                <div className={style.comparison}>
                                    <div className={style.mkb}>
                                        <h4 className={style.h4}>Код МКБ-10</h4>
                                        <InputSearch
                                          placeholder={'Укажите код диагноза по МКБ-10'}
                                          typeModule={'comparison'}
                                          className={style}
                                          setText={setTextMkb10}
                                          isIconLoupe={isIconLoupe}
                                          text={textMkb10}
                                          isOnlyEn={true}
                                          inputValue={async (event) => {
                                              await resultMainSearch(textMkb10.replaceAll(' ', ''), 'icd10');
                                          }}
                                          typeInputSearch={typeInputSearch}
                                          wordForAddBySearchInInput={wordForAddBySearchInInput}
                                        />
                                    </div>
                                    <div className={style.icon}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="20"
                                             viewBox="0 0 14 20" fill="none">
                                            <path
                                              d="M3.41421 6H13C13.5523 6 14 5.55228 14 5C14 4.44772 13.5523 4 13 4L3.41421 4L5.70711 1.70711C6.09763 1.31658 6.09763 0.683418 5.70711 0.292894C5.31658 -0.0976312 4.68342 -0.0976312 4.29289 0.292894L0.293523 4.29226L0.286395 4.29945C0.193742 4.3938 0.12357 4.50195 0.0758791 4.61722C0.0273466 4.73425 0.00039959 4.8625 4.76837e-06 4.997L0 5L4.76837e-06 5.003C0.000353813 5.12184 0.0214329 5.2358 0.0598154 5.34146C0.0605822 5.34357 0.0613556 5.34568 0.0621367 5.34779C0.0661497 5.35861 0.0703459 5.36934 0.0747194 5.37998L0.0758791 5.38278C0.123499 5.49788 0.193531 5.60588 0.285978 5.70012L0.293523 5.70774L4.29289 9.70711C4.68342 10.0976 5.31658 10.0976 5.70711 9.70711C6.09763 9.31658 6.09763 8.68342 5.70711 8.29289L3.41421 6Z"
                                              fill="#6C8BC9" />
                                            <path
                                              d="M10.5858 14L1 14C0.447715 14 4.85396e-07 14.4477 4.37114e-07 15C3.88832e-07 15.5523 0.447715 16 1 16L10.5858 16L8.29289 18.2929C7.90237 18.6834 7.90237 19.3166 8.29289 19.7071C8.68342 20.0976 9.31658 20.0976 9.70711 19.7071L13.7065 15.7077L13.7136 15.7005C13.8063 15.6062 13.8764 15.498 13.9241 15.3828C13.9727 15.2657 13.9996 15.1375 14 15.003L14 15L14 14.997C13.9996 14.8782 13.9786 14.7642 13.9402 14.6585C13.9394 14.6564 13.9386 14.6543 13.9379 14.6522C13.9339 14.6414 13.9297 14.6307 13.9253 14.62L13.9241 14.6172C13.8765 14.5021 13.8065 14.3941 13.714 14.2999L13.7065 14.2923L9.70711 10.2929C9.31658 9.90237 8.68342 9.90237 8.29289 10.2929C7.90237 10.6834 7.90237 11.3166 8.29289 11.7071L10.5858 14Z"
                                              fill="#6C8BC9" />
                                        </svg>
                                    </div>
                                    <div className={style.mkb}>
                                        <h4 className={style.h4}>Код МКБ-11</h4>
                                        <InputSearch
                                          placeholder={'Укажите код диагноза по МКБ-11'}
                                          className={style}
                                          typeModule={'comparison'}
                                          isIconLoupe={isIconLoupe}
                                          inputValue={async (event) => {
                                              await resultMainSearch(text.replaceAll(' ', ''), 'icd11');
                                          }}
                                          typeInputSearch={typeInputSearch}
                                          setText={setText}
                                          text={text}
                                          isOnlyEn={false}
                                          wordForAddBySearchInInput={wordForAddBySearchInInput}
                                        />
                                        {isMainModalResultSearch && (
                                          <div>
                                              <ModalResultSearch
                                                view="mainWrapper"
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
                                                view="mainWrapper"
                                              />
                                          </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                  className={isActive ? `${style.button} ${style.active}` : `${style.button}`}
                                  onClick={onClickHeandlerComparison}
                                >
                                    Найти соответствие
                                </button>

                                {isError && <div className={style.errorMessage}>
                                    <div className={style.errorHeader}>
                                        <RedСircle />
                                        <p
                                          dangerouslySetInnerHTML={{
                                              __html: textError,
                                          }}
                                          className={style.p_error}
                                        />
                                    </div>
                                    <div className={style.errorFooter}>
                                        {'Проверьте корректность указанного кода.'}
                                    </div>
                                </div>}
                                {isResult &&
                                  <div className={style.result}>
                                      <div className={style.comparison_result_sticky}>
                                          <h2
                                            dangerouslySetInnerHTML={{
                                                __html: textInfo,
                                            }}
                                            className={`${style.h1_sticky}`}
                                          />
                                          <div className={style.container_info}>
                                              <div className={style.mkb_result}>
                                                  <button className={style.button_result_10}>МКБ-10</button>
                                                  <div className={style.result_container}>
                                                      {mkb10.map(item => {
                                                          return (
                                                            <span
                                                              key={idKey()}
                                                              className={`${style.result_description} ${style.link_disabled}`}
                                                            >
                                                        <p
                                                          className={style.link}
                                                        >
                                                            {item.code} {item.title}
                                                        </p>
                                                    </span>);
                                                      })}
                                                  </div>
                                              </div>

                                              <div className={style.mkb_result_11}>
                                                  <div className={style.mkb_result_11_description}>
                                                      <button className={style.button_result_11}>МКБ-11</button>
                                                      <div className={style.result_container}>
                                                          {mkb11.map(item => {
                                                              return (
                                                                <span
                                                                  key={idKey()}
                                                                  className={`${style.result_description}`}
                                                                >
                                                                    <div
                                                                      onClick={() => {
                                                                          onClickHendleLink(item);
                                                                      }}
                                                                      className={style.link}
                                                                    >
                                                                        {item.code} {item.title}
                                                                    </div>
                                                                </span>);
                                                          })}
                                                      </div>
                                                  </div>
                                                  <div className={style.result_notification}>
                                                      {`Продолжите кодирование по указанному диагнозу, перейдя \n по ссылке, или`}
                                                      <span
                                                        className={style.result_link}
                                                      >
                                                        <p
                                                          onClick={setCode}
                                                          className={style.result_link}
                                                        >
                                                          выберите код МКБ-11 вручную
                                                        </p>
                                                </span>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className={style.dots}></div>
                                      </div>
                                      <div className={style.comparison_result}>
                                          <div className={style.mkb_result}></div>
                                          <div className={style.mkb_result_11}>
                                              {!isEmpty(tree.keys) &&
                                                <h4 className={style.h4_decoding}>Результат ручного кодирования по
                                                    МКБ-11:</h4>}
                                              <div className={`${style.decoding} ${style.decoding_outside}`}>
                                                  {!isEmpty(tree.keys) &&
                                                    <div className={style.resultSearch}>
                                                        <div
                                                          className={style.postCoordinationCodeList}
                                                        >
                                                            <div className={style.postCoordinationCodeString}>Код:
                                                            </div>
                                                            <div
                                                              className={style.code}
                                                              onClick={copyToClipBoard}
                                                            >

                                                                {requestData.map(chank => {
                                                                    return (
                                                                      <p
                                                                        key={idKey()}
                                                                        className={chank.match ? style.isActiveItemCode : ''}
                                                                      >
                                                                          {chank.text}
                                                                      </p>);
                                                                })}
                                                            </div>

                                                            <div
                                                              onClick={onClickHeandler}
                                                            >
                                                                <div className={style.copyButton}>
                                                                    {!isEmpty(copyButtonMessage) ? (<>
                                                                        <div
                                                                          className={style.copyCode}>{`${copyButtonMessage}`}</div>
                                                                    </>) : ''}
                                                                    <IconCopy
                                                                      width={16}
                                                                      height={16}
                                                                      className={style}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className={style.treeContainer}>
                                                            <div className={style.postCoordination}>
                                                                <div className={style.postCoordinationData}>
                                                                    <div className={style.postCoordinationCode}>
                                                                        {!isEmpty(tree.keys) && tree.keys.map((key, index) => {
                                                                            return (
                                                                              <React.Fragment key={idKey()}>
                                                                                  {index === 0 ? (<>
                                                                                      {!isEmpty(tree.value[key].axis) && !isEmpty(tree.value[key].axis.keys) && tree.value[key].axis.keys.map((type, count) => (
                                                                                        <React.Fragment
                                                                                          key={idKey()}>
                                                                                            <div
                                                                                              className={`${style.postCoordinationCodeItem} ${tree.keys.length === 1 || tree.keys.length - 1 === index ? '' : style.postCoordinationCodeItemActive}`}
                                                                                            >
                                                                                                <div
                                                                                                  className={`${style.postCoordinationCodeTitle} ${type === 'Ошибка' ? style.isError : ''}`}>
                                                                                                    {type}
                                                                                                </div>
                                                                                                {!isEmpty(tree.value[key].axis) && tree.value[key].axis.value[type].map(item => (
                                                                                                  <React.Fragment
                                                                                                    key={idKey()}>
                                                                                                      <Diagnosis
                                                                                                        isActive={tree.value[key].axis.keys.length - 1 !== count}
                                                                                                        isNextLayer={false}
                                                                                                        isError={item.isError}
                                                                                                        className={style}
                                                                                                        title={item.title}
                                                                                                        code={item.code}
                                                                                                        postcoordination={item}
                                                                                                        id={item.id}
                                                                                                        name={`${item.code} ${item.title}`}
                                                                                                      />
                                                                                                  </React.Fragment>),
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
                                                                                                <React.Fragment
                                                                                                  key={idKey()}>
                                                                                                    {!!item.isSecond ? (<>
                                                                                                        <Diagnosis
                                                                                                          isActive={false}
                                                                                                          isNextLayer={false}
                                                                                                          error={item}
                                                                                                          className={style}
                                                                                                          isError={item.isError}
                                                                                                          code={item.code}
                                                                                                          title={item.title}
                                                                                                          postcoordination={item}
                                                                                                          id={item.id}
                                                                                                          name={`${item.code} ${item.title}`}
                                                                                                        />
                                                                                                        {item.keys.map((type, count) => {
                                                                                                            return (
                                                                                                              <React.Fragment
                                                                                                                key={idKey()}>
                                                                                                                  <div
                                                                                                                    className={`${style.postCoordinationCodeItemSecond} ${tree.keys.length === 1 || tree.keys.length - 1 === index ? '' : style.postCoordinationCodeItemActive}`}
                                                                                                                  >
                                                                                                                      <div
                                                                                                                        className={`${style.postCoordinationCodeTitleSecond} ${type === 'Ошибка' ? style.isError : ''}`}>
                                                                                                                          {type}
                                                                                                                      </div>
                                                                                                                  </div>
                                                                                                                  {item.axis[type].map((object, index) => {
                                                                                                                      return (
                                                                                                                        <React.Fragment
                                                                                                                          key={idKey()}>
                                                                                                                            <Diagnosis
                                                                                                                              isActive={item.keys.length - 1 !== count}
                                                                                                                              isNextLayer={true}
                                                                                                                              isError={object.isError}
                                                                                                                              className={style}
                                                                                                                              code={object.code}
                                                                                                                              title={object.title}
                                                                                                                              postcoordination={object}
                                                                                                                              id={object.id}
                                                                                                                              name={`${object.code} ${object.title}`}
                                                                                                                            />
                                                                                                                        </React.Fragment>);
                                                                                                                  })}
                                                                                                              </React.Fragment>);
                                                                                                        })}
                                                                                                    </>) : (<>
                                                                                                        <Diagnosis
                                                                                                          isActive={false}
                                                                                                          isError={item.isError}
                                                                                                          isNextLayer={false}
                                                                                                          title={item.title}
                                                                                                          className={style}
                                                                                                          postcoordination={item}
                                                                                                          code={item.code}
                                                                                                          id={item.id}
                                                                                                          name={`${item.code} ${item.title}`}
                                                                                                        />
                                                                                                        {!isEmpty(item.axis) &&
                                                                                                          Object.keys(item.axis).map((type, count) => {
                                                                                                              return (
                                                                                                                <React.Fragment
                                                                                                                  key={idKey()}>
                                                                                                                    <div
                                                                                                                      className={`${style.postCoordinationCodeItemSecond} ${tree.keys.length === 1 || tree.keys.length - 1 === index ? '' : style.postCoordinationCodeItemActive}`}
                                                                                                                    >
                                                                                                                        <div
                                                                                                                          className={`${style.postCoordinationCodeTitleSecond} ${style.isError}`}>
                                                                                                                            {type}
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                    {item.axis[type].map((object) => {
                                                                                                                        const keys = Object.keys(item.axis);
                                                                                                                        return (
                                                                                                                          <React.Fragment
                                                                                                                            key={idKey()}>
                                                                                                                              <Diagnosis
                                                                                                                                isActive={keys.length - 1 !== count}
                                                                                                                                isNextLayer={true}
                                                                                                                                isError={true}
                                                                                                                                code={object.code}
                                                                                                                                className={style}
                                                                                                                                title={object.title}
                                                                                                                                postcoordination={object}
                                                                                                                                id={object.id}
                                                                                                                                name={`${object.code} ${object.title}`}
                                                                                                                              />
                                                                                                                          </React.Fragment>);
                                                                                                                    })}
                                                                                                                </React.Fragment>);
                                                                                                          })
                                                                                                        }
                                                                                                    </>)}
                                                                                                </React.Fragment>
                                                                                              );
                                                                                          })}
                                                                                      </div>
                                                                                  </>)}
                                                                              </React.Fragment>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button
                                                          onClick={onResetCilck}
                                                          className={style.button_reset}
                                                        >
                                                            Сбросить результат
                                                        </button>
                                                    </div>}
                                                  {isEmpty(tree.keys) && <button
                                                    onClick={onResetCilck}
                                                    className={`${style.button_reset_inside}`}
                                                  >
                                                      Сбросить результат
                                                  </button>}
                                              </div>
                                          </div>
                                      </div>
                                  </div>}
                            </div>
                            <div className={style.padding}></div>
                            <div className={style.warningBottom}>
                                * Источником является официальный сайт Всемирной организации здравоохранения
                            </div>
                        </div>
                        <div className={style.side}></div>
                    </div>

                </div>
    </div>)
};

export default Сomparison;
