import React, { useState } from 'react';
import './Sidebar.css';
import { FiHome } from "react-icons/fi";
import { FaBuildingUser } from "react-icons/fa6";
import { MdOutlinePolicy } from "react-icons/md";
import { AiOutlineLogin, AiOutlineComment } from "react-icons/ai";
//import Logo from '../assets/images/logoForsa.PNG';



const Sidebar = () => {
  const [selected, setSelected] = useState(0);

  const menuItems = [
    { icon: <FiHome />, label: 'Dashboard' },
    { icon: <FaBuildingUser />, label: 'Companies' },
    { icon: <MdOutlinePolicy />, label: 'Policies' },
    { icon: <AiOutlineComment />, label: 'Complaints' },
    { icon: <AiOutlineLogin />, label: 'Log out' },
  ];

  return (
    <div className="Sidebar">
      <div className="logo">
      <img src="/images/logoForsa.PNG" alt="Forsa Tech Logo" />
      <span>FORSA<span></span><span>TECH</span></span>
      </div>
      

      <div className="menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menuItem ${selected === index ? 'active' : ''}`}
            onClick={() => setSelected(index)}
          >
            <div>{item.icon}</div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
