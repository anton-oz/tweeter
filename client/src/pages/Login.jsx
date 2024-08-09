import { useState } from "react";
// import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    // Based on the input type, we set the state of either email, username, and password
    if (inputType === "username") {
      setUsername(inputValue);
    } else if (inputType === "password") {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <h2 className="text-center mb-3">Login Page</h2>
      <form
        className="max-w-sm mx-auto flex flex-col items-center"
        onSubmit={handleFormSubmit}
      >
        <input
          className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          name="username"
          value={username}
          onChange={handleInputChange}
          placeholder="username..."
        />
        <input
          className="mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder="password..."
        />
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
