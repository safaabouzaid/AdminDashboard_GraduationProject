import React from "react";
import { useSelector } from "react-redux";
import Cards from "../Cards/Cards";
import DashCompany from "../../DashCompany";

const MainDash = ({ tab }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={`${
        theme === "dark" ? "text-white bg-gray-900 rounded-4xl" : "text-gray-800 bg-white"
      } w-full shadow-2xl  shadow-indigo-300  p-8 flex flex-col`}
    >
      {tab === "companies" && <DashCompany />}
      {tab === "dashboard" && <Cards />}
      <h1 className="text-2xl font-bold"></h1>
    </div>
  );
};

export default MainDash;
