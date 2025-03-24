import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from '../assets/logo.png';

const Navbar = ({ user, toggleDarkMode, darkMode }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-4 flex justify-between items-center shadow-lg rounded-b-lg z-50 dark:bg-gray-900 dark:text-white">
      {/* Left Side - Logo and Title */}
      <div className="flex items-center space-x-2">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-12 " />
        </Link>
      </div>

      {/* Right Side - Menu Items for Large Screens */}
      <div className="hidden lg:flex items-center space-x-6">
        {user ? (
          <>
            <Link to="/" className="text-white hover:text-gray-200 transition">Home</Link>
            <Link to="/taskboard" className="text-white hover:text-gray-200 transition">TaskBoard</Link>
            <Link to="/taskform" className="text-white hover:text-gray-200 transition">New Task</Link>
            <Link to="/profile" className="text-white hover:text-gray-200 transition">Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="text-white hover:text-gray-200 transition">Home</Link>
            <Link to="/login" className="text-white hover:text-gray-200 transition">Login</Link>
            <Link to="/signup" className="text-white hover:text-gray-200 transition">Signup</Link>
          </>
        )}
        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="text-white text-xl transition">
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Hamburger Icon for Small Screens */}
      <button
        className="lg:hidden text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu (Toggled on Smaller Screens) */}
      <div
        className={`lg:hidden absolute top-0 left-0 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white p-6 space-y-4 transform transition-transform duration-300 ease-in-out rounded-b-lg ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {user ? (
          <>
            <Link to="/" className="block text-white hover:text-gray-200 transition" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/taskboard" className="block text-white hover:text-gray-200 transition" onClick={() => setMenuOpen(false)}>
              TaskBoard
            </Link>
            <Link to="/taskform" className="block text-white hover:text-gray-200 transition" onClick={() => setMenuOpen(false)}>
              New Task
            </Link>
            <Link to="/profile" className="block text-white hover:text-gray-200 transition" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="block bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="block text-white hover:text-gray-200 transition" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link to="/login" className="block text-white hover:text-gray-200 transition" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="block text-white hover:text-gray-200 transition" onClick={() => setMenuOpen(false)}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;