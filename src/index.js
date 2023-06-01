import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteSwitch from "./components/RouteSwitch";
import { LayoutProvider } from "./components/LayoutContext";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <CookiesProvider>
      <LayoutProvider>
        <RouteSwitch />
      </LayoutProvider>
    </CookiesProvider>
  </>
);
