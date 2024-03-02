import React, { useState } from "react";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in...");
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
    </div>
  );
}

export default Login;
