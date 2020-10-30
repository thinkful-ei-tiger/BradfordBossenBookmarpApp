import $ from 'jquery';
import api from './api'
import store from './store';

const generateBookmarkElement = function(element) {

    let elementView = `<div class="element" data-item-id="${element.id}">
                              <h3>${element.title}</h3><h4>Rating: ${element.rating}</h4>
                              <button type="button" name="expand" class="expand">+</button>
                          </div>`
    if (element.expanded === true) {
        elementView = `<div class="element" id="elementEx" data-item-id="${element.id}">
                         <div class="titleHead">
                           <h3>${element.title}</h3>
                           <button class="delete">Delete</button>
                         </div>
                         <div class="linkContainer">
                            <a href="${element.url}">Visit Site</a>
                            <h4>Rating: ${element.rating}</h4>
                         </div>
                            <p>${element.description}</p>
                            <button class="condense" type="button" name="condense">-</button>
                         </div>`;
    }
    return elementView
};

const generateBookmarkForm = function() {
  if(store.store.adding === true) {
    return `<div class="form">
          <form id="addBookmarkForm">
                <div class="newBookmark">
                  <label for="titleName"> Title:</label>
                  <input type="text" name="titleName" class="titleName" required>
                  <label for="bookmarkLink">URL:</label>
                  <input type="text" name="bookmarkLink" class="bookmarkLink"required>
                </div>
                <p>Rating:<input type="radio" id="star5" name="rate" value="5" />
                  <label for="star5" title="text">5stars</label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label for="star4" title="text">4stars</label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label for="star3" title="text">3stars</label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label for="star2" title="text">2stars</label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label for="star1" title="text">1star</label></p>
                <div class="description">
                  <label for="description">Description:</label>
                  <textarea id="txtarea" cols="45" rows="6" id="textbox" type="text" name="textbox" onkeypress="changeHead()" placeholder="Enter Text Here"></textarea>
                </div>
                <div id="formBtn">
                    <button type="submit" name="create">Create</button>
                    <button id="cancel" type="reset" name="cancel">Cancel</button>
                </div>
          </form>
      </div>`;
     }
     else {return ''}
    }
const generateBookmarkElementsString = function(elements) {
      const elementString = elements.map((element) => generateBookmarkElement(element));
      return elementString.join("");
}


const getElementId = function(element) {
  return $(element).closest('.element').data('item-id');
}
 
const handleNewButtonClick = function() {
  $('.buttons').on('click', '.addElement', (event) => {
    event.preventDefault();
    store.store.adding = true;
    render();
  });
}

const handleCancelButtonClick = function (){
  $('body').on('click', '#cancel', (e) => {
    store.store.adding = false;
    render();
  })
}

const handleExpandClick = function (){
  $('body').on('click', '.expand', (e) => {
    e.preventDefault();
    let id = getElementId(e.currentTarget);
    let element = store.findById(id)
    element.expanded = true;
    render()
  })
}
const handleCollapseClick = function () {
  $('body').on("click", ".condense", (e) => {
    e.preventDefault();
    let id = getElementId(e.currentTarget);
    console.log(id)
    let element = store.findById(id);
    element.expanded = false;
    render();
  });
};


const render = function() {
    let elements = store.pullElements();
    const bookmarkElementsString = generateBookmarkForm() + generateBookmarkElementsString(elements);
    $('.list').html(bookmarkElementsString);

}

const bindEventListeners = function () {
  handleNewButtonClick();
  handleCancelButtonClick();
  handleExpandClick();
  handleCollapseClick();
}



export default {
  render,
  bindEventListeners
};