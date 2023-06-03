import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const DeleteComment = () => {
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://fine-pink-narwhal-coat.cyclic.app/api/posts/${id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments || []);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setError("Failed to fetch comments");
      });
  }, [id, cookies.token]);

  const handleDelete = (commentId) => {
    fetch(
      `https://fine-pink-narwhal-coat.cyclic.app/api/posts/${id}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment._id !== commentId)
          );
          setSuccess(true);
        } else {
          throw new Error("Failed to delete comment");
        }
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
        setError("Failed to delete comment");
      });
  };

  const handleDeleteAll = () => {
    fetch(
      `https://fine-pink-narwhal-coat.cyclic.app/api/posts/${id}/comments`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          setComments([]);
          console.log("Successfully deleted all comments.");
        } else {
          throw new Error("Failed to delete all comments");
        }
      })
      .catch((error) => {
        console.error("Error deleting all comments:", error);
      });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="delete-comment-container">
      <h1>Comments</h1>
      {comments.length !== 0 && (
        <button onClick={handleDeleteAll}>Delete All</button>
      )}

      {comments.length === 0 ? (
        <p>No comments found</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment._id}>
              <p>{comment.user}</p>
              <p>{comment.content}</p>
              <button onClick={() => handleDelete(comment._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      {success && <p>Successfully deleted comment!</p>}
    </div>
  );
};

export default DeleteComment;
