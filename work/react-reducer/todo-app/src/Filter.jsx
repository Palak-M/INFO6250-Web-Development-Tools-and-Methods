import React, { useContext } from 'react';
import TodoContext from './context/TodoContext';


const Filter = () => {
  const todoContext = useContext(TodoContext);

  const filterTasksByStatus = (e) => {
    todoContext.filterTasksByStatus(e.target.value);
  };

};

export default Filter;