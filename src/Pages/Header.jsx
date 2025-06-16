import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery, searchCompanies } from '../redux/SearchSlice';
import { useEffect, useRef, useState } from 'react';
import { toggleTheme } from '../redux/thems/themeSlice';
import { Menu, X } from 'lucide-react';
import { FiSun, FiMoon, FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Header = ({ onSidebarToggle }) => {
  const { results, loading } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { searchQuery } = useSelector((state) => state.search);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));

    if (value.trim().length > 1) {
      dispatch(searchCompanies(value));
    }
  };

  const clearSearch = () => {
    dispatch(setSearchQuery(''));
    if (searchRef.current) searchRef.current.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
  className={`sticky top-0 z-50 w-full pl-9 pt-2 pr-9 transition-all duration-300 shadow-sm backdrop-blur-lg h-12 ${
    theme === "dark"
      ? "bg-gray-900/95 border-b border-gray-800 text-white"
      : "bg-white/95 border-b border-gray-100 text-gray-900"
  }`}
>
  <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6"> {/* تقليل padding الجانبي */}
    <div className="flex items-center justify-between h-full">
      {/* Left section - Logo and mobile menu */}
      <div className="flex items-center space-x-2.5"> {/* تقليل المسافة بين العناصر */}
        <button
          onClick={onSidebarToggle}
          className={`p-1 rounded-md transition-all ${
            theme === "dark"
              ? "text-gray-400 hover:text-white hover:bg-gray-800"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          } sm:hidden`}
        >
          <Menu className="w-3.5 h-3.5" /> {/* تصغير الأيقونة */}
        </button>

        <Link
          to="https://forsatech.netlify.app/"
          className="flex items-center space-x-1 group"
        >
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Forsa
          </span>
          <span className={`text-base font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          } group-hover:text-indigo-600 transition-colors`}>
            Tech
          </span>
        </Link>
      </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl mx-3 relative" ref={searchRef}> 
            <div
              className={`relative flex items-center transition-all duration-200 rounded-full ${
                isSearchFocused
                  ? theme === "dark"
                    ? "ring-1 ring-indigo-500 bg-gray-800"
                    : "ring-1 ring-indigo-400 bg-white"
                  : theme === "dark"
                  ? "bg-gray-800"
                  : "bg-gray-100"
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <FiSearch
                  className={`h-4 w-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Search companies..."
                className={`block w-full pl-8 pr-2 py-1.5 text-sm border-none bg-transparent focus:outline-none focus:ring-0 placeholder:${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => setIsSearchFocused(true)}
                style={{
                  color: theme === "dark" ? "white" : "black",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center"
                >
                  <X
                    className={`h-4 w-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    } hover:${
                      theme === "dark" ? "text-white" : "text-gray-700"
                    }`}
                  />
                </button>
              )}
            </div>

            {/* Search results dropdown */}
            <AnimatePresence>
              {searchQuery && isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg overflow-hidden ${
                    theme === "dark"
                      ? "bg-gray-800 border border-gray-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  {loading ? (
  <div className="p-2 flex items-center justify-center">
    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-500"></div>
  </div>
) : Array.isArray(results) && results.length > 0 ? (
  <div className="max-h-64 overflow-y-auto">
    {results.map((company) => (
      <Link
        key={company.id}
        to={`/company/${company.id}`}
        className={`block px-3 py-2 text-sm hover:bg-indigo-500/10 transition-colors border-b ${
          theme === "dark"
            ? "border-gray-700 hover:text-white"
            : "border-gray-100 hover:text-indigo-600"
        }`}
        onClick={() => setIsSearchFocused(false)}
      >
        <div className="font-medium">{company.name}</div>
        {company.email && (
          <div
            className={`text-xs ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {company.email}
          </div>
        )}
      </Link>
    ))}
  </div>
) : (
  <div className="p-2 text-center">
    <p
      className={`text-sm ${
        theme === "dark" ? "text-gray-400" : "text-gray-500"
      }`}
    >
      No companies found
    </p>
  </div>
)}

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/*  Theme toggle */}
          <div className="flex items-center">
            <button
              onClick={() => dispatch(toggleTheme())}
              className={`p-1.5 rounded-full transition-all ${
                theme === "dark"
                  ? "text-yellow-300 hover:bg-gray-800"
                  : "text-indigo-600 hover:bg-gray-100"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;