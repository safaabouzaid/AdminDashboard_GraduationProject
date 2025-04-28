import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Pages/Header';
import { useSelector } from 'react-redux';

const DashboardLayout = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`w-screen h-screen flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-[#1f2937fb]' : 'bg-[#F8F8F8]'}`}>
      
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onSidebarToggle={handleSidebarToggle} />
      </div>

      <div className="flex pt-[4.5rem] h-full">
        
        {/* Sidebar  */}
        <div className="hidden sm:block fixed top-[4.5rem] bottom-0 left-0 z-40 w-56 lg:w-64">
          <Sidebar />
        </div>

        {/* Sidebar  */}
        {sidebarOpen && (
          <div className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={handleSidebarToggle}>
            <div className="absolute top-[4.5rem] left-0 w-56 h-full bg-white dark:bg-gray-900 shadow-lg" onClick={(e) => e.stopPropagation()}>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1  sm:ml-56 lg:ml-68 h-[calc(100vh-4.5rem)] overflow-y-auto ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
