import $ from "jquery";
const store = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};

const pullFilterElements = () => {
    return store.bookmarks.filter((currentEl) => currentEl.rating >= store.filter)
}

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
  addElement,
  findAndDelete,
  pullFilterElements
};
