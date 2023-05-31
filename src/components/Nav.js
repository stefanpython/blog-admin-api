import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useCookies } from "react-cookie";

const Nav = () => {
  const [cookies] = useCookies(["token"]);
  const isLoggedIn = !!cookies.token; // Check if token exists

  return (
    <nav className="nav-container">
      <ul className="nav-list">
        <li>
          <Link to="/" className="nav-link">
            <h1 className="blog-logo">Blog Admin</h1>
          </Link>
        </li>
        {isLoggedIn && (
          <li className="create-link">
            <Link to="/posts/create">Create Post</Link>
          </li>
        )}

        {isLoggedIn && (
          <li className="logout-btn">
            <Logout />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
