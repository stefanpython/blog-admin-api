import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from the API endpoint
    fetch("http://localhost:3000/api/posts")
      .then((response) => response.json())
      .then((data) => {
        // Handle the response and extract the post data
        setPosts(data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="post-container">
      <h1>Blog Posts</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h1>{post.authorName}</h1>
            <p>{post.title}</p>
            <p>{post.content}</p>
            <br />
            <p>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <Link to={`/posts/${post._id}/update`}>
              <button className="edit-button">Edit Post</button>
            </Link>
            <Link to={`/posts/${post._id}/delete`}>
              <button className="delete-button">Delete</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
