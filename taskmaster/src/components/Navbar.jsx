import React from "react";
import { Flex, Button, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex bg="blue.500" p={4} color="white" justifyContent="space-between">
      <Text fontSize="xl" fontWeight="bold">
        TaskMaster
      </Text>
      <Flex gap={4}>
        <Button as={RouterLink} to="/" colorScheme="teal">
          Home
        </Button>
        <Button as={RouterLink} to="/tasks" colorScheme="teal">
          Tasks
        </Button>
        <Button colorScheme="teal">Login</Button>
        <Button colorScheme="teal">Register</Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;