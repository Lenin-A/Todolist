import React, { useState, useEffect } from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import axios from 'axios';
import './App.css'; // Importing the CSS for styling

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Simulating login

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setTasks(response.data.slice(0, 10)); // Store only 10 tasks for better UI
      } catch (error) {
        setError('Error fetching tasks');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add new task to the list
  const addTask = (task) => {
    setTasks([...tasks, { title: task, id: tasks.length + 1 }]);
  };

  // Delete a task by ID
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <h1 className="title">My Todos</h1>
      {!isLoggedIn ? (
        <button className="login-btn" onClick={() => setIsLoggedIn(true)}>Login</button>
      ) : (
        <>
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
          <TaskInput addTask={addTask} />
          {loading ? (
            <p className="loading">Loading tasks...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <TaskList tasks={tasks} deleteTask={deleteTask} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
