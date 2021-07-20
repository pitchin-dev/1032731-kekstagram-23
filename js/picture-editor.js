import {showSuccess, showErrorModal, hidePopup} from './utils/utils.js';
import {onPictureScaleChange} from './scale.js';
import {onHashtagsCheck, onCommentCheck} from './validation.js';
import {createSlider, onPictureEffectAdded, removeEffectOfPicture, slider} from './slider.js';
import {sendData} from './api.js';

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

const resetFormValues = () => {
  uploadPictureInput.value = '';
  picturePreview.style.transform = 'scale(1)';
  effectPictureControl.children[0].querySelector('input[type="radio"]').checked = true;
  hashtagsInput.value = '';
  commentInput.value = '';
};

const onEditPictureFormClose = (e) => {
  resetFormValues();
  hidePopup(editPictureModal, 'modal-open', 'hidden');
  removeEffectOfPicture();

  editPictureCancelButton.removeEventListener('click', onEditPictureFormClose);
  hashtagsInput.removeEventListener('input', onHashtagsCheck);
  commentInput.removeEventListener('input',onCommentCheck);
  smallScaleControl.removeEventListener('click', onPictureScaleChange);
  bigScaleControl.removeEventListener('click', onPictureScaleChange);
  effectPictureControl.removeEventListener('click', onPictureEffectAdded);
  slider.noUiSlider.destroy();
};

const onEscBtnPress = (evt) => {
  if (evt.keyCode === 27) {
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
