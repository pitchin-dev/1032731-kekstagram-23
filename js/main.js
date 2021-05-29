//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min >= 0 && max >= 0 ) {
    if (max < min || max === min) {
      return 'Cannot return random number. Check your max number, it must be bigger than min number or Min and max values are identical';
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  } else {
    return 'Min and max number must be positive';
  }
}

getRandomInt(1, 10);

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('test', 10);
