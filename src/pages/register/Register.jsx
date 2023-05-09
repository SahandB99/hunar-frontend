import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Container from "../../components/container/Container";
import { login } from "../../redux/userSlice";
import "./Register.styles.css";

const Register = () => {
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
      setStatus("empty");
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
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Register</h2>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInput}
            className="required"
          />
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            name="username"
            id="username"
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
            value={status === "submitting" ? "Registering..." : "Register"}
          />
          <div className="flex-col text-center mt-5">
            <h2 className="text-black">Already have an account?</h2>
            <Link to="/login">
              <h1 className="text-xl text-gray-800 hover:text-sky-500 underline decoration-sky-500">
                Login Here
              </h1>
            </Link>
          </div>
        </form>
      </div>
      {error ? (
        <p className="error" style={{ color: "red" }}>
          {error.message}
        </p>
      ) : null}
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

export default Register;
