import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSignupFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSignupFormSubmit = (event) => {
    event.preventDefault();
    console.log("Signing up...");
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
        <button type="submit">Signup</button>
      </form>
      <p className="form-link">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
