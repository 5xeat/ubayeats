import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import App from "./app";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <BrowserRouter forceRefresh={true}>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
});
