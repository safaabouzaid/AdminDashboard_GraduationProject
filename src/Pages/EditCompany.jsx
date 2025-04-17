import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCompany } from '../redux/CompanySlice';
import { fetchCompanies } from "../redux/CompanySlice";
import { useSelector } from 'react-redux';

const EditCompany = ({ open, onClose, company }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    employees: '',
    address: '',
    website: '',
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        description: company.description || '',
        employees: company.employees || '',
        address: company.address || '',
        website: company.website || '',
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const result = await dispatch(updateCompany({ id: company.id, data: formData }));
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(fetchCompanies());
        onClose();
      } else {
        console.error("Update Failed:", result.payload);
        alert("An error occurred while updating the company data");
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("An unexpected error occurred while saving the changes");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${open ? 'block' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`p-6 text-center text-xl font-semibold ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}
        >
          Edit Company
        </div>
        <div
          className={`p-6 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        >
          <div className="mb-6">
            <label htmlFor="name" className={`block text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Company Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-4 mt-2 rounded-md border ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'} text-lg`}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="description" className={`block text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Description
            </label>
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-4 mt-2 rounded-md border ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'} text-lg`}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="employees" className={`block text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
              Number of Employees
            </label>
            <input
              id="employees"
              name="employees"
              type="number"
              value={formData.employees}
              onChange={handleChange}
              className={`w-full p-4 mt-2 rounded-md border ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'} text-lg`}
            />
          </div>
          <div className="mb-6">
  <label htmlFor="address" className={`block text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
    Location
  </label>
  <input
    id="address"
    name="address"
    value={formData.address}
    onChange={handleChange}
    className={`w-full p-4 mt-2 rounded-md border ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'} text-lg`}
  />
</div>

<div className="mb-6">
  <label htmlFor="website" className={`block text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
    Website
  </label>
  <input
    id="website"
    name="website"
    value={formData.website}
    onChange={handleChange}
    className={`w-full p-4 mt-2 rounded-md border ${theme === 'dark' ? 'bg-gray-600 text-white' : 'bg-gray-200 text-black'} text-lg`}
  />
</div>

        </div>

        <div
          className={`p-4 flex justify-between ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}
        >
          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-full border-gray-500 text-gray-500 font-semibold hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 text-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
