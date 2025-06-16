import React from "react";
import { Link } from "react-router-dom";

export const Policy = () => {
  return (
    <div className="h-screen flex flex-col">
      
        

      <main className="mt-16 flex-grow overflow-auto px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-center text-3xl text-gray-800 mb-6">Privacy Policy</h2>
          <p className="text-lg text-gray-700 mb-4">
            This privacy policy explains how we handle data in the admin dashboard. By using this system, you agree to these rules:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
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
