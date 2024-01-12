'use strict';

const modalWrapper = document.querySelector('.modal-wrapper');
const modalNewJob = modalWrapper.querySelector('.modal-new-job');
const snake = modalWrapper.querySelector('.snake');
const formNewJob = modalWrapper.querySelector('.form-new-job');
const submitButton = modalWrapper.querySelector('button[type="submit"]');
const modalNewJobBodyTextCreated = modalNewJob.querySelector(
  '.modal-new-job__body p'
);
const fields = modalWrapper.querySelectorAll('.form-new-job__field');

const defaultTextSubmitButton = 'Create job';

const detailsItems = [
  {
    id: 1,
    key: 'First name',
    value: '-',
  },
  {
    id: 2,
    key: 'Last name',
    value: '-',
  },
  {
    id: 3,
    key: 'Phone',
    value: '-',
  },
  {
    id: 4,
    key: 'Email',
    value: '-',
  },
  {
    id: 5,
    key: 'Job type',
    value: '-',
  },
  {
    id: 6,
    key: 'Job source',
    value: '-',
  },
  {
    id: 7,
    key: 'Job description',
    value: '-',
  },
  {
    id: 8,
    key: 'Address',
    value: '-',
  },
  {
    id: 9,
    key: 'City',
    value: '-',
  },
  {
    id: 10,
    key: 'State',
    value: '-',
  },
  {
    id: 11,
    key: 'Zip code',
    value: '-',
  },
  {
    id: 12,
    key: 'Start date',
    value: '-',
  },
  {
    id: 13,
    key: 'Start time',
    value: '-',
  },
  {
    id: 14,
    key: 'End time',
    value: '-',
  },
];

function toggleModal() {
  modalWrapper.classList.toggle('modal-wrapper--visible');
}

function resetFormOfModal() {
  formNewJob.classList.remove('form-new-job--visible');
  submitButton.innerText = defaultTextSubmitButton;
  submitButton.classList.remove('form-new-job__button--red');
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

function setDetailsList() {
  const detailsList = document.querySelector('#details div');

  detailsList.innerHTML = `
    ${detailsItems
      .map(
        ({ key, value }) => `<div class='details__item'>${key} ${value}</div>`
      )
      .join('')}
  `;
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

      setDetailsList();

      fields.forEach((field) => {
        if (field.tagName === 'SELECT') {
          field.value = '0';
        } else {
          field.value = '';
        }
      });
    }
  });

modalNewJobBodyTextCreated.addEventListener('click', () => {
  setTimeout(() => {
    closeModal();
  }, 100);
});

setDetailsList();

function changeValueFieldById(event) {
  detailsItems.find(
    (item) => item.id === Number(event.target.dataset.fieldid)
  ).value = event.target.value;
}

fields.forEach((item) => {
  if (item.tagName !== 'SELECT') {
    item.addEventListener('input', changeValueFieldById);
  } else {
    item.addEventListener('change', changeValueFieldById);
  }
});
