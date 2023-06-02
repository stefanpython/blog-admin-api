import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "../App.css";
// import App from "../App";
import Nav from "./Nav";
import Posts from "./Posts";
import Login from "./Login";
import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import DeletePost from "./DeletePost";
import DeleteComment from "./DeleteComment";

const RouterSwitch = () => {
  return (
    <HashRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/create" element={<CreatePost />} />
        <Route path="/posts/:id/update" element={<UpdatePost />} />
        <Route path="/posts/:id/delete" element={<DeletePost />} />
        <Route
          path="/posts/:id/comments/:commentId"
          element={<DeleteComment />}
        />
      </Routes>
    </HashRouter>
  );
};

export default RouterSwitch;
