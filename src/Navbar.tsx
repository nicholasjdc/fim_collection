import { Link } from "react-router-dom";

const Navbar = () => {
    //An Annotated Bibliography for East-Asian Film Studies
    return (  
        <nav className="navbar">
            <h1>Film Studies Bibliography</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/create">New Entry</Link>
                <Link to="/search">Advanced Search</Link>

            </div>
        </nav>
    );
}
 
export default Navbar;