import React from "react";
import { Box, Text, Badge, Flex, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TaskItem = ({ task, onDelete, onEdit }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={2} bg="white">
      <Text fontSize="lg" fontWeight="bold">{task.title}</Text>
      <Text>{task.description}</Text>
      <Badge colorScheme={task.priority === "High" ? "red" : "green"}>
        {task.priority}
      </Badge>
      <Text>Due: {task.dueDate}</Text>
      <Text>Assigned to: {task.assignedTo?.join(", ") || "Unassigned"}</Text> {/* Safe handling */}
      <Flex justify="flex-end" mt={2}>
        <IconButton icon={<FaEdit />} onClick={() => onEdit(task.id)} mr={2} aria-label="Edit Task" />
        <IconButton icon={<FaTrash />} onClick={() => onDelete(task.id)} aria-label="Delete Task" />
      </Flex>
    </Box>
  );
};

export default TaskItem;
