import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../store/features/authSlice";
import { PATHNAMES } from "../../constants";

import "./Header.css";

function Header() {
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        dispatch(logout());
        navigate(PATHNAMES.HOME);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="App-header">
      <nav>
        {location.pathname === PATHNAMES.HOME ? (
          <ul>
            <li>
              <Link to={PATHNAMES.LOGIN}>Login</Link>
            </li>
          </ul>
        ) : (
          user && (
            <ul>
              <li>
                <Link to={PATHNAMES.CREATE}>Create Event</Link>
              </li>
              <li>
                <Link to={PATHNAMES.JOIN}>Join Event</Link>
              </li>
              <li>
                <Link to={PATHNAMES.DASHBOARD}>Dashboard</Link>
              </li>
              <li>
                <button type="button" onClick={() => handleLogout()}>
                  Logout
                </button>
              </li>
            </ul>
          )
        )}
      </nav>
    </header>
  );
}

export default Header;
