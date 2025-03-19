import React from "react";
import { Box } from "@chakra-ui/react";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";

const Tasks = () => {
  return (
    <Box>
      <Box p={4}>
        <TaskForm />
        <TaskBoard />
      </Box>
    </Box>
  );
};

export default Tasks;