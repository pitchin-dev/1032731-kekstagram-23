import {renderPhotoFilter, renderPostsList} from './render-pictures.js';
import {getData} from './api.js';
import {showAlert} from './utils/utils.js';
import './picture-editor.js';
import './upload.js';

getData((posts) => {
  renderPostsList(posts);
  renderPhotoFilter(posts);
},
() => showAlert('Не удалось загрузить данные!'));
