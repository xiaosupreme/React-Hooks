
import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskList from './TaskList';
import useFocus from '../hooks/useFocus';

const TaskManager = () => {
  const { state, dispatch } = useContext(TaskContext);
  const { tasks, filter } = state;
  const [newTaskText, setNewTaskText] = useState('');
  const inputRef = useFocus();

  const handleAddTask = () => {
    if (newTaskText.trim() === '') return;
    const newTask = { id: Date.now(), text: newTaskText, completed: false };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    setNewTaskText('');
    inputRef.current.focus();
  };

  const handleUpdateTask = (taskId, newText) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, text: newText } });
  };

  const handleToggleComplete = (taskId) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: taskId });
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'incomplete':
        return !task.completed;
      default:
        return true; // 'all' filter
    }
  });

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter task..."
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <TaskList
        tasks={filteredTasks}
        onUpdateTask={handleUpdateTask}
        onToggleComplete={handleToggleComplete}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default TaskManager;
