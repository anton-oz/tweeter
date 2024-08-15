import { Delete, Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AuthService from "../utils/auth";

import { useMutation } from "@apollo/client";
import { REMOVE_PROFILE, UPDATE_PROFILE } from "../utils/mutations";

const Settings = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [removeProfile] = useMutation(REMOVE_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      const response = await updateProfile({
        variables: {
          profileId: user.data._id,
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      if (response) {
        setUser((prevUser) => ({
          ...prevUser,
          data: response,
        }));
      }
      window.location.replace("/settings");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await removeProfile({
        variables: {
          profileId: user.data._id,
        },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      AuthService.logout();
      window.location.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Sidebar />
      <main className="pl-[17.75rem] p-8 flex flex-col h-screen w-screen">
        {isLoggedIn ? (
          <>
            <h2 className="text-2xl tracking-tight">Settings:</h2>
            <div className="flex flex-col gap-4 mt-10">
              <div className="p-4 bg-interactive w-fit border border-border rounded-lg">
                <h3 className="text-xl mb-2 tracking-tight">Profile:</h3>
                <div className="flex gap-1">
                  <span className="font-bold">Username:</span>
                  <span className="text-textSecondary">
                    {user.data.username}
                  </span>
                </div>
                <div className="flex gap-1">
                  <span className="font-bold">Email:</span>
                  <span className="text-textSecondary">{user.data.email}</span>
                </div>
              </div>
              <form
                onSubmit={handleProfileUpdate}
                className="p-4 bg-interactive w-full xl:max-w-[50%] border border-border rounded-lg"
              >
                <h3 className="text-xl mb-2 tracking-tight">Edit Profile:</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="font-bold">
                      Username:
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formState.username}
                      onChange={handleChange}
                      className="p-2 bg-bgSecondary border border-border rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-bold">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="p-2 bg-bgSecondary border border-border rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-bold">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formState.password}
                      onChange={handleChange}
                      className="p-2 bg-bgSecondary border border-border rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex items-center gap-3 bg-bgSecondary border border-border px-4 py-2 mt-4 text-text rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out"
                    >
                      <Send size={20} className="text-primary" />
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <div>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-3 bg-interactive border border-border px-4 py-2 mt-4 text-text rounded-lg hover:shadow-hover hover:shadow-[#E54D2E] transition-all duration-300 ease-in-out"
                >
                  <Delete size={20} className="text-[#E54D2E]" />
                  Delete Account
                </button>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-2xl tracking-tight">Please Log in</h2>
        )}
      </main>
    </div>
  );
};

export default Settings;
