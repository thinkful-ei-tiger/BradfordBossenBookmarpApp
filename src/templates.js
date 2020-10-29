import $ from 'jquery';
import api from './api'
import store from './store';

const generateBookmarkElement = function(element) {
    let elementView = `<div class="initialView" id="${element.id}">
                              <h3>${element.title}</h3><h4>${element.rating}</h4>
                          </div>`
    if (element.expanded === true) {
        elementView = `<div class="expandedView" id="${element.id}">
                         <div class="titleHead">
                           <h3>${element.title}</h3>
                           <button class="delete">Delete</button>
                         </div>
                         <div class="linkContainer">
                            <a href="${element.url}">Visit Site</a>
                            <h4>${element.rating}</h4>
                         </div>
                            <p>${element.description}</p>
                         </div>`;
    }
    return elementView
};
const generateBookmarkElementsString = function(elements) {
      const elementString = elements.map((element) => generateBookmarkElement(element));
      return elementString.join("");
}
    


const render = function() {
    let elements = store.pullElements();
    const bookmarkElementsString = generateBookmarkElementsString(elements);
    console.log(bookmarkElementsString);
    $('.list').html(bookmarkElementsString);

}

export default {
  render
};