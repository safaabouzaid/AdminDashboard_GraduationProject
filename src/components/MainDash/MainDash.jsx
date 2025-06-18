import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 

import DashCompany from "../../Pages/DashCompany";
import AddCompany from "../../Pages/AddCompany";
import Dashboard from "../../Pages/Dashboard";
import CompanyAds from "../../Pages/CompanyAds";
import Complaints from "../../Pages/Complaints"
import Plans from "../../Pages/Plans"
import { Policy } from "../../Pages/Policy";
import Allplans  from "../../Pages/Allplans";
import SubscriptionRequests  from "../../Pages/SubscriptionRequests";

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
    <div className={`w-full flex flex-col ml-2 rounded-xl shadow-md mt-0 text-sm`}>
      {tab === "companies" && <DashCompany />}
      {tab === "addcompany" && <AddCompany />}
      {tab === "dashboard" && <Dashboard />}
      {tab === "ads" && <CompanyAds />}
      {tab === "complaints" && <Complaints/>}
      {tab === "plans" && <Plans/>}
      {tab === "policies" && <Policy/>}
      {tab === "allplans" && <Allplans/>}
      {tab === "allsubscripers" && <SubscriptionRequests/>}



    </div>
  );
};

export default MainDash;
