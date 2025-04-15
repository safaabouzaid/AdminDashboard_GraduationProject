import { FaRegUser } from "react-icons/fa6";
import { TbLockPassword } from "react-icons/tb";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/UserSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginImage from "../assets/images/login2.jpg";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginEvent = (e) => {
    e.preventDefault();
    const userCredential = { email, password };
  
    dispatch(loginUser(userCredential)).then((result) => {
      if (result.payload && result.payload.access) {
        setEmail(""); 
        setPassword("");
        navigate("/dashboard");  
  
        console.log('Token in localStorage after login:', localStorage.getItem('token'));
      } else {
        console.error("Login failed:", result.error.message);
      }
    }).catch((error) => {
      console.error("Login error caught:", error);
    });
  };
  
  
  

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="login-container">
        <div
          className="login-image"
          style={{ backgroundImage: `url(${loginImage})` }}
        ></div>
        <div className="login-form">
          <h2 className="form-title">Welcome to Forsa-Tech</h2>
          <div className="line"></div>
          <h5 style={{ textAlign: "start", color: "#333333dc" }}>
            Login as an admin user
          </h5>
          <form className="custom-form" onSubmit={handleLoginEvent}>
            <div className="input-container">
              <FaRegUser className="input-icon" />
              <input
                type="email"
                required
                className="form-control custom-placeholder"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-container">
              <TbLockPassword className="input-icon" />
              <input
                type="password"
                required
                className="form-control custom-placeholder"
                placeholder="* * * * * * * * *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-submit">
              {loading ? "Loading..." : "L O G I N "}
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
          <div style={{ textAlign: "end" }} className="additional-links">
            <button
              style={{
                color: "#4A15F4",
                textDecoration: "none",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex flex-col items-center pt-0">
            <Link
              to="/Privacy"
              style={{
                alignItems: "center",
                alignContent: "center",
                paddingTop: "20%",
                color: "#888",
                textDecoration: "none",
              }}
              className="text-gray-500 mt-4"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
