// src/pages/CompanyProfile.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanyProfile } from "../redux/CompanySlice";


const CompanyProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { profile: company, loadingProfile, errorProfile } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchCompanyProfile(id));
  }, [dispatch, id]);

  if (loadingProfile) return <div className="text-center py-10">Loading company profile...</div>;
  if (errorProfile) return <div className="text-center py-10 text-red-500">Error: {errorProfile}</div>;
  if (!company) return <div className="text-center py-10">No company data found.</div>;

  return (
    <div
  className={`min-h-screen px-8 py-14 transition-all 
    ${theme === "dark" ? "bg-gray-950 text-white" : "bg-gray-100 text-gray-900"}`}
>
  <div
    className={`max-w-4xl mx-auto p-10 shadow-xl rounded-3xl ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
  >
    <div className="flex items-center space-x-8">
    <img
  src={`http://localhost:8000${company.logo}`}  
  alt="logo"
  className="w-28 h-28 rounded-xl object-contain border-2 border-gray-300 dark:border-gray-700"
/>




      <div>
        <h1 className="text-4xl font-semibold text-indigo-600">{company.name}</h1>
        <p className="text-sm text-gray-800 dark:text-gray-400">{company.email}</p>
        <p className="text-sm mt-2 text-gray-800 dark:text-gray-300">{company.location}</p>
      </div>
    </div>

    <div className="mt-10 space-y-5">
      <div>
        <h2 className="text-2xl font-bold !text-gray-900 dark:!text-gray-400 mb-3">About the Company</h2>
        <p className="!text-gray-500 dark:text-gray-300">{company.description || "No description available."}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold !text-gray-900 dark:!text-gray-400 mb-3">Company Details</h2>
        <ul className="grid grid-cols-2 gap-x-10 text-sm !text-gray-800 dark:!text-gray-300">
          <li><strong>Address:</strong> {company.address || "N/A"}</li>
          <li><strong>Employees:</strong> {company.employees || "N/A"}</li>
          <li>
            <strong>Website:</strong>
            <a
              href={company.website}
              className="text-indigo-500 underline"
              target="_blank"
              rel="noreferrer"
            >
              {company.website}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

  );
};

export default CompanyProfile;
