import React, { useState } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import initialTasks from "../data/tasks"; 

const TaskBoard = () => {
  const [tasks, setTasks] = useState(initialTasks); 

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit task with ID:", id);
  };

  return (
    <Flex gap={4}>
      {["To-Do", "In Progress", "Completed"].map((status) => (
        <Box key={status} flex={1}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            {status}
          </Text>
          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
        </Box>
      ))}
    </Flex>
  );
};

export default TaskBoard;
