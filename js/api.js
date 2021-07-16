import {showAlert} from './utils/utils.js';

const GET_DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';

function getData (onSuccess) {
  fetch(GET_DATA_URL)
    .then((res) => {
      if (!res.ok) {
        return showAlert('Не удалось загрузить данные.');
      }
      return res.json();
    })
    .then(onSuccess)
    .catch(() => showAlert('Не удалось загрузить данные.'));
}

function sendData (onSuccess, onFail, body) {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((res) => {
      if (!res.ok) {
        return onFail();
      }
      return onSuccess();
    })
    .catch(() => onFail());
}

export {getData, sendData};
