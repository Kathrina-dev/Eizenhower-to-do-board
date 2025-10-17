import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from './context/AuthContext';

export const Todo = ({ urgency, importance }) => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const { userID } = useAuth();

  const getTask = () => {
    if (!userID) return;
    axios.get(`https://eizenhower-to-do-board-backend.onrender.com/task?id=${userID}`)
    .then((response) => {
      const filtered = response.data.tasks.filter(
        (t) => t.isUrgent === urgency && t.isImportant === importance
      );
      setTasks(filtered);
    }).catch((error) => {
      console.error("Error fetchinig task:", error);
    })
  }

  const addToDo = () => {
    if (task.trim()) {
        axios.post(`https://eizenhower-to-do-board-backend.onrender.com/task?id=${userID}`, { 
          task,
          isImportant: importance,
          isUrgent: urgency,
        })
        .then((response) => {
          console.log("Task created:", response.data);
          const { taskID, task: createdTask } = response.data;
          setTasks([...tasks, createdTask]);
          setTask("");
        })
        .catch((error) => {
          console.log("Adding task for user:", userID);
          console.error("Error creating task:", error);
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && task.trim()) {
      addToDo();
    }
  };

const deleteTask = (taskID, index) => {
  axios
    .delete("https://eizenhower-to-do-board-backend.onrender.com/task", {data: { taskID }})
    .then(() => {
      console.log(`Task ${taskID} deleted`);
      setTasks(tasks.filter((_, i) => i !== index));
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
    });
}

useEffect(() => {
  if (userID) {
    getTask();
  }
}, [userID]);


return (
  <>
    <div className="p-1 md:p-3">
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
            <button onClick={() => deleteTask(t.taskID, index)}className="mr-1">
              <img src="../public/delete-icon.png" className="w-3" alt="Delete task"/>
            </button>
          </li>
        ))}
      </ul>
    </div>

  </>
);
};
