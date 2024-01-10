'use strict';

const buttonNewJob = document.querySelector('.button--new-job');
const buttonClose = document.querySelector('.button--close');
const snake = document.querySelector('.snake');

function toggleModal() {
  document
    .querySelector('.modal-new-job')
    .classList.toggle('modal-new-job--visible');
}

buttonNewJob.addEventListener('click', () => {
  toggleModal();

  setTimeout(() => {
    snake.classList.add('snake--invisible');
  }, 3000);
});

buttonClose.addEventListener('click', () => {
  toggleModal();
  snake.classList.remove('snake--invisible');
});
