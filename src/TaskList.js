import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div className="task-list">
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-item">
            {task.title}
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
