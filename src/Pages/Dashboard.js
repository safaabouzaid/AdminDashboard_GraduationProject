import React, { useEffect } from "react";
import './Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";
import Header from "../components/header";
import MainDash from "../components/MainDash/MainDash";

const Dashboard = () => {
  useEffect(() => {
    document.body.classList.add("dashboard-body");

    return () => {
      document.body.classList.remove("dashboard-body");
    };
  }, []);

  return (
    <div className="dashboard-container">
      <Header />
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
      </div>
    </div>
  );
};

export default Dashboard;
