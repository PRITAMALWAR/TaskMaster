import { useEffect, useState } from "react";
import { onValue, ref, set, update, remove, push } from "firebase/database";
import { db } from "../firebase";

export default function TaskBoard() {
  const [tasks, setTasks] = useState({});
  const [draggedTask, setDraggedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "",
    status: "To-Do",
    assignedTo: ""
  });

  useEffect(() => {
    const tasksRef = ref(db, "tasks");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val() || {};
      setTasks(data);
    });
  }, []);

  const handleDrop = (status) => {
    if (draggedTask) {
      const taskRef = ref(db, `tasks/${draggedTask.id}`);
      update(taskRef, { status });
      setDraggedTask(null);
    }
  };

  const handleDelete = (taskId) => {
    const taskRef = ref(db, `tasks/${taskId}`);
    remove(taskRef);
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setForm(task);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      const taskRef = ref(db, `tasks/${editingTask}`);
      update(taskRef, form);
      setEditingTask(null);
    } else {
      const newTaskRef = push(ref(db, "tasks"));
      set(newTaskRef, form);
    }
    setForm({
      title: "",
      description: "",
      dueDate: "",
      priority: "",
      status: "To-Do",
      assignedTo: ""
    });
  };

  const groupedTasks = {
    "To-Do": [],
    "In Progress": [],
    "Completed": []
  };

  Object.keys(tasks).forEach((id) => {
    const task = tasks[id];
    task.id = id;
    groupedTasks[task.status]?.push(task);
  });

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="p-2 border rounded" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded" required />
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} className="p-2 border rounded" required />
        <select name="priority" value={form.priority} onChange={handleChange} className="p-2 border rounded" required>
          <option value="">Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="p-2 border rounded" required>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <input name="assignedTo" value={form.assignedTo} onChange={handleChange} placeholder="Assigned To" className="p-2 border rounded" />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded col-span-full md:col-span-1">{editingTask ? "Update Task" : "Add Task"}</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(groupedTasks).map((status) => (
          <div
            key={status}
            className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow min-h-[400px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
          >
            <h2 className="text-xl font-bold mb-2 text-center">{status}</h2>
            {groupedTasks[status].map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(task)}
                className="bg-white dark:bg-gray-700 p-3 rounded mb-3 shadow cursor-move"
              >
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Due: {task.dueDate}</p>
                <p className="text-xs">Priority: {task.priority}</p>
                <p className="text-xs">Assigned to: {task.assignedTo || "N/A"}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-sm bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}