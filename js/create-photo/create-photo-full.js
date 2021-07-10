import {showPopup, hidePopup} from '../utils/utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const comments = bigPicture.querySelector('.comments-count');
const descriptionBlock = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const commentsBlock = bigPicture.querySelector('.social__comments');

function onEscBtnPress(e) {
  if (e.key === 'Escape') {
    hidePopup(bigPicture, 'modal-open', 'hidden');
    document.removeEventListener('keydown', onEscBtnPress);
  }
}

function onCloseBtnClick() {
  hidePopup(bigPicture, 'modal-open', 'hidden');
  document.removeEventListener('keydown', onEscBtnPress);
}

function createComment(comment) {
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
}

function showFullPhoto(photo) {
  const commentsBlockFragment = document.createDocumentFragment();
  showPopup(bigPicture, 'modal-open', 'hidden');
  let commentCounter = 0;

  bigPictureImg.src = photo.url;
  comments.textContent = photo.comments.length;
  likes.textContent = photo.likes;
  descriptionBlock.textContent = photo.description;

  commentsBlock.innerHTML = '';
  commentsLoader.classList.remove('hidden');

  photo.comments.slice(commentCounter, commentCounter + 5).forEach((comment) => {
    commentsBlockFragment.appendChild(createComment(comment));
  });

  commentsBlock.appendChild(commentsBlockFragment);
  //на случай, если комментарий всего один и кнопку надо спрятать сразу
  if (commentsBlock.children.length === photo.comments.length) {
    commentsLoader.classList.add('hidden');
  }
  socialCommentCount.innerHTML = `${commentsBlock.children.length} из ${comments.textContent} комментариев`;
  commentCounter += 5;

  commentsLoader.addEventListener('click', () => {
    if (commentCounter < photo.comments.length) {
      photo.comments.slice(commentCounter, commentCounter + 5).forEach((comment) => {
        commentsBlockFragment.appendChild(createComment(comment));
      });

      commentsBlock.appendChild(commentsBlockFragment);
      socialCommentCount.innerHTML = `${commentsBlock.children.length} из ${comments.textContent} комментариев`;
      commentCounter += 5;
    }

    if (commentsBlock.children.length === photo.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  });

  closeBtn.addEventListener('click', onCloseBtnClick);
  document.addEventListener('keydown', onEscBtnPress);
}

export {showFullPhoto};
