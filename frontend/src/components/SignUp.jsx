import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URI from "../config";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, passwordConfirm };

    console.log(userData);

    try {
      const response = await axios.post(`${API_URI}/users/signup`, userData);

      if (response.status === 201) {
        navigate("/login");
      } else {
        setMessage(`Error: Signup failed.`);
      }
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.message || "Signup failed"}`);
      } else if (error.request) {
        setMessage("Error: No response from server.");
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex h-full items-center justify-center">
      <h1 className="text-white">Sign Up</h1>
      <form onSubmit={handleSignUp} className="text-black">
        <div>
          <label className="text-white">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-white">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-white">Confirm Password:</label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="text-white">
          Sign Up
        </button>
      </form>
      {message && <p className="text-white">{message}</p>}
    </div>
  );
}

export default SignUp;
