// src/layouts/MainLayout.tsx
import { useState } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { SideMenu } from "../components/SideMenu";
import { TaskInput } from "../components/TaskInput";
import { PlannedTaskList } from "../components/PlannedTaskList";
import { ConpletedTaskList } from "../components/CompletedTaskList ";

const MainLayout = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [compeltetasks, setCompleteTasks] = useState<string[]>([]);

  const handleAddTask = (newTask: string) => {
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const handleCompleteTask = (task: string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    setCompleteTasks((prevTasks) => [...prevTasks, task]);
  }

  return (

    <Flex overflow="hidden" left="0">
      < HStack spacing='40px' >
        <SideMenu />
        <Box flex="1" bg="white" p={6}>
          <VStack align="stretch" spacing={50} h="80vh" justify="flex-start">
            {/* TaskInputにhandleAddTaskを渡す */}
            <TaskInput onAddTask={handleAddTask} />
            < Box mb={1}>
              {/* タスク配列をPlannedTaskListに渡す */}
              <PlannedTaskList tasks={tasks} onCompleteTask={handleCompleteTask} />
            </Box >
            <Box>
              <ConpletedTaskList comptasks={compeltetasks} />
            </Box>

          </VStack>
        </Box>
      </HStack >
    </Flex >
  );
};

export default MainLayout;
