import $ from "jquery";
const userName = "bFart";
const baseUrl = `https://thinkful-list-api.herokuapp.com`;

const listFetch = function (...args) {
  let error;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get("content-type").includes("json")) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
};
const getElements = function () {
  return listFetch(`${baseUrl}/${userName}/bookmarks`);
};

const createElement = function (title, url, desc, rating) {
  const newElement = {
    title: title,
    url: url,
    desc: desc,
    rating: rating
  };
  return listFetch(`${baseUrl}/${userName}/bookmarks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newElement)
  });
};

const deleteElement = function(id) {
    return listFetch(`${baseUrl}/${userName}/bookmarks/${id}`, {
      method: "DELETE",
    });
}

export default {
  getElements,
  createElement,
  deleteElement
};
