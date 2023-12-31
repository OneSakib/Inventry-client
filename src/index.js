import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/index.css";
import Layouts from "./layouts/Layouts";
import reportWebVitals from "./reportWebVitals";
// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Loader
import Loader from "./components/Loader";
// Confirm
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Layouts />
    <ToastContainer />
    <Loader />
  </React.StrictMode>
);

reportWebVitals();
