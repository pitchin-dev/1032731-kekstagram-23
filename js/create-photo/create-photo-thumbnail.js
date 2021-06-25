import {posts} from '../data.js';

const picture = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const picturesDescriptionArray = posts;

function createPhotoThumbnail(arr) {
  const pictureFragment = document.createDocumentFragment();
  const pictureElement = picture.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = arr.url;
  pictureElement.querySelector('.picture__likes').textContent = arr.likes;
  pictureElement.querySelector('.picture__comments').textContent = arr.comments.length;
  pictureFragment.appendChild(pictureElement);

  return pictureFragment;
}

picturesDescriptionArray.forEach((item) => {
  pictures.appendChild(createPhotoThumbnail(item));
});
