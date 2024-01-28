import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
    const {logout} = useLogout()

    //An Annotated Bibliography for East-Asian Film Studies
    const handleLogout = () =>{
        logout()
    }
    return (  
        <nav className="navbar">
            <h1>Film Studies Bibliography</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Entry</Link>
                <Link to="/search">Search</Link>
               
            </div>
            <div className = "notLoggedInButtons">
            <Link to ="/login">Login</Link>
                <Link to ="/signup">Sign Up</Link>
            </div>
            <div className="loggedIn Buttons">
                <button onClick={handleLogout}>Log Out</button>
            </div>
        </nav>
    );
}
 
export default Navbar;