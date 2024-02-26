import { isEmpty } from '../../isEmpty/index.mjs'
import { store } from '../../store/index.mjs'
import { env } from '/env.mjs'
import {request} from "../../fetch/index.mjs";
export async function getTokenPair(code) {
    try {
        // const token = await request.post('/', {
        //     "reqType": 0,
        //     "data": code
        // });
        return token;
    } catch (e) {
        console.error('не был получен токкен')
    }
}

export async function getRefreshToken(refreshToken) {
    try {
        const token = {}
        // const token = await request.post('/', {
        //     "reqType": 1,
        //     "data": refreshToken
        // }, true);
        return token;
    } catch (e) {
        window.location.href = window.location.orirgin;
        console.error('не был получен токкен', e)
    }
}

export const signIn = () => {
    let egiszUrl = env().WEB_APP_LOGIN_DEV
    window.location.href = egiszUrl;
};

export const logOut = async () => {
    let user = store.get('authorization')

    // const logout = await request.get('/', {
    //     "Authorization": `Bearer ${user.token.access}`
    // }, true);

    if(logout) {
        window.location.href = '/';
        return
    }
}

export const resetTokens = () => {
    store.set('accessToken', '')
    store.set('refreshToken', '')
};

export const useAuth = () => {
    // let accessToken = undefined
    // let refreshToken = undefined
    // let alreadyUsedCode = undefined
    // let userInfo = undefined

    const interval = setInterval(() => {
        let user = store.get('authorization')
        if(user) {
            const date = (Date.now() - user.expires)
            const isRefresh = date >= 0
            if(!isEmpty(user.token.refresh) && isRefresh) {
                getRefreshToken(user.token.refresh)
                    .then(( data ) => {
                        user.token = data
                        user.expires = Date.now() + data.expiresIn * 999
                        console.log('refresh token: ', user)
                        store.set('authorization', user)
                    })
                    .catch(error => { });
            }
        }
    }, 30000)

    // const params = new URLSearchParams(document.location.search);
    // const code = params.get('code');
    //
    // if (code?.length && code !== alreadyUsedCode) {
    //     try {
    //         getTokenPair(code)
    //             .then(data => {
    //                 if (!isEmpty(data) && data.status === 200) {
    //                     accessToken = data.data.accessToken
    //                     refreshToken = data.data.refreshToken
    //                     userInfo = data.data.userinfo
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //             .finally(() => alreadyUsedCode = code);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } else {
    //     if (accessToken) {
    //         try {
    //             getUserInfo(accessToken)
    //                 .then(({ data }) => {
    //                     userInfo = data
    //                 })
    //                 .catch(error => {
    //                     console.log(error);
    //                     setAccessToken('');
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     } else if (refreshToken && !accessToken) {
    //         try {
    //             getRefreshToken(refreshToken)
    //                 .then(({ data }) => {
    //                     accessToken = data.data.accessToken
    //                     refreshToken = data.data.refreshToken
    //                 })
    //                 .catch(error => {
    //                     if(error.request.status !== 500) {
    //                         console.log(error);
    //                         refreshToken = ''
    //                         userInfo = '';
    //                         logOut();
    //                     } else {
    //                         refreshToken = ''
    //                         userInfo = ''
    //                     }
    //                 });
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
}
