import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "../App.css";
// import App from "../App";
import Nav from "./Nav";
import Posts from "./Posts";
import Login from "./Login";
import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";

const RouterSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:id/update" element={<UpdatePost />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterSwitch;
