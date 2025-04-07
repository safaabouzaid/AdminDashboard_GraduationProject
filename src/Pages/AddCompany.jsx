import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa"

export default function AddCompany() {
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const [company, setCompany] = useState({
    name: "",
    email: "",
    employees: "",
    address: "",
    logo: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files) {
      setCompany({ ...company, logo: files[0] });
    } else {
      setCompany({ ...company, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Company Added:", company);
    navigate("/companies");
  };

  return (
    <div
      className={`flex justify-center items-start min-h-screen py-10 px-6 ${
        theme === "dark" ? "" : ""
      }`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } backdrop-blur-xl bg-opacity-60 dark:bg-opacity-70 rounded-3xl shadow-2xl p-10 w-full max-w-4xl transition-all duration-300`}
      >
        <h2
          className={`text-4xl font-bold text-center mb-10 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Add a New Company
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Company Name
            </label>
            <input
              type="text"
              name="name"
              value={company.name}
              onChange={handleChange}
              required
              className={`px-5 py-3 rounded-xl border ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., ForsaTech"
            />
          </div>

          <div className="flex flex-col">
            <label
              className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Company Email
            </label>
            <input
              type="email"
              name="email"
              value={company.email}
              onChange={handleChange}
              required
              className={`px-5 py-3 rounded-xl border ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., forsaTech@gmail.com"
            />
          </div>

          <div className="flex flex-col">
            <label
              className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Number of Employees
            </label>
            <input
              type="number"
              name="employees"
              value={company.employees}
              onChange={handleChange}
              required
              className={`px-5 py-3 rounded-xl border ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., 150"
            />
          </div>

          <div className="flex flex-col">
            <label
              className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={company.address}
              onChange={handleChange}
              required
              className={`px-5 py-3 rounded-xl border ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g., Damascus,Syria"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label
              className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            >
              Company Logo (Upload Image)
            </label>
            <div className={`flex items-center  p-3 rounded-xl border ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700 text-white"
                  : "border-gray-300 bg-white text-gray-800"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}>
            



              <FaImage className="text-gray-500 mr-3" size={24} /> 
              <input
                type="file"
                name="logo"
                onChange={handleChange}
                accept="image/*"
                className="px-5 py-3 rounded-xl border-none focus:outline-none"
              />
            </div>
            <small
              className={`${
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              } mt-2`}
            >
              Please upload a logo image file (e.g., .png, .jpg, .jpeg).
            </small>
          </div>

          <div className="md:col-span-2 flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className={`px-6 py-3 rounded-full ${
                theme === "dark"
                  ? "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  : "border-red-500 text-red-500 hover:bg-red-100"
              } transition-all duration-200`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-6 py-3 rounded-full ${
                theme === "dark"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              } shadow-md transition-all duration-200`}
            >
              Add Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
