import React, { useEffect, useContext } from 'react';
import TodoContext from './context/TodoContext';

const Theme = () => {
  const todoContext = useContext(TodoContext);

  useEffect(() => {
    todoContext.getTheme(todoContext.username);

  }, []);

  const changeTheme = (e) => {
    let themeVal = e.target.value;
    todoContext.setTheme(todoContext.username, themeVal);
  };
  return (
  
    <select className="theme" value={todoContext.theme} onChange={changeTheme}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="darkest">Darkest</option>
    </select>
  
  );
};

export default Theme;