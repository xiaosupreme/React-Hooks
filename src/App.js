import React from 'react';
import TaskManager from './components/TaskManager';
import TaskFilter from './components/TaskFilter';
import './App.css'; 

const App = () => {
  return (
    <div>
      <TaskManager />
      <TaskFilter />
    </div>
  );
};

export default App;
