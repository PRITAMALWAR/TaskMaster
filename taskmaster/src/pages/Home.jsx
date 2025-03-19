import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="2xl" fontWeight="bold">
        Welcome to TaskMaster
      </Text>
      <Button as={Link} to="/tasks" colorScheme="blue" mt={4}>
        Go to Tasks
      </Button>
    </Box>
  );
};

export default Home;