import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaImage, FaTimes, FaCheck } from "react-icons/fa";
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

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    
    dispatch(addCompany(company))
      .unwrap()
      .then(() => {
        toast.success("Company added successfully", {
          position: "bottom-right",
          autoClose: 3000,
          theme: theme === "dark" ? "dark" : "light",
        });
        setTimeout(() => {
          navigate("/dashboard?tab=companies");
        }, 1500);
      })
      .catch((err) => {
        console.error("Failed to add company:", err);
        toast.error("Failed to add company. Please try again.", {
          position: "bottom-right",
          autoClose: 5000,
          theme: theme === "dark" ? "dark" : "light",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={`min-h-screen  px-4  ml-4 mr-4 sm:px-6 lg:px-8 transition-colors duration-300`}>
      <div className="max-w-6xl mx-auto">
        <div className={`rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          {/* Form Header */}
          <div className={`px-8 py-6 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
            <h2 className="text-2xl font-bold leading-tight text-gray-500">
              <span className={`${theme === "dark" ? "text-indigo-400" : "text-purple-700  "}`}>Add New</span> Company
            </h2>
            <p className={`mt-1 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Fill in the details below to register a new company
            </p>                  
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Company Name */}
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={company.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400" 
                      : "bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"}`}
                    placeholder="e.g., ForsaTech"
                  />
                </div>

                {/* Company Email */}
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Company Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={company.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400" 
                      : "bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"}`}
                    placeholder="e.g., contact@forsatech.com"
                  />
                </div>

                {/* Number of Employees */}
                <div>
                  <label htmlFor="employees" className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Number of Employees <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="employees"
                    name="employees"
                    value={company.employees}
                    onChange={handleChange}
                    required
                    min="1"
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400" 
                      : "bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"}`}
                    placeholder="e.g., 150"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={company.address}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition ${theme === "dark" 
                      ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400" 
                      : "bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"}`}
                    placeholder="e.g., Damascus, Syria"
                  />
                </div>
              </div>

              {/* Company Description */}
              <div>
                <label htmlFor="description" className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Company Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={company.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400" 
                    : "bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"}`}
                  placeholder="Brief description about the company..."
                />
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={company.website}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-opacity-50 transition ${theme === "dark" 
                    ? "bg-gray-700 border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400" 
                    : "bg-white border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 placeholder-gray-500"}`}
                  placeholder="e.g., https://www.forsatech.com"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Company Logo
                </label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition ${theme === "dark" 
                  ? "border-gray-600 hover:border-gray-500" 
                  : "border-gray-300 hover:border-gray-400"}`}>
                  <div className="space-y-1 text-center">
                    {company.logo ? (
                      <div className="flex flex-col items-center">
                        <div className="flex items-center text-green-500">
                          <FaCheck className="mr-2" />
                          <span className="font-medium">Logo selected</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCompany({...company, logo: ""})}
                          className="mt-2 text-sm text-red-500 hover:text-red-700 flex items-center"
                        >
                          <FaTimes className="mr-1" /> Remove
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-center">
                          <FaImage className={`mx-auto h-12 w-12 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                        </div>
                        <div className="flex text-sm justify-center">
                          <label
                            htmlFor="logo-upload"
                            className={`relative cursor-pointer rounded-md font-medium focus-within:outline-none ${theme === "dark" 
                              ? "text-indigo-400 hover:text-indigo-300" 
                              : "text-indigo-600 hover:text-indigo-500"}`}
                          >
                            <span>Upload a file</span>
                            <input
                              id="logo-upload"
                              name="logo"
                              type="file"
                              onChange={handleChange}
                              accept="image/*"
                              className="sr-only"
                            />
                          </label>
                          <p className={`pl-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>or drag and drop</p>
                        </div>
                        <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                          PNG
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard?tab=companies")}
                  className={`px-6 py-2.5 rounded-lg border font-medium transition-colors duration-200 ${theme === "dark" 
                    ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white" 
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 rounded-lg font-medium text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""} ${theme === "dark" ? "focus:ring-offset-gray-800" : ""}`}
                >
                  {isSubmitting ? "Processing..." : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
        toastClassName="rounded-xl shadow-lg"
      />
    </div>
  );
}