import {POSTS} from '../data.js';

const picture = document.querySelector('#picture').content.querySelector('.picture');
const pictures = document.querySelector('.pictures');
const picturesDescriptionArray = POSTS;
const picturesFragment = document.createDocumentFragment();

picturesDescriptionArray.forEach(({url, likes, comments}) => {
  const pictureElement = picture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  picturesFragment.appendChild(pictureElement);
});

pictures.appendChild(picturesFragment);
console.log(pictures);
