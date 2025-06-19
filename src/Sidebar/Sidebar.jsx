import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';
import { FaSignOutAlt } from "react-icons/fa";
import { 
  FiHome, 
  FiSettings,
  FiList,
  FiPackage, 
  FiUsers,  
  FiDollarSign   
} from "react-icons/fi";
import { 
  FaBuilding,
  FaRegBell,
} from "react-icons/fa";
import { 
  MdOutlinePolicy,
  MdOutlineContactSupport
} from "react-icons/md";
import { 
  AiOutlinePlusCircle
} from "react-icons/ai";
import { BsShieldLock, BsPersonCircle } from "react-icons/bs";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [location.search]);

  const menuItems = [
    { 
      section: 'Main',
      items: [
        { icon: <FiHome />, label: 'Dashboard', tab: 'dashboard' },
        { icon: <FaBuilding />, label: 'Companies', tab: 'companies' },
        { icon: <AiOutlinePlusCircle />, label: 'Add Company', tab: 'addcompany' },
      ]
    },
    { 
      section: 'Management',
      items: [
        { icon: <MdOutlinePolicy />, label: 'Ads', tab: 'ads' },
      ]
    },
    { 
      section: 'Subscription',
      items: [
        { icon: <FiDollarSign/>, label: 'Add Plans', tab: 'plans' },
        { icon: <FiList/>, label: 'All Plans', tab: 'allplans' },
        { icon: <FiUsers/>, label: 'All Subscripers', tab: 'allsubscripers' },


        { icon: <BsShieldLock />, label: 'Policies', tab: 'policies' },
        { icon: <FaRegBell />, label: 'Notifications', tab: 'notifications' },
      ]
    },
    { 
      section: 'Support',
      items: [
        { icon: <MdOutlineContactSupport />, label: 'Complaints', tab: 'complaints' },
        //{ icon: <FiSettings />, label: 'Settings', tab: 'settings' },
      ]
    }
  ];

  const handleTabChange = (tab) => {
    navigate(`/dashboard?tab=${tab}`);
    setActiveTab(tab);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className={`flex flex-col h-screen w-60 fixed left-0 top-0 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"} border-r ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
      
      {/* User Profile  */}
      <div className={`pt-15 pl-4  pb-3 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <div className="flex items-center">
          <BsPersonCircle className={`text-xl ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"}`} />
          <div className="ml-2">
            <p className="font-medium text-sm">{currentUser?.name || 'Admin'}</p>
            <p className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
              {currentUser?.role || 'Administrator'}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Menu  */}
      <div className="flex-1 overflow-y-auto py-3">
        {menuItems.map((section, index) => (
          <div key={index} className="mb-4 px-3">
            <h3 className={`text-xs uppercase font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
              {section.section}
            </h3>
            <ul className="space-y-1.5">
              {section.items.map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => handleTabChange(item.tab)}
                    className={`w-full flex items-center px-2 py-1.5 text-sm rounded-lg transition-all ${
                      activeTab === item.tab
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                        : theme === "dark"
                          ? "hover:bg-gray-700 text-white"
                          : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span className="mr-2 text-base">{React.cloneElement(item.icon, {size: 18})}</span>
                    <span>{item.label}</span>
                    {item.tab === 'notifications' && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">3</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Section  */}
      <div className={`p-3 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center justify-center py-1.5 px-3 rounded-lg text-sm font-medium transition-all bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-md`}
        >
          <FaSignOutAlt className="mr-1.5 text-sm" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;