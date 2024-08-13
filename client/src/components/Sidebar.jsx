import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../utils/queries";
import AuthService from "../utils/auth";
import logo from "../assets/logo.svg";

import { LogIn, LogOut, MessageSquare, Settings, UserPlus } from "lucide-react";

export default function Sidebar() {
  // get user info
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const { data, loading, error } = useQuery(GET_PROFILE, {
  //   variables: { id: user?._id }, // Pass the user ID
  //   skip: !user?._id, // Skip if user ID is not available
  // });

  console.log(AuthService.loggedIn());

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const userProfile = AuthService.getProfile();
      console.log("userprofile", userProfile);
      setUser(userProfile);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  const handleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    AuthService.logout();
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
      <div className="flex flex-col items-center gap-2">
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="w-full p-2 bg-interactive rounded-lg border border-border">
            <ul className="flex flex-col gap-1 text-sm">
              {isLoggedIn && (
                <>
                  <Link to="/">
                    <li className="flex items-center gap-2 bg-bgSecondary p-2 rounded-lg border border-border hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                      <MessageSquare size={20} className="text-primary" /> Chat
                    </li>
                  </Link>
                  <Link to="/settings">
                    <li className="flex items-center gap-2 bg-bgSecondary p-2 rounded-lg border border-border hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                      <Settings size={20} className="text-primary" /> Settings
                    </li>
                  </Link>
                  <li className="flex items-center gap-2 bg-bgSecondary p-2 rounded-lg border border-border hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300">
                    <LogOut size={20} className="text-primary" />
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {isLoggedIn && user ? (
          <button
            onClick={handleDropdown}
            className="flex w-full gap-2 bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
          >
            <div className="w-[50px] h-[50px] bg-primary rounded-full"></div>
            <div className="flex flex-col">
              <h2 className="font-bold text-left">{user.data.username}</h2>
              <span className="text-textSecondary text-sm">
                {user.data.email}
              </span>
            </div>
          </button>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <Link
              to="/login"
              className="flex items-center gap-2 bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
            >
              <LogIn size={20} className="text-primary" />
              Login
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
            >
              <UserPlus size={20} className="text-primary" />
              Signup
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
