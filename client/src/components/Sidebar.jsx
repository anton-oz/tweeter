import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROFILE } from "../utils/queries";
import AuthService from "../utils/auth";
import logo from "../assets/logo.svg";

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
      <div className="relative">
        {isLoggedIn && user ? (
          <button
            onClick={handleDropdown}
            className="flex gap-2 bg-interactive p-2 rounded-lg border border-border items-center hover:border-primary cursor-pointer hover:shadow-hover transition-all duration-300"
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
                    <button onClick={handleLogout}>Logout</button>
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
