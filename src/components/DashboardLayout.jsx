

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Pages/Header';
import { useSelector } from 'react-redux';

const DashboardLayout = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`w-screen h-screen flex flex-col  ${
        theme === 'dark' ? 'bg-[#1f2937fb]' : 'bg-[#F8F8F8]'
      }`}
    >
      {/* header */}
      <Header />

      {/* sidbar+ main*/}
      <div className="flex flex-1/12 mt-7">
        {/* Sidebar */}
        
          <Sidebar />
        

        {/* Main Content  */}
        <div
  className={`flex-1/3 rounded-xl shadow-lg p-4 h-[calc(100vh-4.5rem)] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent ${theme === 'dark' ? 'bg-[#1f2937fb]' : 'bg-[#F8F8F8]'} scrollbar-hide`}
>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

