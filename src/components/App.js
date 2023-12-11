import React, { useState, useEffect } from 'react';
import './App.css';

const initialTasks = [
  { id: 1, text: 'Task 1' },
  { id: 2, text: 'Task 2' },
  { id: 3, text: 'Task 3' },
  { id: 4, text: 'Task 4' },
  { id: 5, text: 'Task 5' },
  { id: 6, text: 'Task 6' },
  { id: 7, text: 'Task 7' },
  { id: 8, text: 'Task 8' },
  { id: 9, text: 'Task 9' },
  { id: 10, text: 'Task 10' },
];

const App = () => {
  const [tasks, setTasks] = useState({
    today: [],
    tomorrow: [],
    thisWeek: [],
    nextWeek: [],
    unplanned: initialTasks,
  });

  useEffect(() => {
    // Populate unplanned tasks on page load
    setTasks((prevTasks) => ({ ...prevTasks, unplanned: initialTasks }));
  }, []);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId.toString());
  };

  const handleDrop = (e, targetBlock) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('text/plain'), 10);

    // Update tasks after drop
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Remove task from its previous block
      Object.keys(updatedTasks).forEach((block) => {
        updatedTasks[block] = updatedTasks[block].filter((task) => task.id !== taskId);
      });

      // Add task to the target block
      updatedTasks[targetBlock] = [...updatedTasks[targetBlock], { id: taskId, text: `Task ${taskId}` }];

      return updatedTasks;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <div className="block" onDrop={(e) => handleDrop(e, 'today')} onDragOver={handleDragOver}>
        <h2>Today</h2>
        {tasks.today.map((task) => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.text}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(e) => handleDrop(e, 'tomorrow')} onDragOver={handleDragOver}>
        <h2>Tomorrow</h2>
        {tasks.tomorrow.map((task) => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.text}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(e) => handleDrop(e, 'thisWeek')} onDragOver={handleDragOver}>
        <h2>This Week</h2>
        {tasks.thisWeek.map((task) => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.text}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(e) => handleDrop(e, 'nextWeek')} onDragOver={handleDragOver}>
        <h2>Next Week</h2>
        {tasks.nextWeek.map((task) => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.text}
          </div>
        ))}
      </div>
      <div className="block" onDrop={(e) => handleDrop(e, 'unplanned')} onDragOver={handleDragOver}>
        <h2>Unplanned</h2>
        {tasks.unplanned.map((task) => (
          <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
            {task.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

