//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if(min >= 0 && max >= 0) {
    if (max < min) {
      console.log('Cannot return random number. Check your max number, it must be bigger than min number');
      return false;
    } else if (max === min) {
      console.log('Min and max values are identical');
      return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  } else {
    console.log('Min and max number must be positive');
    return false;
  }
}

getRandomInt(1, 10);

function checkStringLength(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

checkStringLength('test', 10);
