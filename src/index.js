import $ from "jquery";
import templates from "./templates";
import store from "./store";

import "./index.css";
function main() {
  templates.bindEventListeners();
  templates.render();
}

$(main);
