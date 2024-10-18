import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ToastContainer } from "react-toastify";
import "tailwindcss/tailwind.css";

createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
      style={{ bottom: "10px" }}
    />
  </>
);
