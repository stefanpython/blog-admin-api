import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteSwitch from "./components/RouteSwitch";
import { LayoutProvider } from "./components/LayoutContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LayoutProvider>
      <RouteSwitch />
    </LayoutProvider>
  </React.StrictMode>
);
