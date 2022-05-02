import React, { useContext } from 'react';

import TodoPage from './TodoPage';
import Home from './Home';
import './App.css';
import TodoContext from './context/TodoContext';

const App = () => {
  const todoContext = useContext(TodoContext);

  return (
    <>
      <div className={`app ${todoContext.theme ? todoContext.theme : ''}`}>
        <TodoPage />
        <Home />
      </div>
    </>
  );
};

export default App;