import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../store/features/authSlice";
import { PATHNAMES } from "../../constants";
import { validateEmail, validatePassword } from "../../utils";

function Signup() {
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signupFormDataErrors, setSignupFormDataErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateFormData = () => {
    const { email, password, confirmPassword } = signupFormData;
    const newErrors = {};

    const [isValidEmail, emailErrorMessage] = validateEmail(email);

    if (!isValidEmail) {
      newErrors.email = emailErrorMessage;
    }

    const [isValidPassword, passwordErrorMessage] = validatePassword(
      password,
      confirmPassword
    );

    if (!isValidPassword) {
      newErrors.password = passwordErrorMessage;
    }

    setSignupFormDataErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSignupFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignupFormSubmit = async (event) => {
    event.preventDefault();

    if (!validateFormData()) {
      return;
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    signupFormData.timezone = timezone;

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupFormData),
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
      <form onSubmit={handleSignupFormSubmit}>
        <div className="group-row">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={signupFormData.firstName}
              onChange={(e) => handleInputChange(e)}
              placeholder="Grace"
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={signupFormData.lastName}
              onChange={(e) => handleInputChange(e)}
              placeholder="Hopper"
            />
          </div>
        </div>
        <label htmlFor="signup-email">Email</label>
        <input
          type="text"
          id="signup-email"
          name="email"
          value={signupFormData.email}
          onChange={(e) => handleInputChange(e)}
          placeholder="i.e. grace.hopper@email.com"
        />
        <p>{signupFormDataErrors.email}</p>
        <div className="group-row">
          <div>
            <label htmlFor="signup-password">Password</label>
            <input
              type="password"
              id="signup-password"
              name="password"
              value={signupFormData.password}
              onChange={(e) => handleInputChange(e)}
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={signupFormData.confirmPassword}
              onChange={(e) => handleInputChange(e)}
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <p>{signupFormDataErrors.password}</p>
        <button type="submit">Signup</button>
      </form>
      <p className="form-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
