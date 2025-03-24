import { Button, Navbar, TextInput } from "flowbite-react";
import { BsMoon } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector,useDispatch } from "react-redux";
import { toggleTheme } from '../redux/thems/themeSlice';
import "./Header.css"
import { FiSun, FiMoon } from "react-icons/fi";
const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);  

return (
<div className={` pt-2 ${theme === "dark" ? "text-white bg-gray-900"  : "text-gray-800 bg-white "}pt-2 h-60 flex items-center justify-between ` }>
<Link to="/" className="ml-9 flex items-center justify-center text-2xl font-extrabold">
  <span className="px- py-2 rounded-xl  backdrop-blur-md bg-gradient-to-r from-[#4A15F4] to-[#6B1A6B] 
    bg-clip-text text-transparent">
    Forsa
  </span>
  <span className={`ml-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
    -Tech
  </span>
</Link>
        <form className="rounded-2xl ring-2  p-1">
      
        <InputBase
  placeholder={theme === "dark" ? "Search " : "Search"}
  className={`hidden lg:inline w-80 h-7 rounded-lg px-3 py-1 
    ${theme === "dark" ? "bg-gray-800 text-blue-500/50" : "bg-white text-gray-900"}`}
  color="gray"
  pill="true"
  inputProps={{
    style: {
      color: theme === "dark" ? "white" : "gray", 
    }
  }}
/>
        <SearchIcon className="lg:hidden "  pill="true"/>
    </form>    

        <Button
        className= "w-15 h-15 flex bg-gradient-to-r from-blue-500 to-purple-500 items-center justify-center !rounded-3xl mr-8 hover:bg-gray-200 dark:hover:bg-gray-600  "
        onClick={() => dispatch(toggleTheme())}
        pill
      >
        {theme === "dark" ? 
          <FiSun className="text-emerald-50 text-2xl" /> :      
          <FiMoon className="text-emerald-50 text-2xl" />         
        }      </Button>
    </div>
  );
};
export default Header;
