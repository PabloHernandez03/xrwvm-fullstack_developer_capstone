import React, { useState } from 'react';

import "./Login.css";
import "../auth.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true)

  let login_url = window.location.origin + "/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      setOpen(false);
    }
    else {
      setError("Wrong username or password. Please try again.");
    }
  };

  if (!open) {
    window.location.href = "/";
  };

  return (
    <div>
      <Header />
      <div className="auth_page" onClick={onClose}>
        <form
          className="auth_card"
          onClick={(e) => e.stopPropagation()}
          onSubmit={login}
        >
          <h2 className="auth_title">Sign in</h2>
          <p className="auth_subtitle">Access your Best Cars account</p>

          <label className="auth_label" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Your username"
            className="auth_input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <label className="auth_label" htmlFor="psw">Password</label>
          <input
            id="psw"
            name="psw"
            type="password"
            placeholder="Your password"
            className="auth_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth_error">{error}</p>}

          <div className="auth_actions">
            <input className="auth_button primary" type="submit" value="Login" />
            <input
              className="auth_button"
              type="button"
              value="Cancel"
              onClick={() => setOpen(false)}
            />
          </div>

          <p className="auth_footer">
            New here? <a href="/register">Register Now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
