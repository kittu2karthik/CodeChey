import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_URI from "../config";
import Logo from "./Logo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };
    console.log(loginData);

    try {
      const response = await axios.post(`${API_URI}/users/login`, loginData);

      if (response.status === 200) {
        console.log(response);
        const userId = response.data.data.user._id;
        localStorage.setItem("userId", userId);
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
    <div className="flex h-svh w-full flex-col items-center bg-gradient-to-tr from-zinc-900 to-slate-900 pt-8 text-gray-200">
      <Logo />
      <h1 className="m-5 mb-12 text-center text-4xl font-bold">Login</h1>
      <form
        onSubmit={handleLogin}
        className="mx-auto flex w-4/12 flex-col items-center justify-center rounded-lg border-4 border-solid p-8 shadow-lg"
      >
        <div className="mb-6 w-full">
          <label className="mb-2 block text-left text-2xl">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2 text-purple-950 focus:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="mb-6 w-full">
          <label className="mb-2 block text-left text-2xl">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2 text-purple-950 focus:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-purple-600 py-2 text-2xl font-semibold text-white transition duration-200 hover:bg-purple-700 focus:text-purple-500"
        >
          Login
        </button>
      </form>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}

export default Login;
