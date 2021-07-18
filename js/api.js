const GET_DATA_URL = 'https://23.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(GET_DATA_URL)
    .then((res) => {
      if (!res.ok) {
        return onError();
      }
      return res.json();
    })
    .then(onSuccess)
    .catch(() => onError());
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((res) => {
      if (!res.ok) {
        return onError();
      }
      return onSuccess();
    })
    .catch(() => onError());
};

export {getData, sendData};
