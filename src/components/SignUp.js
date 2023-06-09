import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  },[]);

  const handleSignUp = async () => {
    let result = await fetch("http://localhost:5000/signup", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/");
    }
  };
  return (
    <div>
      <input
        className="formInput"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
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
      <button onClick={handleSignUp} className="signupButton">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
