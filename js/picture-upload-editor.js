import {checkStringLength, showSuccess, showErrorModal, formReset} from './utils/utils.js';
import {createSlider, onPictureEffectAdded, removeEffectOfPicture, slider} from './noUISlider.js';
import {sendData} from './api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const COMMENT_LENGTH_MAX = 140;
const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;
const SCALE_VALUE_CHANGE = 25;

const uploadPictureInput = document.querySelector('#upload-file');
const editPictureModal = document.querySelector('.img-upload__overlay');
const editPictureCancelButton = editPictureModal.querySelector('#upload-cancel');
const hashtagsInput = editPictureModal.querySelector('.text__hashtags');
const commentInput = editPictureModal.querySelector('.text__description');
const smallScaleControl = editPictureModal.querySelector('.scale__control--smaller');
const bigScaleControl = editPictureModal.querySelector('.scale__control--bigger');
const scaleControlValue = editPictureModal.querySelector('.scale__control--value');
const picturePreview = editPictureModal.querySelector('.img-upload__preview img');
const effectPictureControl = document.querySelector('.effects__list');
const sliderBar = document.querySelector('.effect-level');
const editPictureForm = document.querySelector('.img-upload__form');

const ERROR_MESSAGES = {
  HASHTAG_SUM: 'Нельзя указать больше 5 (пяти) хэштегов',
  HASHTAG_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать запрещённые символы: пробелы, спецсимволы, символы пунктуации, эмодзи.',
  COMMENT_LENGTH: 'Длина комментария не должна быть больше, чем 140 (сто сорок) символов',
};

function zoomIn(value) {
  if (value < SCALE_VALUE_MAX) {
    const scaleValue = value + SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
}

function zoomOut (value) {
  if (value > SCALE_VALUE_MIN) {
    const scaleValue = value - SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
}

function onPictureScaleChange ({ target }) {
  const value = parseInt(scaleControlValue.value, 10);

  if (target === smallScaleControl) {
    return zoomOut(value);
  }

  if (target === bigScaleControl) {
    return zoomIn(value);
  }
}

function checkUniqueHashtags (hashtags) {
  const uniqueValue = [];

  for (let index = 0; index < hashtags.length; ++index) {
    const value = hashtags[index].toLowerCase();
    if (uniqueValue.indexOf(value) !== -1) {
      return false;
    }
    uniqueValue.push(value);
  }

  return true;
}

const isFit = (hashtags, template) => hashtags.every((element) => template.test(element));

function renderValidationMessages (hashtags) {
  const regExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  if (!isFit(hashtags, regExp)) {
    hashtagsInput.setCustomValidity(ERROR_MESSAGES.HASHTAG_TEMPLATE);
  } else if (!checkUniqueHashtags(hashtags)) {
    hashtagsInput.setCustomValidity(ERROR_MESSAGES.HASHTAG_REPEAT);
  } else if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity(ERROR_MESSAGES.HASHTAG_SUM);
  } else {
    hashtagsInput.setCustomValidity('');
  }
  hashtagsInput.reportValidity();
}

function getHashtags (e) {
  const hashtags = e.target.value.split(' ');
  renderValidationMessages(hashtags);
}

function onInputFocused (e) {
  e.stopPropagation();
}

function checkComment (e) {
  const {value} = e.target;
  if(!checkStringLength(value, COMMENT_LENGTH_MAX)) {
    commentInput.setCustomValidity(ERROR_MESSAGES.COMMENT_LENGTH);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
}

function onEditPictureFormClose () {
  uploadPictureInput.value = '';
  editPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  editPictureCancelButton.removeEventListener('click', onEditPictureFormClose);
  hashtagsInput.removeEventListener('change', getHashtags);
  hashtagsInput.removeEventListener('keydown', onInputFocused);
  commentInput.removeEventListener('change',checkComment);
  commentInput.removeEventListener('keydown', onInputFocused);
  smallScaleControl.removeEventListener('click', onPictureScaleChange);
  bigScaleControl.removeEventListener('click', onPictureScaleChange);
  effectPictureControl.removeEventListener('click', onPictureEffectAdded);
  removeEffectOfPicture();
  slider.noUiSlider.destroy();
}

function onEscBtnPress (e) {
  if (e.key === 'Escape') {
    onEditPictureFormClose();
    document.removeEventListener('keydown', onEscBtnPress);
  }
}

function setFormSubmit (e) {
  e.preventDefault();
  document.removeEventListener('keydown', onEscBtnPress);
  sendData(
    () => {
      onEditPictureFormClose();
      showSuccess();
    },
    () => {
      onEditPictureFormClose();
      showErrorModal();
    },
    new FormData(e.target),
  );
  formReset(editPictureForm);
}

function showEditPictureForm () {
  editPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderBar.style.display = 'none';
  picturePreview.style.removeProperty('transform');
  editPictureCancelButton.addEventListener('click', onEditPictureFormClose);
  hashtagsInput.addEventListener('change', getHashtags);
  hashtagsInput.addEventListener('keydown', onInputFocused);
  commentInput.addEventListener('change', checkComment);
  commentInput.addEventListener('keydown', onInputFocused);
  document.addEventListener('keydown', onEscBtnPress);
  smallScaleControl.addEventListener('click', onPictureScaleChange);
  bigScaleControl.addEventListener('click', onPictureScaleChange);
  effectPictureControl.addEventListener('click', onPictureEffectAdded);
  createSlider();
  editPictureForm.addEventListener('submit', setFormSubmit);
}

uploadPictureInput.addEventListener('change', () => {
  if (uploadPictureInput.value) {
    showEditPictureForm(uploadPictureInput.value);
  }
});

uploadPictureInput.addEventListener('change', () => {
  const file = uploadPictureInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      picturePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});
