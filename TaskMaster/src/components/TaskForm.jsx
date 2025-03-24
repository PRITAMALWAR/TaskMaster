import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TaskForm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "To-Do",
    assignedTo: "",
    recurrence: "None",
    id: "",
  });

  useEffect(() => {
    if (state) {
      setForm(state);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if task is overdue before submission
    if (new Date(form.dueDate) < new Date() && form.status !== "Completed") {
      alert("This task is overdue and cannot be updated.");
      return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || {};

    if (form.id) {
      tasks[form.id] = form;
    } else {
      const newTask = { ...form, id: Date.now().toString() };
      tasks[newTask.id] = newTask;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));

    navigate("/taskboard");
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 min-h-screen mt-16 py-12 px-6 md:px-10">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg border border-gray-200 shadow-[#f0f0f0]">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          {form.id ? "Edit Task" : "Create New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Task Title & Assigned To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-lg text-gray-700 mb-2">
                Task Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="assignedTo" className="text-lg text-gray-700 mb-2">
                Assigned To
              </label>
              <input
                id="assignedTo"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="Assigned to"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Description and Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Task description"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                rows="4"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="priority" className="text-lg text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          {/* Due Date and Recurrence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label htmlFor="dueDate" className="text-lg text-gray-700 mb-2">
                Due Date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="recurrence" className="text-lg text-gray-700 mb-2">
                Recurrence
              </label>
              <select
                id="recurrence"
                name="recurrence"
                value={form.recurrence}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option value="None">None</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg text-xl w-full sm:w-auto hover:bg-blue-700 transition"
            >
              {form.id ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
