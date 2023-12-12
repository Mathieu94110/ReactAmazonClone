import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { router } from "./router";
import "./assets/styles/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
console.log(process.env.REACT_APP_API_AUTH);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
