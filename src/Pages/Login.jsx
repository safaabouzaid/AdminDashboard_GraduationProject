import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/UserSlice";
import { useNavigate, Link } from "react-router-dom";
import { FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import loginImage from "../assets/login.jpg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();
    const userCredential = { email, password };

    dispatch(loginUser(userCredential))
      .then((result) => {
        if (result.payload && result.payload.access) {
          setEmail("");
          setPassword("");
          navigate("/dashboard");
          console.log("Token in localStorage after login:", localStorage.getItem("token"));
        } else {
          console.error("Login failed:", result.error.message);
        }
      })
      .catch((error) => {
        console.error("Login error caught:", error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f5f5fa] to-[#eaeefb] px-4">
      <div className="flex w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl bg-white">
        {/* Left Side Image */}
        <div
          className="hidden lg:block w-1/2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${loginImage})` }}
        ></div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Welcome Back!</h2>
          <div className="w-12 h-1 bg-[#4A15F4] rounded mb-6"></div>
          <p className="text-gray-500 mb-8">Login to your admin account</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full py-3 px-4 pr-12 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A15F4]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FaUserAlt className="absolute top-3.5 right-4 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full py-3 px-4 pr-12 rounded-xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A15F4]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="absolute top-3.5 right-4 text-gray-400 cursor-pointer" onClick={togglePassword}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4A15F4] via-[#2c2f8d] to-[#6B1A6B] text-white font-semibold hover:opacity-90 transition"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="text-right text-sm">
              <button className="text-[#4A15F4] hover:underline">Forgot password?</button>
            </div>

            <div className="text-center text-xs text-gray-400 pt-10">
              <Link to="/Privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
