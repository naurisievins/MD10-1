import axios from 'axios';

type Fruits = {
    id: number
    title: string
    description: string
    image: string;
}[]

const api = 'http://localhost:3004/fruits/';

const postRecord = (cardTitle: string, cardDescription: string, cardImg: string) => {
  axios.post(api, {
    title: cardTitle,
    description: cardDescription,
    image: cardImg || `https://picsum.photos/id/${Math.floor(Math.random() * 1070)}/240/200`,
  })
    .catch((error) => {
      console.log(error);
    });
};

const patchRecord = (id: number, title: string, description: string, img?: string) => {
  axios.patch(api + id, { title, description, image: img })
    .catch((error) => {
      console.log(error);
    });
};
const deleteRecord = (id: number, card: HTMLDivElement, container: HTMLDivElement) => {
  axios.delete(api + id)
    .then(() => container.removeChild(card))
    .catch((error) => {
      console.log(error);
    });
};

const editBtnHandler = (formEl:HTMLFormElement, editBtn:HTMLButtonElement) => {
  formEl.classList.contains('hide')
    ? formEl.classList.remove('hide') + (editBtn.innerText = 'Cancel')
    : formEl.classList.add('hide') + (editBtn.innerText = 'Edit');
};

const renderCard = (id: number, name: string, description: string, image: string) => {
  const container:HTMLDivElement = document.querySelector('.container');

  const cardEl: HTMLDivElement = document.createElement('div');
  cardEl.classList.add('card');

  const btnContainerEl: HTMLDivElement = document.createElement('div');
  btnContainerEl.classList.add('container__row');

  const editBtnEl: HTMLButtonElement = document.createElement('button');
  editBtnEl.classList.add('btn', 'js-edit-btn');
  editBtnEl.innerText = 'Edit';

  const deleteBtnEl: HTMLButtonElement = document.createElement('button');
  deleteBtnEl.classList.add('btn', 'js-delete-btn');
  deleteBtnEl.innerText = 'Delete';

  const formEl: HTMLFormElement = document.createElement('form');
  formEl.classList.add('container__form', 'hide');

  const editTitleEl: HTMLInputElement = document.createElement('input');
  editTitleEl.classList.add('edit__title', 'js-edit-title');
  editTitleEl.value = name;
  editTitleEl.placeholder = 'Title';

  const editDescriptionEl: HTMLTextAreaElement = document.createElement('textarea');
  editDescriptionEl.classList.add('edit_description', 'js-edit-description');
  editDescriptionEl.value = description;
  editDescriptionEl.placeholder = 'Description';

  const editImgEl: HTMLInputElement = document.createElement('input');
  editImgEl.classList.add('edit_img', 'js-edit-img');
  editImgEl.placeholder = 'New image link';

  const updateBtnEl: HTMLButtonElement = document.createElement('button');
  updateBtnEl.classList.add('btn', 'js-update-btn');
  updateBtnEl.innerText = 'Update';

  container.appendChild(cardEl);

  cardEl.innerHTML += `
    <div class="container__row">
      <div class="card__img">
          <img src="${image}" alt="${name}">
      </div>
    </div>
    <div class="container__row">
      <span class="title__text">${name}</span>
      <div class="card__text_content">
          <span class="card__description js-card-description">
              ${description}
          </span>
      </div>
    </div>
  `;
  if (id > 3) {
    cardEl.appendChild(btnContainerEl);
    btnContainerEl.appendChild(editBtnEl);
    btnContainerEl.appendChild(deleteBtnEl);
    cardEl.appendChild(formEl);
    formEl.appendChild(editTitleEl);
    formEl.appendChild(editDescriptionEl);
    formEl.appendChild(editImgEl);
    formEl.appendChild(updateBtnEl);

    editBtnEl.addEventListener('click', () => {
      editBtnHandler(formEl, editBtnEl);
    });

    deleteBtnEl.addEventListener('click', () => {
      confirm('Are you sure you want to delete this item?')
      && deleteRecord(id, cardEl, container);
    });

    updateBtnEl.addEventListener('click', () => {
      if (editImgEl.value) {
        patchRecord(id, editTitleEl.value, editDescriptionEl.value, editImgEl.value);
      } else {
        patchRecord(id, editTitleEl.value, editDescriptionEl.value);
      }
    });
  }
};

const fetchCardData = (data: Fruits) => {
  data.forEach((fruit) => {
    const name = fruit.title;
    const { description } = fruit;
    const { image } = fruit;
    const { id } = fruit;
    renderCard(id, name, description, image);
  });
};

const getRecord = () => {
  axios.get(api)
    .then((response) => fetchCardData(response.data))
    .catch((error) => {
      console.log(error);
    });
};

const addNewItem = () => {
  const addItemBtn:HTMLButtonElement = document.querySelector('.js-add-item-btn');
  const addBtn:HTMLButtonElement = document.querySelector('.js-add-btn');
  const cancelBtn:HTMLButtonElement = document.querySelector('.js-cancel-item-btn');
  const addForm:HTMLFormElement = document.querySelector('.js-add-form');
  const cardTitle:HTMLInputElement = document.querySelector('.js-add-card-title');
  const cardImg:HTMLInputElement = document.querySelector('.js-add-card-img');
  const cardDescription:HTMLTextAreaElement = document.querySelector('.js-add-card-description');

  addItemBtn.addEventListener('click', () => {
    addForm.classList.remove('hide');
    addItemBtn.classList.add('hide');
  });

  cancelBtn.addEventListener('click', () => {
    addForm.classList.add('hide');
    addItemBtn.classList.remove('hide');
  });

  addBtn.addEventListener('click', () => {
    postRecord(cardTitle.value, cardDescription.value, cardImg.value);
  });
};

getRecord();
addNewItem();
