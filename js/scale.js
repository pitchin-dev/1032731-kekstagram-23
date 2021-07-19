const SCALE_VALUE_MIN = 25;
const SCALE_VALUE_MAX = 100;
const SCALE_VALUE_CHANGE = 25;

const editPictureModal = document.querySelector('.img-upload__overlay');
const smallScaleControl = editPictureModal.querySelector('.scale__control--smaller');
const bigScaleControl = editPictureModal.querySelector('.scale__control--bigger');
const scaleControlValue = editPictureModal.querySelector('.scale__control--value');
const picturePreview = editPictureModal.querySelector('.img-upload__preview img');

const setZoomIn = (value) => {
  if (value < SCALE_VALUE_MAX) {
    const scaleValue = value + SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const setZoomOut = (value) => {
  if (value > SCALE_VALUE_MIN) {
    const scaleValue = value - SCALE_VALUE_CHANGE;
    scaleControlValue.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${(scaleValue)/100})`;
  }
};

const onPictureScaleChange = ({ target }) => {
  const value = parseInt(scaleControlValue.value, 10);

  if (target === smallScaleControl) {
    return setZoomOut(value);
  }

  if (target === bigScaleControl) {
    return setZoomIn(value);
  }
};

export {onPictureScaleChange};
