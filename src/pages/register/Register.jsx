import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/container/Container";
import Error from "../../common/error/Error";
import { useSignupMutation } from "../../api/auth";
import { addUser } from "../../api/globalSlices/user.slices";
import "./Register.styles.css";

const Register = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [errors, setErrors] = useState([]);

  const { user } = useSelector((state) => state.user);

  const [signUp, { data: response, isError }] = useSignupMutation();

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [status, setStatus] = useState("empty");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.confirmPassword !== formData.password) {
      setErrors([...errors, "passwords didn't match"]);
      return;
    }

    signUp(formData);
  };

  useEffect(() => {
    if (!isError && response) {
      localStorage.setItem("access_token", response?.data.token);
      dispatch(addUser(response.data.user));
    }
  }, [response]);

  if (user) return <Navigate to="/" replace />;

  return (
    <Container>
      <div className="register-form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Register</h2>

          {errors.length > 0 && <Error messages={errors} />}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInput}
            required={true}
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInput}
            required={true}
            minLength={8}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            required={true}
            minLength={8}
          />
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInput}
            required={true}
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
    </Container>
  );
};

export default Register;
