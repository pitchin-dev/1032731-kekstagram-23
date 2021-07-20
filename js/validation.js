import {checkStringLength} from './utils/utils.js';

const REG_EXP = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const COMMENT_LENGTH_MAX = 140;
const ERROR_MESSAGES = {
  HASHTAG_SUM: 'Нельзя указать больше 5 (пяти) хэштегов',
  HASHTAG_REPEAT: 'Хэштеги не должны повторяться',
  HASHTAG_TEMPLATE: 'Хэштеги не соответствуют требованиям. Хэштег должен начинаться с знака #, не может содержать запрещённые символы: пробелы, спецсимволы, символы пунктуации, эмодзи.',
  COMMENT_LENGTH: 'Длина комментария не должна быть больше, чем 140 (сто сорок) символов',
};

const editPictureModal = document.querySelector('.img-upload__overlay');
const hashtagsInput = editPictureModal.querySelector('.text__hashtags');
const commentInput = editPictureModal.querySelector('.text__description');

const checkUniqueHashtags = (hashtags) => {
  const values = [];

  for (let i = 0; i < hashtags.length; ++i) {
    const value = hashtags[i].toLowerCase();
    if (values.indexOf(value) !== -1) {
      return false;
    }
    values.push(value);
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
  e.preventDefault();
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

export {onHashtagsCheck, onCommentCheck};
