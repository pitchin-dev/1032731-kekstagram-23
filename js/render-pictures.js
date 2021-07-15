import {showFullPhoto} from './create-photo-full.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const postListFragment = document.createDocumentFragment();
let postListCopy = [];

function renderPostsList (posts) {
  postListCopy = posts;
  posts.forEach(({ url, likes, comments }) => {
    const postElement = pictureTemplate.cloneNode(true);
    postElement.querySelector('.picture__img').setAttribute('src', url);
    postElement.querySelector('.picture__likes').textContent = likes;
    postElement.querySelector('.picture__comments').textContent = comments.length;
    postListFragment.appendChild(postElement);
  });

  picturesContainer.appendChild(postListFragment);
}

picturesContainer.addEventListener('click', (e) => {
  const target = e.target;
  if (target.className === 'picture__img') {
    e.preventDefault();
    const post = postListCopy.find(({url}) => url === target.getAttribute('src'));
    showFullPhoto(post);
  }
});

export {renderPostsList};
