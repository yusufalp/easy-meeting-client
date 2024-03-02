import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="App-header">
      <nav>
        <ul>
          <Link to="/login">Login</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
