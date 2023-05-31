import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [token, setToken] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from cookies
    setToken("token", "", { path: "/" });

    // Redirect to login page
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
