import React, { useState } from "react";

import "./Register.css";
import "../auth.css";
import Header from '../Header/Header';

const Register = () => {

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  let register_url = window.location.origin + "/djangoapp/register";

  const register = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("The two passwords do not match.");
      return;
    }

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      setError("That username is already taken. Try a different one.");
    }
    else {
      setError("The account could not be created. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="auth_page">
        <form className="auth_card" onSubmit={register}>
          <h2 className="auth_title">Create an account</h2>
          <p className="auth_subtitle">It only takes a minute</p>

          <div className="auth_row">
            <div className="auth_col">
              <label className="auth_label" htmlFor="firstName">First name</label>
              <input
                id="firstName"
                type="text"
                className="auth_input"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="auth_col">
              <label className="auth_label" htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                type="text"
                className="auth_input"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <label className="auth_label" htmlFor="regUsername">Username</label>
          <input
            id="regUsername"
            type="text"
            className="auth_input"
            placeholder="Pick a username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label className="auth_label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="auth_input"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth_label" htmlFor="regPassword">Password</label>
          <input
            id="regPassword"
            type="password"
            className="auth_input"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="auth_label" htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            type="password"
            className="auth_input"
            placeholder="Repeat the password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="auth_error">{error}</p>}

          <div className="auth_actions">
            <input className="auth_button primary" type="submit" value="Register" />
            <input
              className="auth_button"
              type="button"
              value="Cancel"
              onClick={() => { window.location.href = window.location.origin; }}
            />
          </div>

          <p className="auth_footer">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
