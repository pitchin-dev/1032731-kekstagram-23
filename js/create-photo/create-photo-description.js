import {NAMES, COMMENTS, AVATARS_QUANTITY, LIKES_MIN, LIKES_MAX} from '../data.js';
import {getRandomInt} from '../utils/utils.js';

function createObjectsArray(quantity) {
  const objectsArray = [];
  let commentsCounter = 0;

  function getRandomArrElement(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  }

  function createCommentSection() {
    return {
      id: commentsCounter += 1,
      avatar: `img/avatar-${getRandomInt(1, AVATARS_QUANTITY)}.svg`,
      message: getRandomInt(1,2) > 1 ? `${getRandomArrElement(COMMENTS)}. ${getRandomArrElement(COMMENTS)}` : getRandomArrElement(COMMENTS),
      name: getRandomArrElement(NAMES),
    };
  }

  for (let i = 0; i < quantity; i++) {
    const obj = {
      id: i + 1,
      url: `photos/${i + 1}.jpg`,
      description: `Тестовое описание фотографии номер ${i + 1}`,
      likes: getRandomInt(LIKES_MIN, LIKES_MAX),
      comments: new Array(getRandomInt(1, 5)).fill(null).map(() => createCommentSection()),
    };
    objectsArray.push(obj);
  }
  return objectsArray;
}

export {createObjectsArray};
