const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const comments = bigPicture.querySelector('.comments-count');
const descriptionBlock = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const commentsBlock = bigPicture.querySelector('.social__comments');

function hideTarget() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeBtn.removeEventListener('click', hideTarget);
}

function hideByEsc(e) {
  if (e.key === 'Escape') {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', hideByEsc);
  }
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
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  bigPictureImg.src = photo.url;
  comments.textContent = photo.comments.length;
  likes.textContent = photo.likes;
  descriptionBlock.textContent = photo.description;

  commentsBlock.innerHTML = '';

  photo.comments.forEach((comment) => {
    commentsBlockFragment.appendChild(createComment(comment));
  });

  commentsBlock.appendChild(commentsBlockFragment);

  closeBtn.addEventListener('click', hideTarget);
  document.addEventListener('keydown', hideByEsc);
}

export {showFullPhoto};
