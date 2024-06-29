import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TaskProvider } from './context/TaskContext';

ReactDOM.render(
  <React.StrictMode>
    <div className="app-container">
    <div className="centercontainer">
    <TaskProvider>
      <App />
    </TaskProvider>
    </div>
    <footer className="footer">
   
      </footer>
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);
