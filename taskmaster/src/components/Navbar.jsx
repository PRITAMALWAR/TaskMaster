import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from '../assets/logo.png'; 

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-15" /> 
        <span className="text-xl font-bold">TaskMaster</span> 
      </div>

      <div className="space-x-4">
        {user ? (
          <>
            <Link to="/" className="text-white hover:text-gray-200">Home</Link>
            <Link to="/taskboard" className="text-white hover:text-gray-200">TaskBoard</Link>
            <Link to="/taskform" className="text-white hover:text-gray-200">New Task</Link>
            <Link to="/profile" className="text-white hover:text-gray-200">Profile</Link>
            <button onClick={handleLogout} className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:text-gray-200">Login</Link>
            <Link to="/signup" className="text-white hover:text-gray-200">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
