'use strict';

const modalWrapper = document.querySelector('.modal-wrapper');
const snake = modalWrapper.querySelector('.snake');
const formNewJob = modalWrapper.querySelector('.form-new-job');

function toggleModal() {
  modalWrapper.classList.toggle('modal-wrapper--visible');
}

function resetClassListModal() {
  modalWrapper.classList.remove('modal-wrapper--visible');
  snake.classList.remove('snake--invisible');
  formNewJob.classList.remove('form-new-job--visible');
}

function closeModal() {
  toggleModal();
  resetClassListModal();
}

document.querySelector('.button--new-job').addEventListener('click', () => {
  toggleModal();

  setTimeout(() => {
    snake.classList.add('snake--invisible');

    formNewJob.classList.add('form-new-job--visible');
  }, 1000);
});

modalWrapper
  .querySelector('.modal-new-job')
  .addEventListener('click', (event) => {
    event.stopPropagation();
  });

modalWrapper.addEventListener('click', closeModal);
modalWrapper
  .querySelector('.button--close')
  .addEventListener('click', closeModal);

modalWrapper
  .querySelector('.form-new-job')
  .addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitButton = modalWrapper.querySelector('button[type="submit"]');

    submitButton.innerText = 'Request is sent';
    submitButton.classList.add('form-new-job__button--red');

    const request = await fetch(
      'https://f0ksiait.pipedrive.com/api/v1/organizations?session_token=58yz_uyzJPg4aHY9sFge49Am28-Fv02DdMueaFQtAsY&strict_mode=true'
    );

    console.log(request);
    console.dir(submitButton.innerText);
  });
