import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "../App.css";
// import App from "../App";
import Nav from "./Nav";
import Posts from "./Posts";
import Login from "./Login";

const RouterSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterSwitch;
