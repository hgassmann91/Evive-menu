import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import appReducer from "./store";
import "../public/style.css";

render(
  <Provider store={appReducer}>
    <div>Hello World!</div>
    {/* <Routes /> */}
  </Provider>,
  document.getElementById("index") // make sure this is the same as the id of the div in your index.html
);
