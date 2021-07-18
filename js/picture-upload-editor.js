import {checkStringLength, showSuccess, showErrorModal, formReset} from './utils/utils.js';
import {createSlider, onPictureEffectAdded, removeEffectOfPicture, slider} from './noUISlider.js';
import {sendData} from './api.js';

const REG_EXP = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
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

const zoomIn = (value) => {
  if (value < SCALE_VALUE_MAX) {
    const scaleValue = value + SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const zoomOut = (value) => {
  if (value > SCALE_VALUE_MIN) {
    const scaleValue = value - SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const onPictureScaleChange = ({ target }) => {
  const value = parseInt(scaleControlValue.value, 10);

  if (target === smallScaleControl) {
    return zoomOut(value);
  }

  if (target === bigScaleControl) {
    return zoomIn(value);
  }
};

const checkUniqueHashtags = (hashtags) => {
  const uniqueValue = [];

  for (let index = 0; index < hashtags.length; ++index) {
    const value = hashtags[index].toLowerCase();
    if (uniqueValue.indexOf(value) !== -1) {
      return false;
    }
    uniqueValue.push(value);
  }

  return true;
};

const isFit = (hashtags, template) => hashtags.every((element) => template.test(element));

const renderValidationMessages = (hashtags) => {
  if (!isFit(hashtags, REG_EXP)) {
    hashtagsInput.setCustomValidity(ERROR_MESSAGES.HASHTAG_TEMPLATE);
  } else if (!checkUniqueHashtags(hashtags)) {
    hashtagsInput.setCustomValidity(ERROR_MESSAGES.HASHTAG_REPEAT);
  } else if (hashtags.length > 5) {
    hashtagsInput.setCustomValidity(ERROR_MESSAGES.HASHTAG_SUM);
  } else {
    hashtagsInput.setCustomValidity('');
  }
  hashtagsInput.reportValidity();
};

const onHashtagsCheck = (e) => {
  const hashtags = e.target.value.split(' ');
  renderValidationMessages(hashtags);
};

const onInputFocused = (e) => {
  e.stopPropagation();
};

const onCommentCheck = (e) => {
  const {value} = e.target;
  if(!checkStringLength(value, COMMENT_LENGTH_MAX)) {
    commentInput.setCustomValidity(ERROR_MESSAGES.COMMENT_LENGTH);
  } else {
    commentInput.setCustomValidity('');
  }
  commentInput.reportValidity();
};

const onEditPictureFormClose = () => {
  uploadPictureInput.value = '';
  editPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  editPictureCancelButton.removeEventListener('click', onEditPictureFormClose);
  hashtagsInput.removeEventListener('change', onHashtagsCheck);
  hashtagsInput.removeEventListener('keydown', onInputFocused);
  commentInput.removeEventListener('change',onCommentCheck);
  commentInput.removeEventListener('keydown', onInputFocused);
  smallScaleControl.removeEventListener('click', onPictureScaleChange);
  bigScaleControl.removeEventListener('click', onPictureScaleChange);
  effectPictureControl.removeEventListener('click', onPictureEffectAdded);

  removeEffectOfPicture();
  slider.noUiSlider.destroy();
};

const onEscBtnPress = (e) => {
  if (e.key === 'Escape') {
    onEditPictureFormClose();
    document.removeEventListener('keydown', onEscBtnPress);
  }
};

const setFormSubmit = (e) => {
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
};

const showEditPictureForm = () => {
  editPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderBar.style.display = 'none';
  picturePreview.style.removeProperty('transform');
  editPictureCancelButton.addEventListener('click', onEditPictureFormClose);
  hashtagsInput.addEventListener('change', onHashtagsCheck);
  hashtagsInput.addEventListener('keydown', onInputFocused);
  commentInput.addEventListener('change', onCommentCheck);
  commentInput.addEventListener('keydown', onInputFocused);
  document.addEventListener('keydown', onEscBtnPress);
  smallScaleControl.addEventListener('click', onPictureScaleChange);
  bigScaleControl.addEventListener('click', onPictureScaleChange);
  effectPictureControl.addEventListener('click', onPictureEffectAdded);
  createSlider();
  editPictureForm.addEventListener('submit', setFormSubmit);
};

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
