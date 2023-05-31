import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform the create post request
    fetch("http://localhost:3000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful post creation
        console.log("Post created:", data);
        navigate("/posts");
      })
      .catch((error) => {
        console.error("Error creating post: ", error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-form">
        <h1>Create Post</h1>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            className="create-input"
            type="text"
            id="title"
            name="title"
            value={post.title}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            className="create-input"
            id="content"
            name="content"
            cols="30"
            rows="10"
            value={post.content}
            onChange={handleInputChange}
          />
        </div>

        <button className="createpost-btn" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
