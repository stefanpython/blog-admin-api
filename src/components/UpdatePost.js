import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams, useNavigate } from "react-router-dom";
import DeleteComment from "./DeleteComment";

const UpdatePost = () => {
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch data for a single post to prepopulate update form
  useEffect(() => {
    fetch(`https://fine-pink-narwhal-coat.cyclic.app/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data.post);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });
  }, [id]);

  // Handle form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Send updated post to the Api
    fetch(`https://fine-pink-narwhal-coat.cyclic.app/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({
        content: post.content,
        title: post.title,
        authorName: post.authorName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(true);
          // Redirect admin to posts after successful update in 3 sec
          setTimeout(() => {
            navigate("/posts");
          }, 3000);
        } else {
          throw new Error("Failed to update post");
        }
      })
      .catch((error) => {
        console.error("Error updating post:", error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-form">
      <form onSubmit={handleSubmit}>
        <h1>Update Post</h1>
        <div className="form-group">
          <label htmlFor="authorName">Author:</label>
          <input
            className="update-input"
            type="text"
            id="authorName"
            name="authorName"
            value={post.authorName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            className="update-input"
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
            className="update-input"
            id="content"
            name="content"
            cols="30"
            rows="10"
            value={post.content}
            onChange={handleInputChange}
          />
        </div>

        <button className="update-btn" type="submit">
          Update
        </button>
      </form>

      {success && <p>Successfully updated! Redirecting to main in 3s ...</p>}

      <DeleteComment />
    </div>
  );
};

export default UpdatePost;
