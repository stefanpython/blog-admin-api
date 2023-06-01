import { useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const DeletePost = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["token"]);
  const navigation = useNavigate();

  useEffect(() => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("Successfully delete post");
            navigation("/posts");
          } else {
            console.log("Error deleting post");
          }
        })
        .catch((error) => {
          throw new Error("Error occurred while deleting:", error);
        });
    } else {
      console.log("Deletion cancelled");
      navigation("/posts");
    }
  }, [id, cookies.token, navigation]);

  return null;
};

export default DeletePost;
