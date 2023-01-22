import axios from 'axios';

type Fruits = {
    id: number
    title: string
    description: string
    image: string;
}[]

const api = "http://localhost:3004/fruits/"

const fetchCardData = (data: Fruits) => {
    data.forEach(fruit => {
        const name = fruit.title;
        const description = fruit.description;
        const image = fruit.image;
        const id = fruit.id;
        renderCard(id, name, description, image)
    });
}

const editBtnHandler = (containerEle:HTMLDivElement) => {
    containerEle.classList.contains("hide") ? 
    containerEle.classList.remove("hide") : 
    containerEle.classList.add("hide");
}

const renderCard = (id: number, name: string, description: string, image: string) => {

    const container:HTMLDivElement = document.querySelector(".container");

    const cardEl: HTMLDivElement = document.createElement("div");
    cardEl.classList.add("card");

    const btnContainerEl: HTMLDivElement = document.createElement("div");
    btnContainerEl.classList.add("container__row");

    const editBtnEl: HTMLButtonElement = document.createElement("button");
    editBtnEl.classList.add("btn", "js-edit-btn");
    editBtnEl.innerText = "Edit"

    const deleteBtnEl: HTMLButtonElement = document.createElement("button")
    deleteBtnEl.classList.add("btn", "js-delete-btn");
    deleteBtnEl.innerText = "Delete"

    const editContainerEl: HTMLDivElement = document.createElement("div")
    editContainerEl.classList.add("container__row", "edit", "hide");

    const formEl: HTMLFormElement = document.createElement("form");
    formEl.classList.add("container__form");

    const editTitleEl: HTMLInputElement = document.createElement("input");
    editTitleEl.classList.add("edit__title", "js-edit-title");
    editTitleEl.placeholder = "New title";
    
    const editDescriptionEl: HTMLTextAreaElement = document.createElement("textarea");
    editDescriptionEl.classList.add("edit_description", "js-edit-description");

    const updateBtnEl: HTMLButtonElement = document.createElement("button");
    updateBtnEl.classList.add("btn", "js-update-btn");
    updateBtnEl.innerText = "Update";

    container.appendChild(cardEl);

    cardEl.innerHTML += `
            <div class="container__row">
                <div class="card__content">
                    <div class="card__img">
                        <img src="${image}" alt="${name}">
                    </div>
                    <div class="card__text_content">
                        <span class="card__description js-card-description">
                            ${description}
                        </span>
                    </div>
                </div>
            </div>
    `
    cardEl.appendChild(btnContainerEl);
    btnContainerEl.appendChild(editBtnEl);
    btnContainerEl.appendChild(deleteBtnEl);
    cardEl.appendChild(editContainerEl);
    editContainerEl.appendChild(formEl);
    formEl.appendChild(editTitleEl);
    formEl.appendChild(editDescriptionEl);
    formEl.appendChild(updateBtnEl);

    editBtnEl.addEventListener("click", () =>
        editBtnHandler(editContainerEl)
    )

    deleteBtnEl.addEventListener("click", () => {
        confirm("Are you sure you want to delete this item?") &&
        deleteRecord(id, cardEl, container)
    })
}

















const getRecord = () => {
    axios.get(api)
    .then(response => fetchCardData(response.data))
  .catch(function (error) {
    console.log(error);
  })
}

const postRecord = (record: string) => {
    axios.post(record, {
        name: "tiger"
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}


const putRecord = (record: string) => {
    axios.put(record, {
        name: "tiger"
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

const deleteRecord = (id: number, card: HTMLDivElement, container: HTMLDivElement) => {
    axios.delete(api+id)
  .then(() => container.removeChild(card))
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

getRecord()
