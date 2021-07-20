const GET_METHOD = 'GET';
const POST_METHOD = 'POST';
const GET_DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';

const fetchData = (method, url, onSuccess, onError, data) => {
  if (method === GET_METHOD) {
    return fetch(url).then((res) => res.json()).then((res) => onSuccess(res)).catch(() => onError());
  }
  if (method === POST_METHOD) {
    return fetch(url, {method, body: data}).then(() => onSuccess()).catch(() => onError());
  }
};

const getData = (onSuccess, onError) => {
  fetchData(GET_METHOD, GET_DATA_URL, onSuccess, onError);
};

const sendData = (onSuccess, onError, body) => {
  fetchData(POST_METHOD, SEND_DATA_URL, onSuccess, onError, body);
};

export {getData, sendData};
