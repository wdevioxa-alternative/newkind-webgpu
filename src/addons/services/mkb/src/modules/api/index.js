import axios from "axios";
import isEmpty from "../../utilites/isEmpty";

const config =
  window.location.hostname === "localhost"
    ? {
        // baseURL: process.env.REACT_APP_DEV_URL,
        baseURL: "https://mkb11-compose-dev.digitalms.ru",
      }
    : {};

const api = axios.create(config);

const filter = (version, self, l, md) => {
  let current = self;
  let maxDate = md;
  let lang = l;

  for (let i = 0; i < version.length; ++i) {
    const currentData = version[i].Release.split("-");
    if (maxDate[0] < currentData[0]) {
      if (lang === "ru") {
        if (version.lang === "ru") {
          maxDate = currentData;
          current = version[i];
          lang = version[i].Lang;
        }
      } else {
        maxDate = currentData;
        current = version[i];
        lang = version[i].Lang;
      }
    }

    if (
      parseInt(maxDate[0], 10) === parseInt(currentData[0], 10) &&
      maxDate[1] < currentData[1]
    ) {
      if (lang === "ru") {
        if (version.lang === "ru") {
          maxDate = currentData;
          current = version[i];
        }
      } else {
        maxDate = currentData;
        current = version[i];
      }
    }

    if (
      maxDate[0] === currentData[0] &&
      parseInt(maxDate[1], 10) === parseInt(currentData[1], 10) &&
      lang !== "ru"
    ) {
      maxDate = currentData;
      current = version[i];
    }
  }

  return current;
};

export async function available() {
  let enResult = [];
  let ruResult = [];
  try {
    const { data: en } = await api.get(
      `${process.env.PUBLIC_URL}/v1/icd/release/11/available`,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );
    enResult = en;
  } catch (e) {}

  try {
    const { data: ru } = await api.get(
      `${process.env.PUBLIC_URL}/v1/icd/release/11/available`,
      {
        headers: {
          "Accept-Language": "ru",
        },
      }
    );
    ruResult = ru;
  } catch (e) {}

  let current = !isEmpty(ruResult) ? filter(ruResult, [], "", [0, 0]) : [];
  let maxDate = !isEmpty(current) ? current.Release.split("-") : [0, 0];
  let lang = !isEmpty(current) ? current.Lang : "";
  let all = ruResult.concat(enResult);
  current = filter(all, current, lang, maxDate);
  return current;
}

export async function getTokenPair(code, code_verifier, redirect_uri) {
  try {
    let url = ''
    let client_id = ''
    const isStage = window.location.hostname.includes(
      process.env.REACT_APP_PREFIX_STAGE
    );

    if(isStage) {
      client_id = "mkb11_stage_test"
      url = "https://ia.test.egisz.rosminzdrav.ru/realms/master/protocol/openid-connect/token"
    } else {
      client_id = "web-client"
      url = "https://ia.helpms.ru/realms/mkb11/protocol/openid-connect/token"
    }

    const data = await axios.post(
      url,
      {
        code,
        code_verifier,
        redirect_uri,
        grant_type: "authorization_code",
        client_id: client_id,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data;
  } catch (e) {
    console.error("не был получен токкен");
  }
}

export async function getUserInfo(accessToken) {
  if (accessToken) {
    const data = await api.get("/auth/userinfo", {
      // withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } else {
    // console.log('авторизация: нет токкена')
    return [];
  }
}

export async function getRefreshToken(refreshToken) {
  // const data = await api.post("/auth/refresh", {
  //   refreshToken: refreshToken,
  // });
  // return data;
  try {
    const data = await axios.post(
      "https://ia.helpms.ru/realms/mkb11/protocol/openid-connect/token",
      {
        client_id: "web-client",
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
