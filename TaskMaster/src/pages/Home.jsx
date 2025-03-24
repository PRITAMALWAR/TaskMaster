import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTasks, FaChartLine, FaUserFriends, FaBell } from "react-icons/fa";

const Home = ({ user }) => {
  const navigate = useNavigate();
  const [taskStats, setTaskStats] = useState({
    totalTasks: 0,
    completed: 0,
    inProgress: 0,
    upcomingDue: 0,
  });

  // Fetch tasks and calculate stats
  useEffect(() => {
    const fetchTasksAndCalculateStats = () => {
      // Fetch tasks from localStorage (or an API in a real app)
      const tasks = JSON.parse(localStorage.getItem("tasks")) || {};

      // Calculate stats
      const totalTasks = Object.keys(tasks).length;
      const completed = Object.values(tasks).filter((task) => task.status === "Completed").length;
      const inProgress = Object.values(tasks).filter((task) => task.status === "In Progress").length;

      // Calculate upcoming due tasks (tasks due in the next 7 days)
      const today = new Date();
      const upcomingDue = Object.values(tasks).filter((task) => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        const timeDifference = dueDate.getTime() - today.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysDifference >= 0 && daysDifference <= 7;
      }).length;

      // Update state with calculated stats
      setTaskStats({
        totalTasks,
        completed,
        inProgress,
        upcomingDue,
      });
    };

    fetchTasksAndCalculateStats();
  }, []); 

  const features = [
    {
      title: "Task Management",
      description: "Create, organize, and track your tasks with our intuitive interface",
      icon: <FaTasks className="text-4xl text-blue-500 mb-4" />,
      action: () => navigate('/taskboard'),
    },
    {
      title: "Progress Tracking",
      description: "Monitor your productivity and task completion rates",
      icon: <FaChartLine className="text-4xl text-green-500 mb-4" />,
      action: () => navigate('/taskboard'),
    },
    {
      title: "Team Collaboration",
      description: "Assign tasks and collaborate with team members seamlessly",
      icon: <FaUserFriends className="text-4xl text-purple-500 mb-4" />,
      action: () => navigate('/taskform'),
    },
    {
      title: "Deadline Reminders",
      description: "Never miss important deadlines with our reminder system",
      icon: <FaBell className="text-4xl text-orange-500 mb-4" />,
      action: () => navigate('/taskform'),
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">TaskMaster</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your complete solution for efficient task management and team collaboration
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/taskboard')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Go to Task Board
              </button>
              <button
                onClick={() => navigate('/taskform')}
                className="border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-lg hover:bg-purple-50 transition-all"
              >
                Create New Task
              </button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-xl p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-blue-600">{taskStats.totalTasks}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{taskStats.completed}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-yellow-600">{taskStats.inProgress}</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Upcoming Due</p>
                  <p className="text-2xl font-bold text-red-600">{taskStats.upcomingDue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={feature.action}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-20">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6">Begin organizing your tasks and boosting your productivity today.</p>
          <button
            onClick={() => navigate(user ? '/taskboard' : '/signup')}
            className="bg-white text-purple-600 px-8 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
          >
            {user ? 'Go to Dashboard' : 'Sign Up Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;