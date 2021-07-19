import {showPopup, hidePopup} from './utils/utils.js';
import {BLOCK_SIZE, createComment, onCommentsLoad} from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const comments = bigPicture.querySelector('.comments-count');
const descriptionBlock = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const commentsBlock = bigPicture.querySelector('.social__comments');

const onEscBtnPress = (e) => {
  if (e.key === 'Escape') {
    hidePopup(bigPicture, 'modal-open', 'hidden');
    document.removeEventListener('keydown', onEscBtnPress);
  }
};

const onCloseBtnClick = () => {
  hidePopup(bigPicture, 'modal-open', 'hidden');
  document.removeEventListener('keydown', onEscBtnPress);
};

const setPhotoInfo = (array, img, commentsCount, likesCount, description) => {
  img.src = array.url;
  commentsCount.textContent = array.comments.length;
  likesCount.textContent = array.likes;
  description.textContent = array.description;
};

const showFullPhoto = (photo) => {
  const commentsBlockFragment = document.createDocumentFragment();
  showPopup(bigPicture, 'modal-open', 'hidden');
  let commentCounter = 0;

  setPhotoInfo(photo, bigPictureImg, comments, likes, descriptionBlock);
  commentsBlock.innerHTML = '';
  commentsLoader.classList.remove('hidden');

  photo.comments.slice(commentCounter, commentCounter + BLOCK_SIZE).forEach((comment) => {
    commentsBlockFragment.appendChild(createComment(comment));
  });

  commentsBlock.appendChild(commentsBlockFragment);

  if (commentsBlock.children.length === photo.comments.length) {
    commentsLoader.classList.add('hidden');
  }

  socialCommentCount.textContent = `${commentsBlock.children.length} из ${comments.textContent} комментариев`;
  commentCounter += BLOCK_SIZE;
  onCommentsLoad(commentsLoader, commentCounter, commentsBlockFragment, photo);

  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscBtnPress);
};

export {showFullPhoto};
