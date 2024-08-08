import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Sidebar() {
  // get user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-screen w-[250px] fixed flex flex-col justify-between p-4 pb-8 bg-bgSecondary border-r border-border">
      <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
        <Link to="/"><img src={logo} alt="Tweeter logo" /></Link>
        Tweeter
      </h1>
      
      {/* Make it get the users info */}
      <div className="relative">
        <button
          onClick={handleDropdown}
          className="flex gap-2 bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
        >
          <div className="w-[50px] h-[50px] bg-primary rounded-full"></div>
          <div className="flex flex-col">
            <h2 className="font-bold">Owen Kanzler</h2>
            <span className="text-textSecondary text-sm">oj.kanz1@gmail.com</span>
          </div>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 bottom-20 bg-iteractive p-2 w-48 rounded-md shadow-lg z-10">
            <ul>
              {isLoggedIn ? (
              <>
                <li className="bg-interactive mb-1 p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="bg-interactive mb-1 p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="bg-interactive mb-1 p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                  <Link to="/logout">Logout</Link>
                </li>
              </>
              ) : (
                <>
                  <li className="bg-interactive mb-1 p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                    <Link to="/login" className="block w-full h-full">Login</Link>
                  </li>
                  <li className="bg-interactive mb-1 p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                    <Link to="/signup" className="block w-full h-full">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

