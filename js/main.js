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

function createObjectsArray(quantity) {
  const objectsArray = [];
  let commentsCounter = 0;
  const names = [
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
  const comments = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];

  function createCommentSection() {
    return {
      id: commentsCounter += 1,
      avatar: `img/avatar-${getRandomInt(1, 6)}`,
      message: comments[getRandomInt(0, 5)],
      name: names[getRandomInt(0, 11)],
    };
  }

  for (let index = 0; index < quantity; index++) {
    const obj = {
      id: index + 1,
      url: `photos/${index + 1}.jpg`,
      description: `Тестовое описание фотографии номер ${index + 1}`,
      likes: getRandomInt(15, 200),
      comments: new Array(getRandomInt(1, 5)).fill(null).map(() => createCommentSection()),
    };
    objectsArray.push(obj);
  }
  return objectsArray;
}

createObjectsArray(25);
