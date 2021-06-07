//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0) {
    return 'Cannot return random numbers. Min and max number must be positive';
  }

  if (max < min || max === min) {
    return 'Cannot return random number. Check your max number, it cannot be less or identical to min number';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 10);

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('test', 10);

const NAMES = [
  'Павел',
  'Александр',
  'Алексей',
  'Николай',
  'Пётр',
  'Виталий',
  'Анна',
  'Анастасия',
  'Ирина',
  'Ольга',
  'Ксения',
  'Алина',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const AVATARS_QUANTITY = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;

function createObjectsArray(quantity) {
  const objectsArray = [];
  let commentsCounter = 0;

  function getRandomArrElement(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  }

  function createCommentSection() {
    return {
      id: commentsCounter += 1,
      avatar: `img/avatar-${getRandomInt(1, AVATARS_QUANTITY)}`,
      message: getRandomInt(1,2) > 1 ? `${getRandomArrElement(COMMENTS)}. ${getRandomArrElement(COMMENTS)}` : getRandomArrElement(COMMENTS),
      name: getRandomArrElement(NAMES),
    };
  }

  for (let index = 0; index < quantity; index++) {
    const obj = {
      id: index + 1,
      url: `photos/${index + 1}.jpg`,
      description: `Тестовое описание фотографии номер ${index + 1}`,
      likes: getRandomInt(LIKES_MIN, LIKES_MAX),
      comments: new Array(getRandomInt(1, 5)).fill(null).map(() => createCommentSection()),
    };
    objectsArray.push(obj);
  }
  return objectsArray;
}

createObjectsArray(25);
