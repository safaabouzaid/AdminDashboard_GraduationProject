import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery, searchCompanies } from '../redux/SearchSlice';
import { useEffect } from 'react';
import { toggleTheme } from '../redux/thems/themeSlice';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { FiSun, FiMoon } from "react-icons/fi";

const Header = () => {
  const { results, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { searchQuery } = useSelector((state) => state.search);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));

    if (value.trim().length > 1) {
      dispatch(searchCompanies(value));
    }
  };

  return (
    <header className={`h-50 flex items-center justify-between px-6  transition-all shadow-sm rounded-xl
      ${theme === "dark"
        ? "bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 text-white"
        : "bg-gradient-to-r from-white to-purple-100 text-gray-900"}`}>

      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-tight flex items-center space-x-1">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 font-extrabold">
          Forsa
        </span>
        <span className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}>-Tech</span>
      </Link>

      {/* Search */}
      <div className="relative pb-3 pt-3">
  <form className={`rounded-xl ring-2 px-3 py-1 transition-all 
    ${theme === 'dark' ? 'bg-gray-800 ring-gray-700' : 'bg-white ring-gray-300'}`}>
    <div className="flex items-center space-x-2">
      <SearchIcon className="text-gray-400" />
      <InputBase
        placeholder="Find a company ..."
        className="w-72"
        inputProps={{ style: { color: theme === "dark" ? "white" : "black" } }}
        value={searchQuery}
        onChange={handleSearchChange}
      />
    </div>
  </form>

  {/* Dropdown Results */}
  {searchQuery && (
    <div className={`absolute z-50 w-full mt-2 rounded-xl shadow-lg max-h-64 overflow-y-auto transition-all 
      ${theme === "dark" ? "bg-gray-800 text-white border border-gray-700" : "bg-white text-gray-900 border border-gray-200"}`}>
      {loading ? (
        <p className="p-4 text-sm text-center">Loading results ..</p>
      ) : results.length > 0 ? (
        results.map((company) => (
          <Link
            key={company.id}
            to={`/company/${company.id}`}
            className={`block px-4 py-2 hover:bg-indigo-100 dark:hover:bg-gray-700 transition-all`}
          >
            <div className="font-semibold">{company.name}</div>
            {company.email && <div className="text-xs text-gray-500">{company.email}</div>}
          </Link>
        ))
      ) : (
        <p className="p-4 text-sm text-center text-gray-400">No results found .</p>
      )}
    </div>
  )}
</div>

      

      {/* Theme toggle */}
      <button
        onClick={() => dispatch(toggleTheme())}
        className="w-10 h-10 flex items-center justify-center rounded-full shadow-sm 
        bg-gradient-to-br from-indigo-500 to-purple-600 hover:opacity-90 transition-all"
      >
        {theme === "dark" ? (
          <FiSun className="text-yellow-300 text-xl" />
        ) : (
          <FiMoon className="text-white text-xl" />
        )}
      </button>
    </header>
  );
};

export default Header;
