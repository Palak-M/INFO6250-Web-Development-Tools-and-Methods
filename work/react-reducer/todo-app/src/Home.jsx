import React, { useContext, useEffect } from 'react';
import TodoContext from './context/TodoContext';
import Theme from './Theme';
import Todos from './Todos';
import Login from './Login';

const Home = () => {
  const todoContext = useContext(TodoContext);

  useEffect(
    () => {
      todoContext.getLoginStatus();
    },

    []
  );

  let content;

  if (todoContext.isLoggedIn) {
    content = (
      <>
        <div className="heading">
          Welcome <i>{todoContext.username.toUpperCase()}</i>
          <Theme />
        </div>
        <p className="error-msg">{todoContext.error}</p>

        <Todos />
      </>
    );
  } else {
    content = <Login />;
  }

  return <div>{content}</div>;
};

export default Home;