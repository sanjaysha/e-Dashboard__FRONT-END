import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    } else {
      alert("Please Enter Correct Details!");
    }
  };
  return (
    <div>
      <input
        className="formInput"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <input
        className="formInput"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      <button onClick={handleLogin} className="signupButton">
        Login
      </button>
    </div>
  );
}
