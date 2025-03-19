import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Tasks from "./pages/Tasks";
import Home from "./pages/Tasks"; 

const App = () => {
  return (
      <Box>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Box>
  );
};

export default App;