import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import AuthService from "../utils/auth";
import logo from "../assets/logo.svg";

export default function Sidebar() {
  // get user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const userProfile = AuthService.getProfile();
      setUser(userProfile);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-screen w-[250px] fixed flex flex-col justify-between p-4 pb-8 bg-bgSecondary border-r border-border">
      <Link to="/">
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-2">
          <img src={logo} alt="Tweeter logo" />
          Tweeter
        </h1>
      </Link>
      {/* Make it get the users info */}
      <div className="relative">
        {isLoggedIn && user ? (
          <button
            onClick={handleDropdown}
            className="flex gap-2 bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
          >
            <div className="w-[50px] h-[50px] bg-primary rounded-full"></div>
            <div className="flex flex-col">
              <h2 className="font-bold">{user.name}</h2>
              <span className="text-textSecondary text-sm">{user.email}</span>
            </div>
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              className="bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
            >
              Signup
            </Link>
          </div>
        )}

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
                    <Link to="/login" className="block w-full h-full">
                      Login
                    </Link>
                  </li>
                  <li className="bg-interactive mb-1 p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                    <Link to="/signup" className="block w-full h-full">
                      Sign Up
                    </Link>
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
