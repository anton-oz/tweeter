import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import logo from "../assets/logo.svg";

import Auth from "../utils/auth";
import { LogIn } from "lucide-react";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="bg-bgSecondary border border-border rounded-lg p-8 flex flex-col gap-8 w-[530px] items-center">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-3xl font-bold tracking-tight">
          <Link to="/" className="cursor-pointer flex items-center gap-2">
            <img src={logo} alt="tweeter logo" />
            Tweeter
          </Link>
        </h2>
        <p className="text-sm text-textSecondary">
          Welcome back! Please login to your account.
        </p>
      </div>
      <form className="flex flex-col w-full gap-4" onSubmit={handleFormSubmit}>
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
            className="flex items-center gap-3 bg-interactive border border-border px-4 py-2 mt-4 text-text rounded-lg hover:shadow-hover hover:shadow-primary transition-all duration-300 ease-in-out"
          >
            <LogIn size={20} className="text-primary" />
            Login
          </button>
        </div>
        <p className="text-sm text-textSecondary">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
