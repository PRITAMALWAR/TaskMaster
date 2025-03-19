import { useState } from "react";

const TaskForm = ({ fetchTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "To-Do"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('https://taskmaster-444af-default-rtdb.firebaseio.com/tasks.json', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    });
    setTask({ title: "", description: "", dueDate: "", priority: "low", status: "To-Do" });
    fetchTasks();
  };

  return (
    <form className="bg-white p-4 rounded shadow-md" onSubmit={handleSubmit}>
      <input className="w-full border mb-2 p-2" placeholder="Title"
        value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} />
      <textarea className="w-full border mb-2 p-2" placeholder="Description"
        value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })}></textarea>
      <input type="date" className="w-full border mb-2 p-2"
        value={task.dueDate} onChange={(e) => setTask({ ...task, dueDate: e.target.value })} />
      <select className="w-full border mb-2 p-2"
        value={task.priority} onChange={(e) => setTask({ ...task, priority: e.target.value })}>
        <option>low</option><option>medium</option><option>high</option>
      </select>
      <select className="w-full border mb-2 p-2"
        value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
        <option>To-Do</option><option>In Progress</option><option>Completed</option>
      </select>
      <button className="bg-blue-500 text-white w-full p-2 rounded">Add Task</button>
    </form>
  );
};

export default TaskForm;
