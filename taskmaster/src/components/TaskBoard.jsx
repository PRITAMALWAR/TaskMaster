import { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskBoard = () => {
  const [tasks, setTasks] = useState({});

  const fetchTasks = async () => {
    const res = await fetch('https://taskmaster-444af-default-rtdb.firebaseio.com/tasks.json');
    const data = await res.json();
    setTasks(data || {});
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const getTasksByStatus = (status) =>
    Object.entries(tasks).filter(([_, task]) => task.status === status);

  return (
    <div className="p-6">
      <TaskForm fetchTasks={fetchTasks} />
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {["To-Do", "In Progress", "Completed"].map((status) => (
          <div key={status}>
            <h3 className="text-xl font-bold mb-2">{status}</h3>
            {getTasksByStatus(status).map(([id, task]) => (
              <TaskItem key={id} task={task} taskId={id} fetchTasks={fetchTasks} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
