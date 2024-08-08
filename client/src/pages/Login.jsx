import { useState } from "react";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'username') {
      setUsername(inputValue);
    } 
    else if (inputType === 'password') {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!username) {
      return alert('please enter a username')
    }
    else if (!password) {
      return alert('please enter a password')
    }
    // If everything goes according to plan, we want to clear out the input after a successful registration.
    alert(`Hello ${username}`);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleFormSubmit}>
        <input 
          type='text' 
          name='username' 
          value={username}
          onChange={handleInputChange}
          placeholder='username...' 
        />
        <input 
          type='password' 
          name='password'
          value={password}
          onChange={handleInputChange}
          placeholder='password' 
        />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default Login;