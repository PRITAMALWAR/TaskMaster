import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { ref, push, update } from "firebase/database";
import { useState, useEffect } from "react";

export default function TaskForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "To-Do"
  });

  useEffect(() => {
    if (state) setTask(state);
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.id) {
      update(ref(db, "tasks/" + task.id), task);
    } else {
      push(ref(db, "tasks"), task);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto space-y-4">
      <input
        type="text"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        placeholder="Title"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        placeholder="Description"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="date"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        className="w-full border p-2 rounded"
        required
      />
      <select
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        className="w-full border p-2 rounded"
      >
        <option>To-Do</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {task.id ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
