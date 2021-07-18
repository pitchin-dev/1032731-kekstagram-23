import {showPopup, hidePopup} from './utils/utils.js';

const BLOCK_SIZE = 5;
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

const createComment = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentElement.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentElement.appendChild(commentText);

  commentAvatar.src = comment.avatar;
  commentText.textContent = comment.message;
  return commentElement;
};

const showFullPhoto = (photo) => {
  const commentsBlockFragment = document.createDocumentFragment();
  showPopup(bigPicture, 'modal-open', 'hidden');
  let commentCounter = 0;

  bigPictureImg.src = photo.url;
  comments.textContent = photo.comments.length;
  likes.textContent = photo.likes;
  descriptionBlock.textContent = photo.description;

  commentsBlock.innerHTML = '';
  commentsLoader.classList.remove('hidden');

  photo.comments.slice(commentCounter, commentCounter + BLOCK_SIZE).forEach((comment) => {
    commentsBlockFragment.appendChild(createComment(comment));
  });

  commentsBlock.appendChild(commentsBlockFragment);

  if (commentsBlock.children.length === photo.comments.length) {
    commentsLoader.classList.add('hidden');
  }

  if (photo.comments.length) {
    socialCommentCount.innerHTML = `${commentsBlock.children.length} из ${comments.textContent} комментариев`;
  } else {
    socialCommentCount.innerHTML = 'Нет комментариев';
  }
  commentCounter += BLOCK_SIZE;

  commentsLoader.addEventListener('click', () => {
    if (commentCounter < photo.comments.length) {
      photo.comments.slice(commentCounter, commentCounter + BLOCK_SIZE).forEach((comment) => {
        commentsBlockFragment.appendChild(createComment(comment));
      });

      commentsBlock.appendChild(commentsBlockFragment);
      socialCommentCount.innerHTML = `${commentsBlock.children.length} из ${comments.textContent} комментариев`;
      commentCounter += BLOCK_SIZE;
    }

    if (commentsBlock.children.length === photo.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  });

  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscBtnPress);
};

export {showFullPhoto};
