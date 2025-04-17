import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaImage } from "react-icons/fa"
import { useDispatch } from "react-redux";
import { addCompany } from "../redux/CompanySlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCompany() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const [company, setCompany] = useState({
    name: "",
    email: "",
    employees: "",
    address: "",
    logo: "",
    description: "",
    website: "",
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
    dispatch(addCompany(company))   
         
      .unwrap()
      .then(() => {
        toast.success("Company added successfully", {
          position: "bottom-right",
          autoClose: 10000,
          theme: theme === "dark" ? "dark" : "light",
        });
        setTimeout(() => {
          navigate("/dashboard?tab=companies");
        }, 1500);
      })
      
      .catch((err) => {
        console.error("Failed to add company:", err);
        toast.error(" Failed to add company. Please try again."),{
          position: "bottom-left",
          autoClose: 5000,
          theme: theme === "dark" ? "dark" : "light",
        }
      });
      
  };

  

  return (
    <div
      className={`flex justify-center items-start min-h-screen py-1 px-4 sm:px-8${
        theme === "dark" ? "" : ""
      }`}
    >
      <div
        className={`${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } backdrop-blur-xl bg-opacity-60 dark:bg-opacity-70 rounded-3xl shadow-2xl p-10 w-full max-w-6xl transition-all duration-300`}
      >
        <h2
          className={`text-4xl font-bold text-center mb-10 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Add a New Company
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          <div className="flex flex-col sm:flex-row sm:space-x-6 sm:col-span-2 gap-6">
    <div className="flex flex-col sm:w-1/2">
      <label
        className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
      >
        Company Description
      </label>
      <textarea
        name="description"
        value={company.description}
        onChange={handleChange}
        rows={3}  
        className={`px-5 py-3 rounded-xl border ${
          theme === "dark"
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300 bg-white text-gray-800"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}  
        placeholder="Write a brief description of the company..."
      />
    </div>

    <div className="flex flex-col sm:w-1/2">
      <label className={`mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
        Website
      </label>
      <input
        type="url"
        name="website"
        value={company.website}
        onChange={handleChange}
        className={`px-5 py-3 rounded-xl border ${
          theme === "dark"
            ? "border-gray-600 bg-gray-700 text-white"
            : "border-gray-300 bg-white text-gray-800"
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        placeholder="e.g., https://www.forsatech.com"
      />
    </div>
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
              onClick={() => navigate("/dashboard?tab=companies")}
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
      <ToastContainer
  position="bottom-right"
  autoClose={10000}
  toastClassName={() =>
    "bg-white text-black p-6 rounded-2xl text-xl font-semibold shadow-lg"
  }
  theme={theme === "dark" ? "dark" : "light"}
/>
    </div>
  );
}
