import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Container from "../../components/container/Container";
import { login } from "../../redux/userSlice";
import "./Login.style.css";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const [status, setStatus] = useState("empty");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(formData);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err);
    }
    dispatch(login(formData));
    /* 
      {
        type: "user/login", 
      payload: {
        email: ...,
        password: ...
      }}
    */
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (formData.email !== "" && formData.password !== "") {
      setStatus("typing");
    } else {
      setStatus("empity");
    }
  }, [formData]);

  if (error) {
    console.log(typeof error);
  }

  if (status === "success") {
    return <h1>You're logged In</h1>;
  }

  return (
    <Container>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInput}
            className="required"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            className="required"
          />
          <input
            type="submit"
            disabled={status !== "typing" || status === "submitting"}
            value={status === "submitting" ? "Logging in..." : "login"}
          />
        </form>
        {error ? (
          <p className="error" style={{ color: "red" }}>
            {error.message}
          </p>
        ) : null}
      </div>
    </Container>
  );
};

function submitForm({ email, password }) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let invalidEmail = email.toLowerCase() !== "sahand@gmail.com";
      let invalidPassword = password.toLowerCase() !== "sahand";
      if (invalidEmail || invalidPassword) {
        reject(new Error("Invalid Email Address"));
      } else {
        resolve();
      }
    }, 1500);
  });
}

export default Login;
