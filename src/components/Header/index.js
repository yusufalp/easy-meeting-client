import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { PATHNAMES } from "../../constants";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

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
        navigate(PATHNAMES.HOME);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (route) => {
    if (route === PATHNAMES.LOGOUT) {
      handleLogout();
    } else {
      navigate(route);
    }
  };

  return (
    <header className="App-header">
      <nav>
        {location.pathname === PATHNAMES.HOME ? (
          <ul>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation(PATHNAMES.LOGIN)}
              >
                Login
              </button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation(PATHNAMES.CREATE)}
              >
                Create Event
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation(PATHNAMES.JOIN)}
              >
                Join Event
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation(PATHNAMES.DASHBOARD)}
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleNavigation(PATHNAMES.LOGOUT)}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
