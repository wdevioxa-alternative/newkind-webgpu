import axios from '@src/utilites/API';
import { getApi } from '../../../utilites/API'
import isEmpty from "../../../utilites/isEmpty";

const request = async (endpoints) => {
    try {
        let data = await Promise.allSettled(endpoints.map((endpoint) => {
            return axios.get(new URL(endpoint).pathname)
        }));
        let result = data.map(item => item.value.data)
        return result ? result : []
    } catch (e) {
        console.error(e)
    }
}

const normalizePublicUrl = (publicUrl) => publicUrl.endsWith('/') ? publicUrl : `${publicUrl}/`

export async function fetchChapter() {
    let API_PARAMS = getApi()
    return axios.get(`${process.env.PUBLIC_URL ? normalizePublicUrl(process.env.PUBLIC_URL): '/'}v1/icd/release/11/${API_PARAMS.Release}/mms`);
}

export async function fetchChildren(endpoint) {
    if(typeof endpoint !== 'string') {
        let data = await  request(endpoint)
        return data
    } else {
        endpoint = endpoint.includes(window.location.origin) ? endpoint : `${window.location.origin}${endpoint}`
        const {
            data: response
        } = await axios.get(new URL(endpoint).pathname)

        return  response
    }
}

export async function fetchList(list) {
    if(!isEmpty(list.uris)) {
        let API_PARAMS = getApi()
        const {
            data: response
        } = await axios.post( `${process.env.PUBLIC_URL ? normalizePublicUrl(process.env.PUBLIC_URL): '/'}v1/icd/release/11/${API_PARAMS.Release}/mms/list`, list)
        return response
    }
    return []
}

export async function fetchFoundation(endpoint) {
    return axios.get(endpoint);
}
