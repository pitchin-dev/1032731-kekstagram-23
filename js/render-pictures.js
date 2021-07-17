import {showFullPhoto} from './create-photo-full.js';
import {debounce} from './utils/debounce.js';
import {shuffle} from './utils/utils.js';

const RANDOM_PICTURES_NUMBER = 10;
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postListFragment = document.createDocumentFragment();
const imgFilters = document.querySelector('.img-filters');
const imgFiltersBtn = document.querySelectorAll('.img-filters__button');
const defaultPicturesBtn = imgFilters.querySelector('#filter-default');
const randomPicturesBtn = imgFilters.querySelector('#filter-random');
const discussedPicturesBtn = imgFilters.querySelector('#filter-discussed');
let postListCopy = [];

function renderPostsList (posts) {
  postListCopy = posts;

  postListCopy.forEach(({ url, likes, comments }) => {
    const postElement = pictureTemplate.cloneNode(true);
    postElement.querySelector('.picture__img').setAttribute('src', url);
    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    postListFragment.appendChild(postElement);
  });

  picturesContainer.appendChild(postListFragment);
  imgFilters.classList.remove('img-filters--inactive');
}

const setFilterDebounced = (debounce(
  (photoList) => {
    picturesContainer.querySelectorAll('.picture').forEach((picture) => {
      picture.remove();
    });
    renderPostsList(photoList);
  },
));

picturesContainer.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.picture__img')) {
    e.preventDefault();
    const post = postListCopy.find(({url}) => url === target.getAttribute('src'));
    showFullPhoto(post);
  }
});

function setFiltersActive (activeButton) {
  imgFiltersBtn.forEach((imgFilterButton) => {
    imgFilterButton.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
}

function renderPhotoFilter (userPhotos) {
  defaultPicturesBtn.addEventListener('click', () => {
    setFiltersActive(defaultPicturesBtn);
    const defaultPictures = userPhotos.sort((a, b) => a.id > b.id ? 1 : -1);
    setFilterDebounced(defaultPictures);
  });

  randomPicturesBtn.addEventListener('click', () => {
    setFiltersActive(randomPicturesBtn);
    shuffle(userPhotos);
    const randomPictures = userPhotos.slice(0, RANDOM_PICTURES_NUMBER);
    setFilterDebounced(randomPictures);
  });

  discussedPicturesBtn.addEventListener('click', () => {
    setFiltersActive(discussedPicturesBtn);
    const discussedPictures = userPhotos.sort((a, b) => a.comments.length > b.comments.length ? 1 : -1);
    discussedPictures.reverse();
    setFilterDebounced(discussedPictures);
  });
}

export {renderPostsList, renderPhotoFilter};
