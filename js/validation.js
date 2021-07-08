import {checkStringLength} from './utils/utils.js';

const COMMENT_LENGTH_MAX = 140;

const uploadPictureInput = document.querySelector('#upload-file');
const editPictureForm = document.querySelector('.img-upload__overlay');
const editPictureCancelButton = editPictureForm.querySelector('#upload-cancel');
const hashtagsInput = editPictureForm.querySelector('.text__hashtags');
const commentInput = editPictureForm.querySelector('.text__description');

const ERROR_MESSAGES = {
  HASHTAG_SUM: 'Нельзя указать больше 5 (пяти) хэштегов',
  HASHTAG_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать запрещённые символы: пробелы, спецсимволы, символы пунктуации, эмодзи.',
  COMMENT_LENGTH: 'Длина комментария не должна быть больше, чем 140 (сто сорок) символов',
};

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

function closeEditPictureForm () {
  uploadPictureInput.value = '';
  editPictureForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  editPictureCancelButton.removeEventListener('click', closeEditPictureForm);
  hashtagsInput.removeEventListener('input', getHashtags);
  hashtagsInput.removeEventListener('keydown', onInputFocused);
  commentInput.removeEventListener('input',checkComment);
  commentInput.removeEventListener('keydown', onInputFocused);

}

function onEscBtnPress (e) {
  if (e.key === 'Escape') {
    closeEditPictureForm();
    document.removeEventListener('keydown', onEscBtnPress);
  }
}

function showEditPictureForm () {
  editPictureForm.classList.remove('hidden');
  document.body.classList.add('modal-open');
  editPictureCancelButton.addEventListener('click', closeEditPictureForm);
  hashtagsInput.addEventListener('change', getHashtags);
  hashtagsInput.addEventListener('keydown', onInputFocused);
  commentInput.addEventListener('change', checkComment);
  commentInput.addEventListener('keydown', onInputFocused);
  document.addEventListener('keydown', onEscBtnPress);
};

uploadPictureInput.addEventListener('change', () => {
  if (uploadPictureInput.value) {
    showEditPictureForm(uploadPictureInput.value);
  }
});
