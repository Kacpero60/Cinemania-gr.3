const btnMoreDetails = document.querySelector('.more-details');
const modalWindowDetails = document.getElementById('background-modal');
const btnClosedModalDetails = document.getElementById('closed-modal-details');
const photoModalDetails = document.querySelector('.photo-modal-details');

btnMoreDetails.addEventListener('click', event => {
  event.preventDefault();
  modalWindowDetails.style.display = 'flex';
  const imageDetails = document.createElement('img');
  imageDetails.src = '';
  imageDetails.className = 'image-deteils';
  console.log(imageDetails.src);
  photoModalDetails.append(imageDetails);
});

btnClosedModalDetails.addEventListener('click', event => {
  event.preventDefault();
  modalWindowDetails.style.display = 'none';
});
