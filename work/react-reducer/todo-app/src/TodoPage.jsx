import React, { useContext } from 'react';

import TodoContext from './context/TodoContext';

const TodoPage = () => {
  const todoContext = useContext(TodoContext);

  const logout = () => {
    todoContext.setLogout();
  };

  return (
    <div>
      <div className="panel"><b>INVENTORY TRACKER</b></div>
      <div className="error-msg">{todoContext.networkError}</div>
      <ul className="inventory-page">
        {todoContext.isLoggedIn && (
          <button className="logout action" onClick={logout}>
            LOGOUT
          </button>
        )}
      </ul>
    </div>
  );
};

export default TodoPage;