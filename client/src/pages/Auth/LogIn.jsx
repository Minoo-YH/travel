import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useValue } from "../../Middleware/context/ContextProvider";


const Login = () => {
  const [inputs, setInputs] = useState({
    emailOrPhone: "",
    password: "",
  });

  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useValue();

  const redirectPath = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        inputs
      );
      console.log(response.data);

      if (response.data.success) {
        dispatch({ type: "UPDATE_USER", payload: response.data.result });

        sessionStorage.setItem("token", response.data.result.token);
        sessionStorage.setItem("userId", response.data.result.id);
        sessionStorage.setItem("email", response.data.result.email);

        navigate(redirectPath);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      console.log("Login error:", error);
      setErr(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div >
      <div >
        <h2 >Login</h2>
        <form onSubmit={handleLogin}>
          <label >Email/Phone Number</label>
          <input
            type="text"
            placeholder="Email or Phone Number"
            name="emailOrPhone"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          {err && <p className="auth-error">{err}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
