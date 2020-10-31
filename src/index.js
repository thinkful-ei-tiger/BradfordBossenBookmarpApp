import $ from "jquery";
import templates from "./templates";
import store from "./store";

import "./index.css";
import api from "./api";
function main() {
  api.getElements()
    .then((elements) => {
        elements.forEach((element) => {
            store.addElement(element)
        });
        templates.render();
    });
  templates.bindEventListeners();
  templates.render();
}

$(main);