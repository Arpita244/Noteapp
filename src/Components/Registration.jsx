import React, { useState } from "react";

import "./Auth.css";

function Register() {
  const [email, setEmail] = useState("");  // New state for email
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [error, setError] = useState(""); // For error messages


  const handleRegister = (e) => {
    e.preventDefault();
    setError(""); // Reset error message before proceeding

    // Check if all fields are filled
    if (!email || !username || !password) {
      setError("Please fill in all fields!");
      return;
    }

    // Get existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the username already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      setError("Username already exists! Please use a different username.");
      return;
    }

    // Add new user to users array
    users.push({ email, username, password });

    // Save updated users array to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to login page after successful registration
    alert("Registration successful! You can now log in.");

    window.location.href="/"
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
