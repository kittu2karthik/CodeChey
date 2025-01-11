import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Logo from "./Logo";

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
    <div className="flex h-svh w-full flex-col items-center bg-gradient-to-tr from-zinc-900 to-slate-900 pt-8 text-gray-200">
      <Logo />
      <h1 className="m-5 mb-8 text-center text-3xl font-bold">Sign Up</h1>

      <form
        onSubmit={handleSignUp}
        className="mx-auto flex w-4/12 flex-col items-center justify-center rounded-lg border-4 border-solid p-8 shadow-lg"
      >
        <div className="mb-4 w-full">
          <label className="mb-2 block text-left text-2xl">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2 text-purple-950 focus:text-purple-500 focus:outline-none focus:ring-2"
          />
        </div>
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
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
        <div className="mb-4 w-full">
          <label className="mb-2 block text-left text-2xl">
            Confirm Password:
          </label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2 text-purple-950 focus:text-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-purple-600 py-2 text-2xl font-semibold transition duration-200 hover:bg-purple-700 focus:text-purple-500"
        >
          Sign Up
        </button>
      </form>
      {message && <p className="text-white">{message}</p>}
    </div>
  );
}

export default SignUp;
