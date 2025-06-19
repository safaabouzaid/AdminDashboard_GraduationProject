import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCompany, fetchCompanies } from '../redux/CompanySlice';
import { uploadToCloudinary } from '../Pages/uploadToCloudinary';

const EditCompany = ({ open, onClose, company }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    employees: '',
    address: '',
    website: '',
    email: '',
    logo: '',      
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        description: company.description || '',
        employees: company.employees || '',
        address: company.address || '',
        website: company.website || '',
        email: company.email || '',
        logo: company.logo || '', 
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      setFormData((prev) => ({ ...prev, logo: imageUrl }));
    } catch (error) {
      alert("Failed to upload image to Cloudinary");
    }
    setUploading(false);
  };

  const handleSubmit = async () => {
    try {
      const result = await dispatch(updateCompany({ id: company.id, data: formData }));
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(fetchCompanies());
        onClose();
      } else {
        alert("An error occurred while updating the company data");
      }
    } catch (error) {
      alert("An unexpected error occurred while saving the changes");
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-md bg-opacity-30 z-50 ${open ? 'block' : 'hidden'}`}
      onClick={onClose}
    >
      <div
        className={`relative rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto w-[95%] sm:w-[600px] ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 text-center text-lg font-semibold border-b border-gray-300">
          Edit Company
        </div>

        <div className="p-4 space-y-4 text-sm">
          <div>
            <label className="block mb-1 font-medium">Company Logo</label>
            <input
              name="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
              className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200"
            />
            {uploading && <p className="text-sm text-indigo-600 mt-1">Uploading image...</p>}
            {formData.logo && !uploading && (
              <img
                src={formData.logo}
                alt="Company logo preview"
                className="mt-2 h-20 w-auto rounded-md object-contain"
              />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Company Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Employees</label>
              <input
                name="employees"
                type="number"
                value={formData.employees}
                onChange={handleChange}
                className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Website</label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={`w-full p-2 rounded-md border ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}
            />
          </div>
        </div>

        <div className="p-3 flex justify-between border-gray-300">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
