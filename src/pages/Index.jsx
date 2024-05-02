import { Box, VStack, Input, Button, Heading, Text, IconButton, useBreakpointValue, Flex } from '@chakra-ui/react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleToggleComplete = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const inputSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Box p={5}>
      <VStack spacing={4}>
        <Heading mb={6}>Todo App</Heading>
        <Flex>
          <Input
            placeholder="Add a new task..."
            size={inputSize}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2} colorScheme="blue">
            <FaPlus />
          </Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          {tasks.map(task => (
            <Flex key={task.id} p={2} borderWidth="1px" borderRadius="lg" alignItems="center" justifyContent="space-between">
              <Text as={task.isCompleted ? 's' : ''} cursor="pointer" onClick={() => handleToggleComplete(task.id)}>
                {task.text}
              </Text>
              <IconButton
                icon={<FaTrash />}
                onClick={() => handleDeleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete task"
              />
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Index;