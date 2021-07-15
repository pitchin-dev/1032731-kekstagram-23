import {renderPostsList} from './render-pictures.js';
import {getData} from './api.js';
import './picture-upload-editor.js';

getData((posts) => {
  renderPostsList(posts);
});
