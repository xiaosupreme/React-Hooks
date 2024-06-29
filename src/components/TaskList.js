import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskList = ({ tasks }) => {
  const { dispatch } = useContext(TaskContext);
  const [editableTaskId, setEditableTaskId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleToggleComplete = (taskId) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: taskId });
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const handleStartEdit = (taskId, currentText) => {
    setEditableTaskId(taskId);
    setEditedText(currentText);
  };

  const handleCancelEdit = () => {
    setEditableTaskId(null);
    setEditedText('');
  };

  const handleSaveEdit = (taskId) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id: taskId, text: editedText } });
    setEditableTaskId(null);
    setEditedText('');
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {editableTaskId === task.id ? (
            <>
              <input type="text" className='input' value={editedText} onChange={(e) => setEditedText(e.target.value)}/>
              <div className="rightcon">
              <button onClick={() => handleSaveEdit(task.id)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id)}
              />
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.text}
              </span>
              <button onClick={() => handleStartEdit(task.id, task.text)}className='edit'>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)} className='delete'>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
