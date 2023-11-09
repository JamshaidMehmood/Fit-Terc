import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "../Hooks/useLogout";
import useAuthenticationContextHook from "../Hooks/useAuthenticationContextHook";

const Navbar = () => {
  const { logOut } = useLogout();
  const { user } = useAuthenticationContextHook();

  const onClickHandler = () => {
    logOut();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Workouts
        </Link>
        <ul className="nav-links">
          {!user ? (
            <>
              <li>
                <Link to="/login">
                  <button className="nav-link button nav-links">Log In</button>
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <button className="nav-link button nav-links">Sign Up</button>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={onClickHandler} className="nav-link button">
                  Log Out
                </button>
              </li>

            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
