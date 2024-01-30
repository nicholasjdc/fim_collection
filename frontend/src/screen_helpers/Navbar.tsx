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
      <h1>Film Studies Bibliography</h1>

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
            <Link to="/search">Search</Link>
          </div>
          <span>{user.email}</span>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
