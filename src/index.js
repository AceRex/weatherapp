import React from "react";
import ReactDOM from "react-dom/client";
import "./output.css";
import App from "./App.tsx";
import store from "./redux/store.tsx";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
