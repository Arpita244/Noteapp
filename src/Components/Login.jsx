import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [error, setError] = useState(""); // For error messages
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset any previous errors

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email and password match a user
     //const user = users.find((user) => user.email === email && user.password === password);
     let user = null; // To store the found user if any
for (let i = 0; i < users.length; i++) {
  if (users[i].email === email && users[i].password === password) {
    user = users[i];
    break; // Exit the loop once a match is found
  }
}

if (user) {
  console.log("User found:", user);
} else {
  console.log("Invalid email or password.");
}

    
    if (user) {
      // Store authentication status and username in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("currentUser", JSON.stringify(user)); // Store current user for later use

      // Redirect to the dashboard (Notes page)
      navigate("/notes");  // Make sure the route matches your routing setup
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
