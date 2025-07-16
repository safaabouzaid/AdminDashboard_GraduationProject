import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useSelector } from "react-redux";

const CompaniesByOpportunity = () => {
  const { opportunityName } = useParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${config.API_BASE_URL}admin-dash/companies/by-opportunity/`,
          { opportunity_name: opportunityName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [opportunityName]);

  if (loading) return (
    <div className={`p-6 ml-4 mr-4 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <p>Loading...</p>
    </div>
  );

  return (
    <div className={`p-6 ml-4 mr-4 min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-8 text-center">
        Companies offering: "{opportunityName}"
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.length > 0 ? (
          companies.map((company) => (
            <div
              key={company.id}
              className={`w-full rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border
                ${theme === 'dark' ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-100'}
              `}
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-24 h-24 object-cover rounded-full mb-4 shadow"
              />
              <h2 className="text-xl font-semibold mb-2">{company.name}</h2>
              <p className="text-sm mb-1 opacity-80">{company.address}</p>
              <p className="text-sm mb-3 opacity-80">{company.description}</p>
             <a
  href={company.website}
  target="_blank"
  rel="noreferrer"
  style={{ textDecoration: "none", cursor: "pointer" }}
  className={`text-sm font-medium mb-3 ${
    theme === 'dark'
      ? 'text-indigo-800 hover:text-indigo-600'
      : 'text-indigo-600 hover:text-indigo-500'
  }`}
>
  Visit Website
</a>


              <div className="flex flex-col gap-1 text-xs opacity-80">
                <span>Employees: {company.employees}</span>
                <span>Jobs this month: {company.job_posts_this_month}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No companies found for this opportunity.</p>
        )}
      </div>
    </div>
  );
};

export default CompaniesByOpportunity;
