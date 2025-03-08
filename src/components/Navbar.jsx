// import { Link, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import "./Navbar.css";

// const Navbar = () => {
//     const { user, logout } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate("/login"); // Redirect to login after logout
//     };

//     return (
//         <nav className="navbar">
//             {user ? (
//                 <>
//                     <Link to="/">🏠 Home</Link>
//                     <div className="nav-links">
//                         <Link to="/create">➕ Create</Link>
//                         <Link to="/profile">👤 Profile</Link>
//                         <button onClick={handleLogout}>🚪 Logout</button>
//                     </div>
//                 </>
//             ) : (
//                 <div className="nav-links">
//                     {/* <Link to="/register">📝 Register</Link>
//                     <Link to="/login">🔑 Login</Link> */}
//                 </div>
//             )}
//         </nav>
//     );
// };

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <nav className={`navbar ${user ? "navbar-logged-in" : "navbar-logged-out"}`}>
      <Link to="/" className="navbar-brand">
        Social Media Feed
      </Link>
      {user && (
        <div className="nav-links">
          <Link to="/create">➕ Create</Link>
                  <Link to="/profile">👤 Profile</Link>
                  <Link to="/">🏠 Home</Link>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

