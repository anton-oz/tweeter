import { useState } from "react";
import logo from "../assets/logo.svg";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addProfile, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };
  return (
    <div className="bg-bgSecondary border border-border rounded-lg p-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <img src={logo} alt="tweeter logo" />
          Tweeter
        </h2>
        <p className="text-sm text-textSecondary">
          Join Tweeter today—connect, chat, and grow with vibrant communities!
        </p>
      </div>
      <form className=" flex flex-col w-full gap-4" onSubmit={handleFormSubmit}>
        <input
          className="bg-interactive border border-border p-3 text-text rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none"
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
          placeholder="username..."
        />
        <input
          className="bg-interactive border border-border p-3 text-text rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none"
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="email..."
        />
        <input
          className="bg-interactive border border-border p-3 text-text rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out focus:outline-none"
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="password..."
        />
        <div>
          <button
            type="submit"
            className="bg-interactive border border-border px-8 py-2 mt-4 text-text rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
export default Signup;
