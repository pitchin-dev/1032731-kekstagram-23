import {createObjectsArray} from './create-photo/create-photo-description.js';

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

const PHOTOS_QUANTITY = 25;
const AVATARS_QUANTITY = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const COMMENTS_MIN = 0;
const COMMENTS_MAX = 15;

const posts = createObjectsArray(PHOTOS_QUANTITY);

export {NAMES, COMMENTS, PHOTOS_QUANTITY, AVATARS_QUANTITY, LIKES_MIN, LIKES_MAX, COMMENTS_MIN, COMMENTS_MAX, posts};
