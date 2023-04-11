export const APP_ID = "QBEkl5"; //app id tergenerate dari project yang sudah di encode
export const BASE_URL = "https://v3.lenna.ai/";
export const BASE_URL_CHAT =
  "https://v3.lenna.ai/app/public/api/PdyMgd/webhook/mobile";
export const BASE_URL_RATING = "https://cms.lenna.ai";
export const LOGIN = "backend/api/" + APP_ID + "/auth/login";
export const REGISTER = "backend/api/" + APP_ID + "/users/register";
export const FORGOT_PASSWORD =
  "backend/api/" + APP_ID + "/auth/forgot-password";
export const TERM_CONDITION = "backend/api/" + APP_ID + "/term-and-condition";
export const BASE_URL_VOICE =
  "https://bcc.bni.sdtech.co.id/api/general/getvoiceurl";
export const URL_VOICE =
  "https://v3.lenna.ai/backend/api/text-to-speech?text=$paramtext&gender=female&lang=id&speaking_rate=0.9&pitch=0&uniqueId=";
export const HISTORY_CHAT = "message/get-messages/mobile";
export const RATING_TYPE = "/rating/case_api";
export const RATING_SAVE = "/ratingmobile/save";

export const LOGIN_NEW =
  "https://v3.lenna.ai/app/public/api/PdyMgd/mobile/entry-login";

export const post = async (url, data) => {
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("error postData", error);
  }
};

export const postData = async (url, data, token) => {
  console.log(url, data);
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "X-LENNA-MOBILE": "xr2JBapQVsHUTbOGvd6Row=="
      },
      body: JSON.stringify(data)
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("error postData", error);
  }
};

export const postNoHeader = async (url, data) => {
  console.log(url, data);
  try {
    let response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.log("error ada di postNoHeader", error);
  }
};

export const postFormDataNoHeader = async (url, data) => {
  console.log(url, data);
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data"
      },
      body: data
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("error postDataFormData", error);
  }
};

export const postDataFormData = async (url, token, data) => {
  console.log(url, data);
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token
      },
      body: data
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("error postDataFormData", error);
  }
};

export const postDataAuth = async (url, token, data) => {
  console.log(url, data);
  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(data)
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("error postDataAuth", error);
  }
};

export const getData = async (url, token) => {
  console.log(url, data);
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        "X-LENNA-MOBILE": "xr2JBapQVsHUTbOGvd6Row=="
      }
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("error getData", error);
  }
};

export const getDataNoHeader = async url => {
  console.log(url);
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("error getData", error);
  }
};

export const getLogout = async (app_id, user_id, token) => {
  var res = null;
  await getData(BASE_URL + "backend/api/" + app_id + "/auth/logout", token)
    .then(response => {
      res = response;
    })
    .catch(error => {
      res = error;
    });
  return res;
};

export const getHistoryChat = async (
  webhook_id,
  user_id,
  firstMessageId,
  per_page,
  token
) => {
  var res = null;
  try {
    await getData(
      `${BASE_URL}app/public/api/${webhook_id}/${HISTORY_CHAT}?user_id=${user_id}&firstMessageId=${firstMessageId}&per_page=${per_page}`,
      token
    )
      .then(response => {
        res = response;
      })
      .catch(error => {
        console.log("getHistoryChat response err", error);
        res = error;
      });
  } catch (error) {
    res = error;
  }

  return res;
};

export const getRatingType = async url => {
  var res = null;
  console.log(`API YANG DI HIT => ${BASE_URL_RATING}${RATING_TYPE}/${url}`);
  try {
    await getDataNoHeader(`${BASE_URL_RATING}${RATING_TYPE}/${url}`)
      .then(response => {
        res = response;
      })
      .catch(error => {
        console.log("get rating error", error);
        res = error;
      });
  } catch (error) {
    res = error;
  }
  return res;
};

export const postRating = async body => {
  var res = null;
  console.log(`API YANG DI HIT => ${BASE_URL_RATING}${RATING_SAVE}`);
  try {
    await postFormDataNoHeader(`${BASE_URL_RATING}${RATING_SAVE}`, body)
      .then(response => {
        console.log("response save rating :", response);
        res = response;
      })
      .catch(error => {
        console.log("get rating error", error);
        res = error;
      });
  } catch (error) {
    res = error;
  }
  return res;
};
