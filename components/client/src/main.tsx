import React from "react";
import { Buffer } from "buffer";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

if (typeof (window as any).global === "undefined") {
  (window as any).global = window;
}
(window as any).Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
