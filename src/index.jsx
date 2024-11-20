import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "video-react/dist/video-react.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
