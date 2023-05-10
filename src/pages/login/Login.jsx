import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Container from "../../components/container/Container";
import "./Login.style.css";
import { useGetCurrentUserQuery, useLoginMutation } from "../../api/auth";
import { addUser } from "../../api/globalSlices/user.slices";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState();
  const { user } = useSelector((state) => state.user);
  const [login, { data: loginData, isError: loginDataIsError }] =
    useLoginMutation();
  const { data: userData, isError: userDataIsError } = useGetCurrentUserQuery(
    token,
    { skip: !token }
  );

  const [error, setError] = useState(null);
  const [status, setStatus] = useState("empty");

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };

  useEffect(() => {
    if (!loginDataIsError && loginData) {
      localStorage.setItem("access_token", loginData?.token);
      setToken(loginData?.token);
    }
  }, [loginData]);

  useEffect(() => {
    console.log("test");
    if (!userDataIsError && userData) {
      dispatch(addUser(userData.data.user));
    }
  }, [userData]);

  if (user) return <Navigate to="/" replace />;

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
          <h2 className="login-title">Login</h2>
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
          <div className="flex-col text-center mt-5">
            <h2 className="text-black">Don't have an account?</h2>
            <Link to="/register">
              <h1 className="text-xl text-gray-800 hover:text-sky-500 underline decoration-sky-500">
                Register Here
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

export default Login;
