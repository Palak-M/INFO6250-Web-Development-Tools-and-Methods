import React, { useState, useContext } from 'react';
import spinner from './spinner.svg';
import TodoContext from './context/TodoContext';
const Login = () => {
  const todoContext = useContext(TodoContext);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const performLogin = () => {
    setIsLoading(true);
    todoContext.setLoginStatus(username);
    setIsLoading(false);
  };

  return (
    <div className="login">
      <input
        className="user-details"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      {isLoading ? (
        <img alt="spinner" src={spinner} />
      ) : (
        <button className="to-login" onClick={performLogin}>
          LOGIN
        </button>
      )}
    </div>
  );
};

export default Login;