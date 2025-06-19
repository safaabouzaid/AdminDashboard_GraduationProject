import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const Policy = () => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`h-screen flex flex-col transition-colors duration-300 ml-4 mr-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <header
        className={` top-0 z-50 w-full pl-9 pt-2 pr-9 h-12 flex justify-between items-center transition-all duration-300  ${
          theme === "dark"
            ? "bg-gray-900/95 border-b border-gray-800 text-white"
            : "bg-white/95 border-b border-gray-100 text-gray-900"
        }`}
      >
        
      </header>

      <main className="mt-4 flex-grow overflow-auto px-4 sm:px-8 py-6">
        <div
          className={`max-w-3xl mx-auto rounded-lg shadow-lg p-6 transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-center text-3xl mb-6">Privacy Policy</h2>
          <p className="text-lg mb-4">
            This privacy policy explains how we handle data in the admin dashboard. By using this system, you agree to these rules:
          </p>
          <ul className="list-disc pl-6">
            <li><strong>Data Usage:</strong> The data in this system is only for work purposes.</li>
            <li><strong>Admin Responsibilities:</strong> Admins must keep user data safe and private.</li>
            <li><strong>Security:</strong> We use tools to protect user data.</li>
            <li><strong>Restrictions:</strong> Misusing data or accessing it without permission will have consequences.</li>
          </ul>
        </div>
      </main>
    </div>
  );
};
