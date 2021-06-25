const picture = document.querySelector('#picture').content.querySelector('.picture');

function createPhotoThumbnail(arr) {
  const pictureFragment = document.createDocumentFragment();
  const pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = arr.url;
  pictureElement.querySelector('.picture__likes').textContent = arr.likes;
  pictureElement.querySelector('.picture__comments').textContent = arr.comments.length;
  pictureFragment.appendChild(pictureElement);

  return pictureFragment;
}

export {createPhotoThumbnail};
