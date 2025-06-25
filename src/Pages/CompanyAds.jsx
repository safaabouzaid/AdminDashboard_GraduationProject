import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAds, addAd, deleteAd } from "../redux/AdsSlice";
import { toast, ToastContainer } from 'react-toastify';
import defaultLogo from "../assets/user1.jpeg";


import 'react-toastify/dist/ReactToastify.css';
import { uploadToCloudinary } from "../Pages/uploadToCloudinary"; 

const AdminAds = () => {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const { ads, loading, error } = useSelector((state) => state.ads);

  const [formData, setFormData] = useState({
    company_name: '',
    title: '',
    description: '',
    ad_image: null,   
  });

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'ad_image') {
      setFormData((prev) => ({ ...prev, ad_image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

const handleSubmit = async () => {
  let imageUrl = "";

  if (formData.ad_image) {
    try {

      imageUrl = await uploadToCloudinary(formData.ad_image);
      if (!imageUrl) {
        toast.error("No image URL returned from Cloudinary.");
        return;
      }
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
      toast.error("Failed to upload image to Cloudinary.");
      return;
    }
  } else {
    toast.error("Please select an image to upload.");
    return;
  }

  const payload = {
    company_name: formData.company_name,
    title: formData.title,
    description: formData.description,
    ad_image: imageUrl,  
    company_logo: "", 
  };

  dispatch(addAd(payload))
    .unwrap()
    .then(() => {
      setFormData({
        company_name: "",
        title: "",
        description: "",
        ad_image: null,
      });
      dispatch(fetchAds());
      toast.success("Ad created successfully!");
    })
    .catch(() => {
      toast.error("Failed to create the ad.");
    });
};

  const handleDelete = (adId) => {
    dispatch(deleteAd(adId))
      .unwrap()
      .then(() => {
        toast.success("Ad deleted successfully!");
      })
      .catch(() => {
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
    <div className={`p-6 ml-4 mr-4 min-h-screen transition-colors duration-300 ${bgText}`}>
      <h2 className={`text-3xl font-semibold mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        Company Advertisements
      </h2>

      <div className="mb-6 flex flex-wrap gap-4 justify-center items-center">
  <input
    name="company_name"
    placeholder="Company Name"
    value={formData.company_name}
    onChange={handleChange}
    className={`border p-3 rounded-md flex-grow min-w-[200px] ${inputBg} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out`}
  />
  <input
    name="title"
    placeholder="Ad Title"
    value={formData.title}
    onChange={handleChange}
    className={`border p-3 rounded-md flex-grow min-w-[200px] ${inputBg} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out`}
  />
  <input
    name="description"
    placeholder="Ad Description"
    value={formData.description}
    onChange={handleChange}
    className={`border p-3 rounded-md flex-grow min-w-[200px] ${inputBg} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 ease-in-out`}
  />

  <div className="flex items-center space-x-2 max-w-[250px] overflow-hidden">
    <label
      htmlFor="ad_image"
      className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 transition duration-200 select-none whitespace-nowrap"
      title="Upload Ad Image"
    >
      Upload Image
    </label>
    <input
      type="file"
      id="ad_image"
      name="ad_image"
      accept="image/*"
      onChange={handleChange}
      className="hidden"
    />
    {formData.ad_image && (
      <span
        className="truncate text-sm text-green-600 dark:text-green-400 max-w-[150px] inline-block"
        title={formData.ad_image.name}
      >
        {formData.ad_image.name}
      </span>
    )}
  </div>

  <button
    onClick={handleSubmit}
    className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ease-in-out duration-200 whitespace-nowrap"
  >
    Add Ad
  </button>
</div>

      {loading && <p className={`text-center text-lg ${loadingColor}`}>Loading...</p>}
      {error && <p className={`text-center ${errorColor}`}>{error}</p>}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(ads) && ads.length > 0 ? (
          ads.map((ad, index) => (
            <li
              key={index}
              className={`${cardBg} border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105`}
            >
              {ad.ad_image && (
                <div className="h-48 overflow-hidden">
                  <img
  src={ad.ad_image ? ad.ad_image : defaultLogo}
  alt={ad.title}
  className="w-full h-full object-cover"
/>

                </div>
              )}

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    {ad.company_logo && (
  <img
    src={ad.company_logo}
    alt={ad.company || ad.company_name}
    className="w-12 h-auto rounded-full mr-3 object-contain"
  />
)}

                    <div>
                      <h3 className="text-xl font-semibold">{ad.title}</h3>
                      <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {ad.company || ad.company_name}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    #{index + 1}
                  </span>
                </div>

                <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {ad.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(ad.created_at).toLocaleDateString()}
                  </span>
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
