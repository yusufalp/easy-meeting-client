import React from "react";
import { useLocation } from "react-router-dom";

import { PATHNAMES } from "../../constants";

function Header() {
  const location = useLocation();

  const handleNavigation = (route) => {
    console.log(route);
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
          )
        }
      </nav>
    </header>
  );
}

export default Header;
