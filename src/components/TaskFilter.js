import React, { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import './TaskFilter.css'; 

const TaskFilter = () => {
  const { state, dispatch } = useContext(TaskContext);
  const { tasks, filter } = state;

  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterChange = (newFilter) => {
    dispatch({ type: 'SET_FILTER', payload: newFilter });
    setActiveFilter(newFilter); 
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'incomplete':
        return !task.completed;
      default:
        return true;
    }
  });

  return (
    <div className="task-filter-container"> {}
      <button
        className={activeFilter === 'all' ? 'active' : ''}
        onClick={() => handleFilterChange('all')}
      >
        All
      </button>
      <button
        className={activeFilter === 'completed' ? 'active' : ''}
        onClick={() => handleFilterChange('completed')}
      >
        Completed
      </button>
      <button
        className={activeFilter === 'incomplete' ? 'active' : ''}
        onClick={() => handleFilterChange('incomplete')}
      >
        Incomplete
      </button>
    </div>
  );
};

export default TaskFilter;
