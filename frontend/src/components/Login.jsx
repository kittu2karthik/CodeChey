import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_URI from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post(`${API_URI}/users/login`, loginData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate("/problems");
      } else {
        setMessage("Error: Login failed.");
      }
    } catch (error) {
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
