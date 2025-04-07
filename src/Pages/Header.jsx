import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from '../redux/thems/themeSlice';
import { FiSun, FiMoon } from "react-icons/fi";

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);  

  return (
    <header className={`h-50 flex items-center justify-between px-6 transition-all shadow-sm rounded-xl
      ${theme === "dark" ? "bg-gradient-to-br from-gray-950 via-gray-800 to-gray-900 text-white" : "bg-gradient-to-r from-white to-purple-100 text-gray-900"}`}>
    
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-tight flex items-center space-x-1">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 font-extrabold">
          Forsa
        </span>
        <span className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}>-Tech</span>
      </Link>
    
      {/* Search  */}
      <div className="pb-2 pt-2" >
      <form className={`rounded-xl ring-2 px-3 py-1  transition-all ${
        theme === 'dark' ? 'bg-gray-800 ring-gray-700' : 'bg-white ring-gray-300'
      }`}>
        <div className="flex items-center space-x-2">
          <SearchIcon className="text-gray-400" />
          <InputBase
            placeholder="Search"
            className="w-72"
            inputProps={{ style: { color: theme === "dark" ? "white" : "black" } }}
          />
        </div>
      </form>
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
