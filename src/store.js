import $ from "jquery";
const store = {
  bookmarks: [],
};

const pullElements = function () {
  return store.bookmarks;
};
const findById = function (id) {
  return store.bookmarks.find((currentItem) => currentItem.id === id);
};
const addElement = function (element) {
  store.bookmarks.push(element);
};
const findAndDelete = function (id) {
  store.bookmarks = store.bookmarks.filter((currentEl) => currentEl.id !== id);
};

export default {
  store,
  findById,
  pullElements,
  addElement,
  findAndDelete,
};
