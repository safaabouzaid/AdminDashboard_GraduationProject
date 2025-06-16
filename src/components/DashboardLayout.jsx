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
    <div className={`w-screen h-screen flex flex-col overflow-hidden ${theme === 'dark' ? 'bg-[#1f2937fb]' : 'bg-[#706f6e23]'}`}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onSidebarToggle={handleSidebarToggle} />
      </div>

      <div className="flex pt-[3.6rem] h-full">
        {/* Sidebar */}
        <div className="hidden sm:block fixed top-[3.6rem] bottom-0 left-0 z-40 w-50 lg:w-58">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={handleSidebarToggle}>
            <div className="absolute top-[3.6rem] left-0 w-50 h-full bg-white dark:bg-gray-900 shadow-md" onClick={(e) => e.stopPropagation()}>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 sm:ml-50 lg:ml-58 h-[calc(100vh-3.6rem)] overflow-y-auto text-sm">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
