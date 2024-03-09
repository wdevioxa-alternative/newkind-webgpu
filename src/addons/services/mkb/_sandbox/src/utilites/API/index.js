import axios from 'axios';

const singleton = Symbol();
const singletonEnforcer = Symbol();

function readCookie(name) {
  const match = document.cookie.match(
    new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'),
  );
  return match ? decodeURIComponent(match[3]) : null;
}

class ApiService {
  static api = {};
  set backend (data)  {
    ApiService.api = data
  }
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    const config = (window.location.hostname === 'localhost')? {
        baseURL: process.env.REACT_APP_DEV_URL,
    }: { }

    this.session = axios.create(config);
  }
  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new ApiService(singletonEnforcer);
    }

    return this[singleton];
  }
  get = (url, extras) => {
    const accessToken = getToken()
    return this.session.get(url.includes(`${process.env.PUBLIC_URL}`) ? `${url}` :`${process.env.PUBLIC_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-Language': ApiService.api.Lang,
        ...(extras?.headers)
      }})
  };
  post = (url, data, extras) => {
    try {
      const accessToken = getToken()
      return this.session.post(url.includes(`${process.env.PUBLIC_URL}`) ? url: `${process.env.PUBLIC_URL}${url}`, data,{
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept-Language': ApiService.api.Lang,
          ...(extras?.headers)
        }})
    } catch (e) {
      console.error('error in API', e)
      return []
    }

  };
  put = (...params) => {
    return this.session.put(...params,{
      headers: {
        'Accept-Language': ApiService.api.Lang,
      }})
  };
  patch = (...params) => {
    return this.session.patch(...params,{
      headers: {
        'Accept-Language': ApiService.api.Lang,
      }})
  };
  remove = (...params) => {
    return this.session.delete(...params, {
      headers: {
        'Accept-Language': ApiService.api.Lang,
      }})
  };
}

export const getApi = () => {
  let api = JSON.parse(localStorage.getItem('mkb_api'))
  if(api !== null) {
    return api.api.current
  } else {
    console.error('Должна быть запись в localstorage')
  }
}

export const getToken = () => {
  return localStorage.getItem('accessToken')
}

export default ApiService.instance;
