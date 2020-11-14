import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import Root from "./root/Root";
import { BrowserRouter, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={Root} />
  </BrowserRouter>,
  document.getElementById("root")
);
