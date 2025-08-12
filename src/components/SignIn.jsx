import React, { useState } from 'react';
import '../Stylesheets/SignIn.css';
import SignUp from '../components/SignUp.jsx'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function logindata(e) {
    e.preventDefault();
    setErr("");

    if (!email || !password) {
      setErr("All feilds are required");
      return
    }
    try {

      const response = await axios.post("http://localhost:5000/api/auth/login", {
        name,
        email,
        password,
      });

      const userData = response.data.user;
      console.log(response)
      localStorage.setItem("user", JSON.stringify(userData));
      alert("user login success!");
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Register failed";
      setErr(errorMsg);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login-page">
      <div className="login-container" onSubmit={logindata}>
        <h2>Welcome Back</h2>
        <form className="login-form">

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setemail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group checkbox">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>

          {err && <p id="p2">{err}</p>}<br />

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <p className="login-link">
            Don’t have an account? <a onClick={() => navigate('/signup')}>Sign Up here</a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignIn;
