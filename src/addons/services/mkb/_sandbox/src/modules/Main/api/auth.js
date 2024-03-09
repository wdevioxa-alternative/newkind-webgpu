import axios from '@src/utilites/API';

export async function loaderList(lang) {
    const accessToken = window.localStorage.getItem('accessToken')
    await axios.post(`/loader/check`, {
        "lang": lang,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    const {
        data: items
    } = await axios.get(`/loader/list/${lang}`)

    return items.some(item => item.isICDLatest)
}