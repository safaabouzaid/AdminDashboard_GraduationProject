import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds, addAd, deleteAd } from "../redux/AdsSlice";
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AdminAds = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);

  const [formData, setFormData] = useState({
    company_name: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const existingCompanies = ['Microsoft', 'Amazon', 'Google'];
    if (!existingCompanies.includes(formData.company_name)) {
      toast.error("The company does not exist.");
      return;
    }

    if (!formData.title || !formData.description) {
      toast.error("All fields are required!");
      return;
    }

    dispatch(addAd(formData)).then(() => {
      setFormData({ company_name: '', title: '', description: '' });
      dispatch(fetchAds());
      toast.success("Ad created successfully!");
    }).catch(() => {
      toast.error("Failed to create the ad.");
    });
  };

  const handleDelete = (adId) => {
    console.log("Sending delete request for adId:", adId);  
    dispatch(deleteAd(adId))
      .unwrap()
      .then(() => {
        toast.success("Ad deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting ad:", error);  
        toast.error("Failed to delete the ad.");
      });
  };
  
  
  

  const bgText = theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const inputBg = theme === 'dark' ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' : 'bg-gray-100 text-black placeholder-gray-500 border-gray-300';
  const cardBg = theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300';
  const errorColor = theme === 'dark' ? 'text-red-400' : 'text-red-500';
  const loadingColor = theme === 'dark' ? 'text-gray-200' : 'text-gray-800';
  const noAdColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 
      ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
    
      <h2 className="text-3xl font-semibold mb-6 text-center 
        ${theme === 'dark' ? 'text-white' : 'text-gray-800'}">
        Company Advertisements
      </h2>
    
      <div className="mb-6 flex flex-wrap gap-4 justify-center">
        <input
          name="company_name"
          placeholder="Company Name"
          value={formData.company_name}
          onChange={handleChange}
          className={`border p-3 rounded-md w-full sm:w-1/4 
            ${theme === 'dark' 
              ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
            transition-all duration-200 ease-in-out`}
          
        />
        <input
          name="title"
          placeholder="Ad Title"
          value={formData.title}
          onChange={handleChange}
          className={`border p-3 rounded-md w-full sm:w-1/4 
            ${theme === 'dark' 
              ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
            transition-all duration-200 ease-in-out`}
        />
        <input
          name="description"
          placeholder="Ad Description"
          value={formData.description}
          onChange={handleChange}
          className={`border p-3 rounded-md w-full sm:w-1/4 
            ${theme === 'dark' 
              ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' 
              : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500 shadow-sm'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
            transition-all duration-200 ease-in-out`}
        />
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md 
            hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ease-in-out duration-200"
        >
          Add Ad
        </button>
      </div>
    
      {loading && <p className="text-center text-lg text-gray-800 dark:text-gray-200">Loading...</p>}
      {error && <p className="text-center text-red-500 dark:text-red-400">{error}</p>}
    
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {Array.isArray(ads) && ads.length > 0 ? (
    ads.map((ad, index) => (
      <li 
        key={index} 
        className={`${cardBg} border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold">{ad.title}</h3>
              <p className={`mt-1 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {ad.company_name || ad.company} 
              </p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              #{index + 1}
            </span>
          </div>
          <p className={`mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {ad.description}
          </p>
          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(ad.id)}
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow hover:bg-red-700 transition-colors duration-200"
            >
              Delete Ad
            </button>
          </div>
        </div>
      </li>
    ))
  ) : (
    <div className="col-span-full text-center py-10">
      <p className={`text-lg ${noAdColor}`}>No ads found.</p>
    </div>
  )}
</ul>




    
      <ToastContainer />
    </div>
    
  );
};

export default AdminAds;
