const ALERT_SHOW_TIME = 5000;

const alertTemplate = document.querySelector('#error').content.querySelector('.error');
const successTemplate = document.querySelector('#success').content.querySelector('.success');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return 'Cannot return random numbers. Min and max number must be positive';
  }

  if (max < min || max === min) {
    return 'Cannot return random number. Check your max number, it cannot be less or identical to min number';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkStringLength = (string, maxLength) => string.length <= maxLength;

const showPopup = (popup, showClass, hideClass) => {
  popup.classList.remove(hideClass);
  document.body.classList.add(showClass);
};

const hidePopup = (popup, showClass, hideClass) => {
  popup.classList.add(hideClass);
  document.body.classList.remove(showClass);
};

const showAlert = (message) => {
  const alertElement = alertTemplate.cloneNode(true);
  const title = alertElement.querySelector('.error__title');
  title.style.lineHeight = '1em';
  title.textContent = message;
  alertElement.querySelector('.error__button').remove();
  document.body.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, ALERT_SHOW_TIME);
};

const onSuccessModalClose = () => {
  const successModal = document.querySelector('.success');
  successModal.remove();
};

const closeErrorModal = () => {
  const errorModal = document.querySelector('.error');
  errorModal.remove();
};

const onEscBtnForErrorModal = (e) => {
  if (e.key === 'Escape') {
    document.removeEventListener('keydown', onEscBtnForErrorModal);
    closeErrorModal();
  }
};

const onEscBtnForSuccessModal = (e) => {
  if (e.key === 'Escape') {
    document.removeEventListener('keydown', onEscBtnForSuccessModal);
    onSuccessModalClose();
  }
};

const showErrorModal = () => {
  const errorModalElement = alertTemplate.cloneNode(true);
  const closeButton = errorModalElement.querySelector('.error__button');
  document.body.appendChild(errorModalElement);
  closeButton.addEventListener('click', closeErrorModal);
  document.addEventListener('keydown', onEscBtnForErrorModal);
};

const showSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  const closeButton = successElement.querySelector('.success__button');
  document.body.appendChild(successElement);
  closeButton.addEventListener('click', onSuccessModalClose);
  document.addEventListener('keydown', onEscBtnForSuccessModal);
};

const formReset = (form) => {
  form.reset();
};

//https://learn.javascript.ru/task/shuffle
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export {getRandomInt, checkStringLength, showPopup, hidePopup, showAlert, showSuccess, showErrorModal, formReset, shuffle};
