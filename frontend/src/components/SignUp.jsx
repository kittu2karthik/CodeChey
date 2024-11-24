import React from "react";
import NavBar from "./NavBar";
import Logo from "./Logo";

import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form>
        <div>
          <label>Email</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
      </form>
    </div>
  );
}

export default SignUp;
