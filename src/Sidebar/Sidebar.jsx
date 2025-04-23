import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome } from "react-icons/fi";
import { FaBuildingUser } from "react-icons/fa6";
import { MdOutlinePolicy } from "react-icons/md";
import { AiOutlineLogin, AiOutlineComment } from "react-icons/ai";
import { useSelector } from 'react-redux';
import './Sidebar.css'; 

import GroupAddIcon from '@mui/icons-material/GroupAdd';
const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const menuItems = [
    { icon: <FiHome />, label: 'Dashboard', tab: 'dashboard' },
    { icon: <FaBuildingUser />, label: 'All Companies', tab: 'companies' },
    { icon: <GroupAddIcon />, label: 'Add Company', tab: 'addcompany' },
    { icon: <MdOutlinePolicy />, label: 'Ads', tab: 'ads' },
    { icon: <AiOutlineComment />, label: 'Complaints', tab: 'complaints' },
    { icon: <AiOutlineLogin />, label: 'Log out', tab: 'logout' },
  ];

  const handleTabClick = (tabName) => {
    // Navigate without reloading the entire page
    navigate(`/dashboard?tab=${tabName}`);
    setTab(tabName); // Update the state for the selected tab
  };
  


  return (
<div
  className={`
    w-full sm:w-1/4 md:w-1/5 lg:w-1/6 
    min-h-screen p-3 sm:p-4 lg:p-5 
    shadow-lg rounded-xl transition-all 
    ${theme === "dark" 
      ? "bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 text-white" 
      : "bg-gradient-to-r from-purple-100 to-white text-black"}
  `}
>
  <div className="space-y-3 sm:space-y-4">
    {menuItems.map((item, index) => (
      <div
        key={index}
        className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2 sm:py-3 rounded-xl mt-4 sm:mt-6 
          transition duration-300 cursor-pointer
          ${tab === item.tab 
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md" 
            : "hover:bg-gray-200 dark:hover:bg-gray-400"}`}
        onClick={() => handleTabClick(item.tab)}
      >
        <div className="text-xl sm:text-2xl">{item.icon}</div>
        <span className="text-sm sm:text-base">{item.label}</span>
      </div>
    ))}
  </div>
</div>

  );
};

export default Sidebar;
