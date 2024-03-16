import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../store/features/authSlice";
import { PATHNAMES } from "../../constants";
import { validateEmail } from "../../utils";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [loginFormDataErrors, setLoginFormDataErrors] = useState({ email: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateFormData = () => {
    const { email } = loginFormData;
    const newErrors = {};

    const [isValidEmail, emailErrorMessage] = validateEmail(email);

    if (!isValidEmail) {
      newErrors.email = emailErrorMessage;
    }

    setLoginFormDataErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setLoginFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLoginFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateFormData()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });

      const result = await response.json();

      if (result.success) {
        const user = result.data;
        dispatch(login(user));
        return navigate(`/${PATHNAMES.DASHBOARD}`);
      } else {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="form-bg">
      <form onSubmit={handleLoginFormSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          type="text"
          id="login-email"
          name="email"
          value={loginFormData.email}
          onChange={(e) => handleInputChange(e)}
          placeholder="i.e. grace.hopper@email.com"
        />
        <p>{loginFormDataErrors.email}</p>
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
      <p className="form-link">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
