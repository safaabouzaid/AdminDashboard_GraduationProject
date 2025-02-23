import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../components/header";
import MainDash from "../components/MainDash/MainDash";
import DashCompany from "../DashCompany";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="w-1/5 min-h-screen p-4" />
        <MainDash tab={tab} className="w-4/5 p-6 shadow-md rounded-lg" />
      </div>
    </div>
  );
};

export default Dashboard;
