import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaCheck, FaArrowRight } from 'react-icons/fa';

export default function TaskBoard() {
  const [tasks, setTasks] = useState({});
  const [draggedTask, setDraggedTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      let updatedTasks = { ...savedTasks };

      // Check for overdue tasks
      Object.keys(updatedTasks).forEach((taskId) => {
        const task = updatedTasks[taskId];
        if (new Date(task.dueDate) < new Date() && task.status !== "Completed") {
          updatedTasks[taskId].status = "Overdue";
        }
      });

      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    } else {
      const dummyData = {
        "task1": {
          id: "task1",
          title: "Task One",
          description: "Complete the project setup",
          status: "To-Do",
          dueDate: "2025-03-25",
          priority: "High",
          assignedTo: "John Doe",
          recurrence: "None"
        },
        "task2": {
          id: "task2",
          title: "Task Two",
          description: "Develop the main functionality",
          status: "In Progress",
          dueDate: "2025-03-30",
          priority: "Medium",
          assignedTo: "Jane Smith",
          recurrence: "Daily"
        },
        "task3": {
          id: "task3",
          title: "Task Three",
          description: "Test the application",
          status: "Completed",
          dueDate: "2025-03-20",
          priority: "Low",
          assignedTo: "Alice Brown",
          recurrence: "None"
        },
        "task4": {
          id: "task4",
          title: "Task Four",
          description: "Write documentation",
          status: "To-Do",
          dueDate: "2025-04-01",
          priority: "Medium",
          assignedTo: "Bob White",
          recurrence: "None"
        },
      };
      setTasks(dummyData);
      localStorage.setItem("tasks", JSON.stringify(dummyData));
    }
  }, []);

  const handleDrop = (status) => {
    if (draggedTask) {
      const updatedTasks = { ...tasks };
      updatedTasks[draggedTask.id].status = status;
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setDraggedTask(null);
    }
  };

  const handleDelete = (taskId) => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleEdit = (task) => {
    navigate("/taskform", { state: task });
  };

  const handleStatusChange = (taskId, status) => {
    if (tasks[taskId].status === "Overdue") {
      alert("This task is overdue and cannot be updated.");
      return;
    }

    const updatedTasks = { ...tasks };
    updatedTasks[taskId].status = status;
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const groupedTasks = {
    "To-Do": [],
    "In Progress": [],
    "Completed": [],
    "Overdue": [] 
  };

  Object.keys(tasks).forEach((id) => {
    const task = tasks[id];

    // Check if the task is overdue
    if (new Date(task.dueDate) < new Date() && task.status !== "Completed") {
      groupedTasks["Overdue"].push(task);
    } else {
      groupedTasks[task.status].push(task);
    }
  });

  const taskCounts = {
    "To-Do": groupedTasks["To-Do"].length,
    "In Progress": groupedTasks["In Progress"].length,
    "Completed": groupedTasks["Completed"].length,
    "Overdue": groupedTasks["Overdue"].length // Count Overdue tasks
  };

  return (
    <div className="container mt-22 mx-auto p-6 md:p-12 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Task Board</h1>
        <p className="text-gray-600 text-lg">Manage your tasks effectively</p>
      </div>

      {/* Go to Home Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleGoHome}
          className="bg-gray-600 text-white py-2 px-6 rounded-lg text-lg hover:bg-gray-700 transition"
        >
          Go to Home
        </button>
      </div>

      {/* Task Counts */}
      <div className="flex justify-center gap-8 mb-8">
        {Object.entries(taskCounts).map(([status, count]) => (
          <div key={status} className="bg-white p-6 rounded-xl text-center w-full sm:w-1/3">
            <h3 className={`text-3xl font-semibold ${status === "To-Do" ? "text-blue-600" : status === "In Progress" ? "text-yellow-600" : status === "Completed" ? "text-green-600" : "text-red-600"}`}>{count}</h3>
            <p className="text-gray-600 text-sm">{status}</p>
          </div>
        ))}
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(groupedTasks).map((status) => (
          <div
            key={status}
            className="p-4 bg-white rounded-xl"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
          >
            <h3 className={`text-xl font-semibold text-center ${status === "To-Do" ? "text-blue-600" : status === "In Progress" ? "text-yellow-600" : status === "Completed" ? "text-green-600" : "text-red-600"} mb-6`}>
              {status}
            </h3>
            <div>
              {groupedTasks[status].map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  className="bg-gray-50 p-4 rounded-lg mb-6"
                >
                  <h4 className="font-medium text-lg text-gray-800">{task.title}</h4>
                  <p className="text-sm text-gray-600">{task.description}</p>

                  <div className="mt-4">
                    {/* Assigned To */}
                    <p className="text-xs text-gray-500">Assigned To: {task.assignedTo}</p>

                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xs text-gray-500">Due: {task.dueDate || 'N/A'}</p>
                      <p className="text-xs text-gray-500">Priority: {task.priority}</p>
                    </div>

                    <div className="flex justify-between mt-6">
                      {status === "To-Do" && (
                        <button
                          onClick={() => handleStatusChange(task.id, "In Progress")}
                          className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition"
                        >
                          <FaArrowRight className="mr-1 inline" /> Start
                        </button>
                      )}
                      {status === "In Progress" && (
                        <button
                          onClick={() => handleStatusChange(task.id, "Completed")}
                          className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition"
                        >
                          <FaCheck className="mr-1 inline" /> Complete
                        </button>
                      )}
                    </div>

                    <div className="flex justify-between mt-6">
                      {/* Conditionally render Edit button only if task is not completed */}
                      {status !== "Completed" && status !== "Overdue" && (
                        <button
                          onClick={() => handleEdit(task)}
                          className="text-yellow-600 hover:text-yellow-700 text-sm"
                        >
                          <FaEdit /> Edit
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(task.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        <FaTrashAlt /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
