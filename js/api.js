const GET_DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';

const fetchData = (method, url, onSuccess, onError, data) => {
  if (method === 'GET') {
    return fetch(url).then((res) => res.json()).then((res) => onSuccess(res)).catch(() => onError());
  }
  if (method === 'POST') {
    return fetch(url, {method, body: data}).then(() => onSuccess()).catch(() => onError());
  }
};

const getData = (onSuccess, onError) => {
  fetchData('GET', GET_DATA_URL, onSuccess, onError);
};

const sendData = (onSuccess, onError, body) => {
  fetchData('POST', SEND_DATA_URL, onSuccess, onError, body);
};

export {getData, sendData};
