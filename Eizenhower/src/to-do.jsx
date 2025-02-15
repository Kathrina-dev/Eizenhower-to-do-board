import React, { useState } from 'react';

export const Todo = ({ urgency, importance }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && task.trim()) {
      addToDo();
    }
  };

  const addToDo = () => {
    if (task.trim()) {
      setTasks([...tasks, { task, urgency, importance }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="p-1 md:p-3">
        {/* Flex container for input and button */}
        <div className="flex w-full pl-1 mt-1 border border-gray-500 rounded-md justify-between items-center">
          <input
            className="p-1 w-11/12 outline-none"
            placeholder="Enter task"
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={handleKeyDown}
            value={task}
          />
          <button onClick={addToDo} className=" mr-1">
            <img src="../public/add-sign.png" className="w-6" alt="Add task" />
          </button>
        </div>
      </div>

      <div className="p-1 md:p-3 flex overflow-y-auto justify-start">
        <ul className="w-full">
          {tasks.map((t, index) => (
            <li key={index} className="p-1 md:p-3 mb-1 flex justify-between items-center border-b border-gray-300 pb-1">
            <span>{t.task}</span>
            <button onClick={() => deleteTask(index)}className="mr-1">
          <img src="../public/delete-icon.png" className="w-3" alt="Delete task"
          />
        </button>
      </li>
    ))}
  </ul>
</div>

    </>
  );
};
