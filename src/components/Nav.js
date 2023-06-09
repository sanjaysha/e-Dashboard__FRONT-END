import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("user");
    navigate("/signup");
  };
  return (
    <div>
      <img className="logo" src="logo192.png" alt="logo" />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Product</Link>
          </li>
          {/* <li>
            <Link to="/update">Update Product</Link>
          </li> */}
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/signup" onClick={handleLogout}>
              Logout ({(JSON.parse(auth).name)})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
