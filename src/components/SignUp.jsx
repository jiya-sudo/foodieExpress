import React, { useState, useEffect } from 'react';
import '../Stylesheets/SignUp.css'; // You can style this file as per your theme
import SignIn from '../components/SignIn.jsx'
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios';


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpass, setCpass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);


  useEffect(() => {
    document.getElementById("username")?.focus();
  }, []);

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !cpass) {
      setError("All feilds are required to be filled");
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please eneter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Passowrd must be at least 6 characters");
      return;
    }

    if (password != cpass) {
      setError("Password and Confirm Password are not same");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      const newUser = { name, email, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      alert("User registered succesfully");
      navigate("/login");

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2>Create a New Account</h2>
        <form className="signup-form" onSubmit={handleSignup}>

          {/* --- Personal Details --- */}
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" />
          </div>

          {/* --- Contact Info --- */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
          </div>

          {/* <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" placeholder="Enter your phone number" required />
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="address">Full Address</label>
            <textarea id="address" rows="3" placeholder="Enter your full address" required></textarea>
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" required>
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="delivery">Delivery Partner</option>
              <option value="restaurant">Restaurant</option>
            </select>
          </div> */}
          {/* --- Account Security --- */}
          <div className="form-group">
            <label htmlFor="password">Create Password</label>
            <input type="password" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" placeholder="Re-enter password" value={cpass} onChange={(e) => setCpass(e.target.value)} />
          </div>

          {/* --- Terms --- */}
          <div className="form-group checkbox">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              I agree to the <a href="/terms" target="_blank">Terms & Conditions</a>
            </label>
          </div>

          {error && <p id="p2">{error}</p>}<br />

          {/* --- Submit --- */}
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="login-link">
          Already have an account?{" "}
          <button type='button' className='link-button' onClick={() => navigate("/login")}>
            Log In
          </button>
        </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
