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
    
      <ul className="space-y-4">
  {ads.length > 0 ? (
    ads.map((ad, index) => {
      return (
        <li key={index} className={`border p-6 rounded-lg shadow-md 
          transition-all ease-in-out duration-200 hover:scale-105 
          ${theme === 'dark' ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-white text-gray-900'}`}>
          <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
          <p className="text-gray-700 dark:text-gray-300">{ad.description}</p>
          <span className="text-sm text-gray-500 dark:text-gray-400">Company: {ad.company}</span>
          <div className="mt-2 ml-350">
            <button
              onClick={() => handleDelete(ad.id)}
              className="bg-red-600 text-white px-5 py-2 rounded-md shadow-md 
                hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all ease-in-out duration-200">
              Delete Ad
            </button>
          </div>
        </li>
      );
    })
  ) : (
    <p className="text-center text-lg text-gray-500 dark:text-gray-400">No ads found.</p>
  )}
</ul>




    
      <ToastContainer />
    </div>
    
  );
};

export default AdminAds;
