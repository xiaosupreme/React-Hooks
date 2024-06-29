
import React, { createContext, useReducer, useEffect } from 'react';

export const TaskContext = createContext();

const initialState = {
  tasks: [],
  filter: 'all', 
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, text: action.payload.text } : task
        ),
      };
    case 'TOGGLE_COMPLETE':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch({ type: 'SET_TASKS', payload: storedTasks });
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>;
};
