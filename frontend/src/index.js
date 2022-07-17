import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import init from "./init.jsx";
import "./assets/index.scss";
import store from "./slices/index.js";

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  const vdom = await init();
  root.render(
    <React.StrictMode>
      <Provider store={store}>{vdom}</Provider>
    </React.StrictMode>
  );
};

app();
