const BLOCK_SIZE = 5;

const bigPicture = document.querySelector('.big-picture');
const comments = bigPicture.querySelector('.comments-count');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsBlock = bigPicture.querySelector('.social__comments');

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

const onCommentsLoad = (element, counter, fragment, array) => {
  element.addEventListener('click', () => {
    if (counter < array.comments.length) {
      array.comments.slice(counter, counter + BLOCK_SIZE).forEach((comment) => {
        fragment.appendChild(createComment(comment));
      });

      commentsBlock.appendChild(fragment);
      socialCommentCount.innerHTML = `${commentsBlock.children.length} из ${comments.textContent} комментариев`;
      counter += BLOCK_SIZE;
    }

    if (commentsBlock.children.length === array.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  });
};

export {BLOCK_SIZE, createComment, onCommentsLoad};
