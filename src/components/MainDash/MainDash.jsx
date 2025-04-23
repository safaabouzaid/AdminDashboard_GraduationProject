import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 

import DashCompany from "../../Pages/DashCompany";
import AddCompany from "../../Pages/AddCompany";
import Dashboard from "../../Pages/Dashboard";
import CompanyAds from "../../Pages/CompanyAds"

const MainDash = () => {
  const { theme } = useSelector((state) => state.theme);
  const location = useLocation();
  const [tab, setTab] = useState('dashboard');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab') || 'dashboard';
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div className={`w-full flex flex-col  rounded-2xl shadow-lg mt-0 `}>
      {tab === "companies" && <DashCompany />}
      {tab === "addcompany" && <AddCompany />}
      {tab === "dashboard" && <Dashboard />}
      {tab === "ads" && <CompanyAds />}

    </div>
  );
};

export default MainDash;
