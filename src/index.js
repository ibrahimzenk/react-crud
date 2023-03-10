import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./store";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
// import { productSlice } from "./store/productSlice";
import { patientSlice } from "./store/patientSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ApiProvider api={patientSlice}>
      <App />
    </ApiProvider>
  </Provider>
);
