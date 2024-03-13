import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { PATHNAMES } from "../../constants";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        const user = result.data;
        console.log(user);
        return navigate(`/${PATHNAMES.DASHBOARD}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginFormSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          type="text"
          id="login-email"
          name="email"
          value={loginFormData.email}
          onChange={(e) => handleInputChange(e)}
          placeholder="Email"
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          name="password"
          value={loginFormData.password}
          onChange={(e) => handleInputChange(e)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
