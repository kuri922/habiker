// src/layouts/MainLayout.tsx
import { useState } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { SideMenu } from "../components/SideMenu";
import { TaskInput } from "../components/TaskInput";
import { PlannedTaskList } from "../components/PlannedTaskList";
import { ConpletedTaskList } from "../components/CompletedTaskList ";
import { categoryColors } from "../constants/colors";

const MainLayout = () => {
  /* 予定タスク情報 */
  const [tasks, setTasks] = useState<string[]>([]);
  /* 完了タスク情報 */
  const [compeltetasks, setCompleteTasks] = useState<string[]>([]);
  /* 背景色取得情報 */
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  /* 予定タスクへの追加関数 */
  const handleAddTask = (newTask: string) => {
    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  /* 完了タスクへの移動関数 */
  const handleCompleteTask = (task: string, actualTime: number) => {
    console.log(`タスク: ${task}, 実績時間: ${actualTime}分`);
    setTasks((prevTasks) => prevTasks.filter((t) => t !== task));
    setCompleteTasks((prevTasks) => [...prevTasks, task]);
  }

  return (

    <Flex overflow="hidden" left="0">
      < HStack spacing='40px' >
        <SideMenu onCategorySelect={setSelectedCategory} />
        <Box flex="1" bg="white" p={6}>
          <VStack align="stretch" spacing={50} h="80vh" justify="flex-start">
            {/* TaskInputにhandleAddTaskを渡す */}
            <TaskInput onAddTask={handleAddTask} />
            < Box mb={1}>
              {/* タスク配列をPlannedTaskListに渡す */}
              <PlannedTaskList tasks={tasks} onCompleteTask={handleCompleteTask} bgColor={categoryColors[selectedCategory]} />
            </Box >
            <Box>
              <ConpletedTaskList comptasks={compeltetasks} bgColor={categoryColors[selectedCategory]} />
            </Box>

          </VStack>
        </Box>
      </HStack >
    </Flex >
  );
};

export default MainLayout;
