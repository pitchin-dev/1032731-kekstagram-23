import {posts} from '../data.js';

const picture = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const picturesDescriptionArray = posts;
const picturesFragment = document.createDocumentFragment();

function createPhotoThumbnail(arr) {
  const pictureElement = picture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = arr.url;
  pictureElement.querySelector('.picture__likes').textContent = arr.likes;
  pictureElement.querySelector('.picture__comments').textContent = arr.comments.length;

  picturesFragment.appendChild(pictureElement);
}

picturesDescriptionArray.forEach((item) => {
  createPhotoThumbnail(item);
});

pictures.appendChild(picturesFragment);
console.log(pictures);
