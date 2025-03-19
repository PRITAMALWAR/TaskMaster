// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import TaskBoard from "../components/TaskBoard";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const taskRef = ref(db, "tasks");
    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      const taskList = [];
      for (let key in data) {
        taskList.push({ id: key, ...data[key] });
      }
      setTasks(taskList);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">TaskMaster Dashboard</h1>
      <TaskBoard tasks={tasks} />
    </div>
  );
};

export default Home;
