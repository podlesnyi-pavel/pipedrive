'use strict';

const modalWrapper = document.querySelector('.modal-wrapper');
const modalNewJob = modalWrapper.querySelector('.modal-new-job');
const snake = modalWrapper.querySelector('.snake');
const formNewJob = modalWrapper.querySelector('.form-new-job');
const submitButton = modalWrapper.querySelector('button[type="submit"]');
const modalNewJobBodyTextCreated = modalNewJob.querySelector(
  '.modal-new-job__body p'
);

const defaultTextSubmitButton = 'Create job';

function toggleModal() {
  modalWrapper.classList.toggle('modal-wrapper--visible');
}

function resetFormOfModal() {
  formNewJob.classList.remove('form-new-job--visible');
  submitButton.innerText = defaultTextSubmitButton;
}

function resetModal() {
  modalWrapper.classList.remove('modal-wrapper--visible');
  snake.classList.remove('snake--invisible');
  resetFormOfModal();
  // modalNewJob.attributeStyleMap.clear(); // not support firefox
  modalNewJob.style.height = '';
  modalNewJob.style.width = '';

  modalNewJobBodyTextCreated.classList.remove(
    'modal-new-job__body-text-created--visible'
  );
}

function closeModal() {
  toggleModal();
  resetModal();
}

document.querySelector('.button--new-job').addEventListener('click', () => {
  toggleModal();

  setTimeout(() => {
    snake.classList.add('snake--invisible');
    formNewJob.classList.add('form-new-job--visible');
  }, 1000);
});

modalNewJob.addEventListener('click', (event) => {
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

    modalNewJob.style.height = modalNewJob.offsetHeight + 'px';
    modalNewJob.style.width = modalNewJob.offsetWidth + 'px';
    // modalNewJob.attributeStyleMap.set('height', CSS.px(modalNewJob.offsetHeight)); // not support firefox
    // modalNewJob.attributeStyleMap.set('width', CSS.px(modalNewJob.offsetWidth)); // not support firefox

    submitButton.innerText = 'Request is sent';
    submitButton.classList.add('form-new-job__button--red');

    const data = {};
    const fields = modalWrapper.querySelectorAll('.form-new-job__field');

    fields.forEach(({ name, value }) => {
      data[name] = value;
    });

    try {
      const response = await fetch(
        'https://f0ksiait.pipedrive.com/api/v1/organizations?session_token=58yz_uyzJPg4aHY9sFge49Am28-Fv02DdMueaFQtAsY&strict_mode=true',
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Error');
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      // некоторые части написаны в finally, из-за не работабщего запроса
      resetFormOfModal();

      modalNewJobBodyTextCreated.classList.add(
        'modal-new-job__body-text-created--visible'
      );

      fields.forEach((field) => {
        field.value = '';
      });
    }
  });

modalNewJobBodyTextCreated.addEventListener('click', () => {
  setTimeout(() => {
    closeModal();
  }, 100);
});

// const detailsInfo = [
//   {
//     key: 'First name',
//     value:
//   },
// ];
