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

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

export {getRandomInt, checkStringLength};