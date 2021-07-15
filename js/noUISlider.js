const FILTERS = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const sliderBar = document.querySelector('.effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');
const picturePreview = document.querySelector('.img-upload__preview img');
const {CHROME, SEPIA, MARVIN, PHOBOS, HEAT} = FILTERS;

const SLIDER_OPTIONS = {
  [CHROME]: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  [SEPIA]: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  [MARVIN]: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  [PHOBOS]: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  [HEAT]: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
};

function createSlider () {
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectValueInput.value = 100;
  slider.classList.add('hidden');
}

function removeEffectOfPicture () {
  picturePreview.removeAttribute('class');
  picturePreview.style.removeProperty('filter');
  effectValueInput.value = '';
  slider.classList.add('hidden');
}

function addPictureFilterStyle (effect, value) {
  switch (effect) {
    case CHROME:
      picturePreview.style.filter = `grayscale(${value})`;
      break;
    case SEPIA:
      picturePreview.style.filter = `sepia(${value})`;
      break;
    case MARVIN:
      picturePreview.style.filter = `invert(${value}%)`;
      break;
    case PHOBOS:
      picturePreview.style.filter = `blur(${value}px)`;
      break;
    case HEAT:
      picturePreview.style.filter = `brightness(${value})`;
      break;
    default:
      picturePreview.style.filter = 'none';
      break;
  }
}

function changeSliderOptions (effectName) {
  if (effectName in SLIDER_OPTIONS) {
    slider.classList.remove('hidden');
    slider.noUiSlider.off('update');
    slider.noUiSlider.updateOptions(SLIDER_OPTIONS[effectName]);
    slider.noUiSlider.on('update', (values, handle) => {
      effectValueInput.value = `${values[handle]}`;
      addPictureFilterStyle(effectName, values[handle]);
    });
  } else {
    removeEffectOfPicture();
    sliderBar.style.display = 'none';
  }
}

function addEffectOfPicture ({ target: { value, type } }) {
  if(type === 'radio') {
    sliderBar.style.display = 'block';
    picturePreview.className = `effects__preview--${value}`;
    changeSliderOptions(value);
  }
}

export {createSlider, addEffectOfPicture, removeEffectOfPicture, slider};
