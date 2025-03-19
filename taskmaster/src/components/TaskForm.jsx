import React, { useState } from "react";
import { Button, Input, Textarea, Select, VStack } from "@chakra-ui/react";

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      status: "To-Do",
    };
    onAddTask(newTask);
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <VStack as="form" onSubmit={handleSubmit} spacing={4}>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </Select>
      <Button type="submit" colorScheme="blue">
        Add Task
      </Button>
    </VStack>
  );
};

export default TaskForm;