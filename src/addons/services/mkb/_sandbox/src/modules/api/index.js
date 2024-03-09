import axios from 'axios';
import isEmpty from '../../utilites/isEmpty'

const config = window.location.hostname === 'localhost' ? {
    baseURL: process.env.REACT_APP_DEV_URL,
}: { }

const api = axios.create(config);

const filter = (version, self, l, md) => {
    let current = self
    let maxDate = md
    let lang = l

    for(let i = 0; i < version.length ; ++i) {
        const currentData = version[i].Release.split('-')
        if(maxDate[0] < currentData[0]) {
            if(lang === 'ru') {
                if(version.lang === 'ru') {
                    maxDate = currentData
                    current = version[i]
                    lang = version[i].Lang
                }
            } else {
                maxDate = currentData
                current = version[i]
                lang = version[i].Lang
            }
        }

        if(parseInt(maxDate[0], 10) === parseInt(currentData[0], 10) && maxDate[1] < currentData[1]) {
            if(lang === 'ru') {
                if(version.lang === 'ru') {
                    maxDate = currentData
                    current = version[i]
                }
            } else {
                maxDate = currentData
                current = version[i]
            }
        }

        if(maxDate[0] === currentData[0] && parseInt(maxDate[1], 10) === parseInt(currentData[1], 10) && lang !== 'ru') {
            maxDate = currentData
            current = version[i]
        }
    }

    return current
}

export async function available() {
    const { data: en } = await api.get(`/v1/icd/release/11/available`, {
        headers: {
            'Accept-Language': 'en',
        }
    });

    const { data: ru } = await api.get('/v1/icd/release/11/available', {
        headers: {
            'Accept-Language': 'ru',
        }
    });

    let current = !isEmpty(ru) ? filter(ru, [], '', [0, 0]) : []
    let maxDate = !isEmpty(current) ? current.Release.split('-') : [0, 0]
    let lang = !isEmpty(current) ? current.Lang : ''
    let all = ru.concat(en)
    current = filter(all, current, lang, maxDate)
    return current
}

export async function getTokenPair(code) {
    try {
        const data = await api.post('/auth/code', {
            code
        })
        return data;
    } catch (e) {
        console.error('не был получен токкен')
    }
}

export async function getUserInfo(accessToken) {
    if(accessToken) {
        const data = await api.get('/auth/userinfo', {
            // withCredentials: true,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        return data;
    } else {
        // console.log('авторизация: нет токкена')
        return  []
    }

}

export async function getRefreshToken(refreshToken) {
    const data = await api.post('/auth/refresh', {
        refreshToken: refreshToken
    })
    return data;
}
