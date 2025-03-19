import React, { useEffect, useState } from "react";
import {  Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import TaskBoard from "./components/TaskBoard";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/taskboard" element={user ? <TaskBoard /> : <Navigate to="/login" />} />
        <Route path="/taskitem/:id" element={user ? <TaskItem /> : <Navigate to="/login" />} />
        <Route path="/taskform" element={user ? <TaskForm /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
