import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      // Make POST request to login API
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        loginData,
        {
          withCredentials: true, // Allow cookies to be sent and received
        },
      );

      if (response.status === 200) {
        setMessage("Login successful!");

        // Perform post-login actions (e.g., redirecting)
        console.log("Logged in successfully.");
      } else {
        setMessage("Error: Login failed.");
      }
    } catch (error) {
      // Handle errors from the API
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || "Login failed"}`);
      } else if (error.request) {
        setMessage("Error: No response from server.");
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
