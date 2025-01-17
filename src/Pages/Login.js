import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../UserSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginEvent = (e) => {
    e.preventDefault();
    const userCredential = { username, password };
    dispatch(loginUser(userCredential)).then((result) => {
      if (result.payload) {
        setEmail("");
        setPassword("");
        navigate("/");
      }
    });
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>
      <div className="login-form">
        <h2 className="form-title">Welcome to Forsa-Tech</h2>
        <p style={{ textAlign: "center" }} className="form-subtitle">
          {" "}
        </p>
        <form className="custom-form" onSubmit={handleLoginEvent}>
          <label style={{textAlign: "start" ,fontSize:"110%" }} >Email</label>
          <input
            type="email"
            required
            className="form-control"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label style={{textAlign: "start" ,fontSize:"100%"}}>Password</label>
          <input
            type="password"
            required
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn-submit">
            {loading ? "Loading..." : "Log In as Admin"}
          </button>
          {error && <div className="error-message">{error}</div>}
        </form>
        <div   style={{textAlign: "end"}} className="additional-links">
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};
