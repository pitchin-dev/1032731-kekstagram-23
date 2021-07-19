import {showSuccess, showErrorModal, hidePopup, onEscBtnPress} from './utils/utils.js';
import {onHashtagsCheck, onCommentCheck} from './validation.js';
import {createSlider, onPictureEffectAdded, removeEffectOfPicture, slider} from './slider.js';
import {sendData} from './api.js';

const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
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

const setZoomIn = (value) => {
  if (value < SCALE_VALUE_MAX) {
    const scaleValue = value + SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const setZoomOut = (value) => {
  if (value > SCALE_VALUE_MIN) {
    const scaleValue = value - SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const onPictureScaleChange = ({ target }) => {
  const value = parseInt(scaleControlValue.value, 10);

  if (target === smallScaleControl) {
    return setZoomOut(value);
  }

  if (target === bigScaleControl) {
    return setZoomIn(value);
  }
};

const resetFormValues = () => {
  uploadPictureInput.value = '';
  picturePreview.style.transform = 'scale(1)';
  effectPictureControl.children[0].querySelector('input[type="radio"]').checked = true;
  hashtagsInput.value = '';
  commentInput.value = '';
};

const onEditPictureFormClose = (e) => {
  if (hashtagsInput === document.activeElement || commentInput === document.activeElement) {
    e.stopPropagation();
  } else {
    resetFormValues();
    hidePopup(editPictureModal, 'modal-open', 'hidden');

    editPictureCancelButton.removeEventListener('click', onEditPictureFormClose);
    hashtagsInput.removeEventListener('input', onHashtagsCheck);
    commentInput.removeEventListener('input',onCommentCheck);
    smallScaleControl.removeEventListener('click', onPictureScaleChange);
    bigScaleControl.removeEventListener('click', onPictureScaleChange);
    effectPictureControl.removeEventListener('click', onPictureEffectAdded);

    removeEffectOfPicture();
    slider.noUiSlider.destroy();
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
};

const showEditPictureForm = () => {
  editPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderBar.style.display = 'none';
  picturePreview.style.removeProperty('transform');
  scaleControlValue.value = '100%';
  editPictureCancelButton.addEventListener('click', onEditPictureFormClose);
  hashtagsInput.addEventListener('input', onHashtagsCheck);
  commentInput.addEventListener('input', onCommentCheck);
  document.addEventListener('keydown', onEscBtnPress(onEditPictureFormClose));
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
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      picturePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
});
