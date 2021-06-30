import './create-photo/create-photo-full.js';
import './create-photo/create-photo-thumbnail.js';
import {posts} from './data.js';
import {createPhotoThumbnail} from './create-photo/create-photo-thumbnail.js';
import {showFullPhoto} from './create-photo/create-photo-full.js';

const picturesDescriptionArray = posts;
const pictures = document.querySelector('.pictures');

picturesDescriptionArray.forEach((item) => {
  pictures.appendChild(createPhotoThumbnail(item));
});

const photos = pictures.querySelectorAll('.picture');

photos.forEach((photo, i) => {
  photo.addEventListener('click', () => {
    showFullPhoto(picturesDescriptionArray[i]);
  });
});
