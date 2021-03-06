import $ from "jquery";
import api from "./api";
import store from "./store";

const generateBookmarkElement = function (element) {
  let elementView = `<div class="element" data-item-id="${element.id}">
                              <h3>${element.title}</h3><h4>Rate: ${element.rating}</h4>
                              <button type="button" name="expand" class="expand">+</button>
                          </div>`;
  if (element.expanded === true) {
    elementView = `<div class="element" id="elementEx" data-item-id="${element.id}">
                         <div class="titleHead">
                           <h3>${element.title}</h3>
                           <button class="delete">Delete</button>
                         </div>
                         <div class="linkContainer">
                            <a href="${element.url}">Visit Site</a>
                            <h4>Rate ${element.rating}</h4>
                          </div>
                            <p>${element.desc}</p>
                            <button class="condense" type="button" name="condense">-</button>
                         </div>`;
  }
  return elementView;
};

const generateBookmarkForm = function () {
  if (store.store.adding === true) {
    return `<div class="form">
          <form id="addBookmarkForm">
                <div class="newBookmark">
                  <label for="titleName"> Title:</label>
                  <input type="text" name="titleName" class="titleName" required>
                  <label for="bookmarkLink">URL:</label>
                  <input type="url" placeholder="https://www.domain.com" value="https://www." name="bookmarkLink" class="bookmarkLink" required>
                </div>
                <div class="rating">
                <p>Rating:
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label for="star5" title="text">5stars</label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label for="star4" title="text">4stars</label>
                  <input type="radio" id="star3" name="rate" value="3" checked/>
                  <label for="star3" title="text">3stars</label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label for="star2" title="text">2stars</label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label for="star1" title="text">1star</label></p>
                </div>
                <div class="description">
                  <label for="description">Description:</label>
                  <textarea id="txtarea" cols="25" rows="6" type="text" name="textbox" placeholder="Enter Text Here">No description</textarea>
                </div>
                <div id="formBtn">
                    <button type="submit" name="create" id="createBtn">Create</button>
                    <button id="cancel" type="reset" name="cancel">Cancel</button>
                </div>
          </form>
      </div>`;
  } else {
    return "";
  }
};
const generateBookmarkElementsString = function (elements) {
  const elementString = elements.map((element) =>
    generateBookmarkElement(element)
  );
  return elementString.join("");
};

const getElementId = function (element) {
  return $(element).closest(".element").data("item-id");
};

const handleNewButtonClick = function () {
  $(".buttons").on("click", ".addElement", (event) => {
    event.preventDefault();
    store.store.adding = true;
    render();
  });
};

const handleCancelButtonClick = function () {
  $("body").on("click", "#cancel", (e) => {
    store.store.adding = false;
    render();
  });
};

const handleExpandClick = function () {
  $("body").on("click", ".expand", (e) => {
    e.preventDefault();
    let id = getElementId(e.currentTarget);
    let element = store.findById(id);
    element.expanded = true;
    render();
  });
};
const handleCollapseClick = function () {
  $("body").on("click", ".condense", (e) => {
    e.preventDefault();
    let id = getElementId(e.currentTarget);
    let element = store.findById(id);
    element.expanded = false;
    render();
  });
};

const handleCreateBtn = function () {
  $("body").on("submit", "#addBookmarkForm", (e) => {
    e.preventDefault();
    let newElementTitle = $(".titleName").val();
    let newElementUrl = $(".bookmarkLink").val();
    let newRating = $("input[name='rate']:checked").val();
    let newDesc = $("#txtarea").val();
    console.log(newDesc)
    api
      .createElement(newElementTitle, newElementUrl, newDesc, newRating)
      .then((newElement) => {
        store.addElement(newElement);
        store.store.adding = false;
        render();
      })
      .catch((error) => {
        console.log(error);
        store.store.setError(error.message);
        renderError();
      });
  });
};

const handleDeleteBtn = function () {
  $("body").on("click", ".delete", (e) => {
    e.preventDefault();
    const id = getElementId(e.currentTarget);
    api
      .deleteElement(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        console.log(error);
        store.store.setError(error.message);
        renderError();
      });
  });
};

const handleFilter = function () {
  $(".container").on("change", "#filterBy", (e) => {
    e.preventDefault();
    store.store.filter = $("#filterBy").val();
    render();
  });
};

const render = function () {
  let elements = store.pullFilterElements(store.store.filter);
  const bookmarkElementsString =
    generateBookmarkForm() + generateBookmarkElementsString(elements);
  $(".list").html(bookmarkElementsString);
};

const bindEventListeners = function () {
  handleNewButtonClick();
  handleCancelButtonClick();
  handleExpandClick();
  handleCollapseClick();
  handleCreateBtn();
  handleDeleteBtn();
  handleFilter();
};

export default {
  render,
  bindEventListeners,
  handleCreateBtn,
};
