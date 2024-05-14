import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  //An Annotated Bibliography for East-Asian Film Studies
  const handleLogout = () => {
    logout();
  };
  return (
    <nav className="navbar">
      <Link to="/">
        <h1>An Annotated Bibliography for Sinopone Film Studies
華語電影研究書目提要 （中國大陸，台灣，香港）
华语电影研究书目提要 （中国大陆，台湾，香港）</h1>
      </Link>

      {!user && (
        <div className="notLoggedInButtons">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      {user && (
        <div className="loggedInButtons">
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/create">New Entry</Link>
            <Link to="/booleanSearch">Search</Link>
          </div>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
