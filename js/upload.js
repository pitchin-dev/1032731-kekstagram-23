const FILES_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadPictureInput = document.querySelector('#upload-file');
const editPictureModal = document.querySelector('.img-upload__overlay');
const picturePreview = editPictureModal.querySelector('.img-upload__preview img');

uploadPictureInput.addEventListener('change', () => {
  const file = uploadPictureInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILES_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      picturePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
  uploadPictureInput.blur();
});
