const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('img');
const likes = bigPicture.querySelector('.likes-count');
const comments = bigPicture.querySelector('.comments-count');
const descriptionBlock = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeBtn = bigPicture.querySelector('.big-picture__cancel');
const commentsBlock = bigPicture.querySelector('.social__comments');

function createComment(comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentElement.appendChild(commentAvatar);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentElement.appendChild(commentText);

  const commentFragment = document.createDocumentFragment();

  commentAvatar.src = comment.avatar;
  commentText.textContent = comment.message;
  commentFragment.appendChild(commentElement);
  return commentFragment;
}

function showFullPhoto(photo) {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.add('hidden');
  socialCommentCount.classList.add('hidden');

  bigPictureImg.src = photo.url;
  comments.textContent = photo.comments.length;
  likes.textContent = photo.likes;
  descriptionBlock.textContent = photo.description;

  //удаляю изначальное содержимое commentsBlock, т.к. не реализован пустой template и изначально в разметке есть ненужные комментарии
  commentsBlock.innerHTML = '';
  photo.comments.forEach((comment) => {
    commentsBlock.appendChild(createComment(comment));
  });
}

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  commentsBlock.innerHTML = '';
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsBlock.innerHTML = '';
  }
});

export {showFullPhoto};
