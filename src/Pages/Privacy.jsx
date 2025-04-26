import React from "react";
import { Link } from "react-router-dom";

export const Privacy = () => {
  return (
    <div className="h-screen flex flex-col">
      
      <header className="fixed w-full bg-gradient-to-l from-purple-600 via-indigo-500 to-blue-500">
        <div className="flex items-center justify-between p-2 ">
          <button className="text-white text-2xl">
            <i className="fas fa-bars"></i>
          </button>
          <h1 className="text-white text-xl font-semibold mr-288">Forsa Tech</h1>
          <Link to="/login">
            <button className="text-white border-2 border-white py-1 px-4 rounded-md hover:bg-white hover:text-purple-600">
              Login
            </button>
          </Link>
        </div>
      </header>

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
