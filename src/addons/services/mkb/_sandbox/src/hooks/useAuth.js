import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@src/hooks/useLocalStorage';
import { getTokenPair, getUserInfo, getRefreshToken } from '@src/modules/api';
import isEmpty from "../utilites/isEmpty";

const signIn = () => {
  const isPredProd = window.location.hostname.includes('rt-eu')
  const isDevStand =
    window.location.hostname.includes('digitalms') ||
    window.location.hostname.includes('localhost');
  let egiszUrl = ''
   if(isPredProd) {
     egiszUrl = 'https://ia-test.egisz.rosminzdrav.ru/realms/master/protocol/openid-connect/auth?response_type=code&client_id=mkb11_test&response_mode=query&redirect_uri=https%3A%2F%2Fmkb11.rt-eu.ru%2F'
   } else {
     egiszUrl = isDevStand
         ? 'https://ia-test.egisz.rosminzdrav.ru/realms/dev/protocol/openid-connect/auth?response_type=code&client_id=mkb11_dev&response_mode=query&redirect_uri=https%3A%2F%2Fmkb11-compose-dev.digitalms.ru%2F'
         : 'https://ia.egisz.rosminzdrav.ru/realms/master/protocol/openid-connect/auth?response_type=code&client_id=mkb11&response_mode=query&redirect_uri=https%3A%2F%2Fmkb11.egisz.rosminzdrav.ru%2F';
   }

    window.location.href = egiszUrl;
};

export const logOut = () => {
  const isPredProd = window.location.hostname.includes('rt-eu')
  const isDevStand =
    window.location.hostname.includes('digitalms') ||
    window.location.hostname.includes('localhost');
    let egiszUrlLogout = ''

    if(isPredProd) {
      egiszUrlLogout = "https://ia-test.egisz.rosminzdrav.ru/realms/master/protocol/openid-connect/logout?client_id=mkb11_test&redirect_uri=https%3A%2F%2Fmkb11.rt-eu.ru%2F"
    } else {
      egiszUrlLogout = isDevStand
          ? 'https://ia-test.egisz.rosminzdrav.ru/realms/dev/protocol/openid-connect/logout?client_id=mkb11_dev&redirect_uri=https%3A%2F%2Fmkb11-compose-dev.digitalms.ru%2F'
          : 'https://ia.egisz.rosminzdrav.ru/realms/master/protocol/openid-connect/logout?client_id=mkb11&redirect_uri=https%3A%2F%2Fmkb11.egisz.rosminzdrav.ru%2F';
    }

    window.location.href = egiszUrlLogout;
};

export const useAuth = () => {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', '');
  const [userInfo, setUserInfo] = useState(null);
  const [alreadyUsedCode, setAlreadyUsedCode] = useLocalStorage(
    'alreadyUsedCode',
    '',
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const refresh = window.localStorage.getItem('refreshToken')
      if(!isEmpty(refresh)) {
        getRefreshToken(refresh)
            .then(({ data }) => {
              window.localStorage.setItem('accessToken',data.accessToken)
              window.localStorage.setItem('refreshToken',data.accessToken)
            })
            .catch(error => { });
      }
    }, process.env.REACT_APP_CUSTOM_TOKEN_TTL ? process.env.REACT_APP_CUSTOM_TOKEN_TTL :  280000);

    return () => clearInterval(interval);
  }, []);
  const resetTokens = () => {
    setAccessToken('');
    setRefreshToken('');
  };

  const params = new URLSearchParams(document.location.search);
  const code = params.get('code');
  if (code?.length && code !== alreadyUsedCode) {
    try {
      getTokenPair(code)
        .then(data => {
          if (!isEmpty(data) && data.status === 200) {
            setAccessToken(data.data.accessToken);
            setRefreshToken(data.data.refreshToken);
            setUserInfo(data.data.userinfo);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setAlreadyUsedCode(code));
    } catch (error) {
      console.log(error);
    }
  } else {
    if (accessToken) {
      try {
        getUserInfo(accessToken)
          .then(({ data }) => {
            !userInfo && setUserInfo(data);
          })
          .catch(error => {
            console.log(error);
            setAccessToken('');
          });
      } catch (error) {
        console.log(error);
      }
    } else if (refreshToken && !accessToken) {
      try {
        getRefreshToken(refreshToken)
          .then(({ data }) => {
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUserInfo(data.userinfo);
          })
          .catch(error => {
            if(error.request.status !== 500) {
              console.log(error);
              setRefreshToken('');
              setUserInfo('');
              logOut();
            } else {
              setRefreshToken('');
              setUserInfo('');
            }
          });
      } catch (error) {
        console.log(error);
      }
    } 
    // else if (!refreshToken && !accessToken) {
    //   (process.env.NODE_ENV === 'production') && signIn();
    // }
  }

  return { userInfo, resetTokens, signIn, logOut, accessToken };
};
