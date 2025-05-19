import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanyProfile } from "../redux/CompanySlice";
import { FaBuilding, FaUsers, FaMapMarkerAlt, FaGlobe, FaEnvelope } from "react-icons/fa";
import { ThreeDots } from "react-loader-spinner";

const CompanyProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { profile: company, loadingProfile, errorProfile } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompanyProfile(id))
      .then((action) => {
        console.log("Company Data:", action.payload); 
      });
  }, [dispatch, id]);

  if (loadingProfile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
        <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color={theme === "dark" ? "#6366f1" : "#4f46e5"}
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    );
  }

  if (errorProfile) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className={`p-8 rounded-xl shadow-lg max-w-md w-full text-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Profile</h2>
          <p className={`mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            We couldn't load the company profile due to:
          </p>
          <p className="px-4 py-3 rounded-lg bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200">
            {errorProfile}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`mt-6 px-6 py-2 rounded-lg font-medium ${theme === "dark" 
              ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className={`p-8 rounded-xl shadow-lg max-w-md w-full text-center ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-gray-500 text-5xl mb-4">🏢</div>
          <h2 className="text-2xl font-bold mb-2">Company Not Found</h2>
          <p className={`mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            We couldn't find any company data matching your request.
          </p>
          <button
            onClick={() => window.history.back()}
            className={`mt-4 px-6 py-2 rounded-lg font-medium ${theme === "dark" 
              ? "bg-gray-700 hover:bg-gray-600 text-white" 
              : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
    
      <div className={`relative overflow-hidden py-16 ${theme === "dark" ? "bg-gray-800" : "bg-indigo-600"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-10">
              <img
                src={`http://localhost:8000${company.logo}`}
                alt={`${company.name} logo`}
                  className="w-32 h-32 max-w-[8rem] max-h-[8rem] rounded-xl object-contain border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/150?text=No+Logo";
                }}
              />
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white">
                {company.name}
              </h1>
              <p className={`mt-3 max-w-3xl text-xl ${theme === "dark" ? "text-indigo-200" : "text-indigo-100"}`}>
                {company.tagline || "Innovating for a better tomorrow"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`rounded-2xl shadow-xl overflow-hidden transition-all duration-300 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
          {/* Company Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* About Section */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FaBuilding className="mr-3 text-indigo-500" />
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
                    About Us
                  </span>
                </h2>
                <p className={`text-lg leading-relaxed ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                  {company.description || "No description available."}
                </p>
              </div>

              {/*   */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className={theme === "dark" ? "text-gray-300" : "text-gray-800"}>
                    Key Information
                  </span>
                </h2>
                <div className={`space-y-4 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  <div className="flex items-start">
                    <FaEnvelope className="flex-shrink-0 mt-1 mr-3 text-indigo-500" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <span>{company?.email || "No Email Provided"}</span>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaUsers className="flex-shrink-0 mt-1 mr-3 text-indigo-500" />
                    <div>
                      <h3 className="font-medium">Employees</h3>
                      <p>{company.employees ? `${company.employees}+` : "Not specified"}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaMapMarkerAlt className="flex-shrink-0 mt-1 mr-3 text-indigo-500" />
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p>{company.address || "Not specified"}</p>
                    </div>
                  </div>

                  {company.website && (
                    <div className="flex items-start">
                      <FaGlobe className="flex-shrink-0 mt-1 mr-3 text-indigo-500" />
                      <div>
                        <h3 className="font-medium">Website</h3>
                        <a
                          href={company.website.startsWith('http') ? company.website : `https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          {company.website.replace(/(^\w+:|^)\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          
            
          </div>

          {/* contact  */}
<div className={`px-8 py-6 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} border-t ${theme === "dark" ? "border-gray-600" : "border-gray-200"}`}>
  <div className="flex flex-col md:flex-row justify-between items-center">
    <h3 className={`text-lg font-medium mb-4 md:mb-0 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
      Would you like to contact {company.name}?
    </h3>
    <a 
      href={`mailto:${company.email}?subject=Contact Regarding ${company.name}`}
      className={`px-6 py-3 rounded-lg font-medium ${theme === "dark" 
        ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
        : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
    >
      Contact Company
    </a>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;