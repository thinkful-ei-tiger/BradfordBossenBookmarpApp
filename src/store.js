import $ from "jquery";
const store = {
  bookmarks: [
    {
      id: "x56w",
      title: "Title 1",
      rating: 3,
      url: "http://www.title1.com",
      description: "lorem ipsum dolor sit",
      expanded: false,
    },
    {
      id: "6ffw",
      title: "Title 2",
      rating: 5,
      url: "http://www.title2.com",
      description: "dolorum tempore deserunt",
      expanded: false,
    },
  ],
  adding: false,
  error: null,
  filter: 0,
};

const pullElements = function () {
  return store.bookmarks;
};
const findById = function (id) {
  return store.bookmarks.find((currentItem) => currentItem.id === id);
};
const addElement = function(element) {
  store.bookmarks.push(element);
};
const findAndDelete = function(id) {
  store.bookmarks = store.bookmarks.filter((currentEl) => currentEl.id !== id)
}

export default {
  store,
  findById,
  pullElements,
  addElement,
  findAndDelete
};
