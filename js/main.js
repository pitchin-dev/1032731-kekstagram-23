import {renderPhotoFilter, renderPostsList} from './render-pictures.js';
import {getData} from './api.js';
import {showAlert} from './utils/utils.js';
import './picture-upload-editor.js';

getData((posts) => {
  renderPostsList(posts);
  renderPhotoFilter(posts);
},
() => showAlert('Не удалось загрузить данные!'));
