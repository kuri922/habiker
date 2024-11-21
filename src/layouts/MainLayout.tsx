// src/layouts/MainLayout.tsx
import { useState } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { SideMenu } from "../components/SideMenu";
import { TaskInput } from "../components/TaskInput";
import { PlannedTaskList } from "../components/PlannedTaskList";
import { ConpletedTaskList } from "../components/CompletedTaskList ";
import { categoryColors } from "../constants/colors";
import { Task } from "../Types/task";


const MainLayout = () => {
  /* 予定タスク情報 */
  const [tasks, setTasks] = useState<Task[]>([]);
  /* 完了タスク情報 */
  const [compeltetasks, setCompleteTasks] = useState<Task[]>([]);
  /* 背景色取得情報 */
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  /* 予定タスクへの追加関数 */
  const handleAddTask = async (newTaskContent: string) => {
    const newTask = { task_content: newTaskContent, category_id: selectedCategory };
    console.log("送信データ:", JSON.stringify(newTask));
    try {
      const response = await fetch("http://localhost:3000/api/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        alert("タスクが登録されました");
      } else {
        alert("登録に失敗しました");
      }
    } catch (error) {
      console.error("登録エラー:", error);
      alert("サーバーエラーが発生しました");
    }
  };

  /* 完了タスクへの移動関数 */
  const handleCompleteTask = (taskContent: string, actualTime: number) => {
    // 完了タスクを検索
    const completedTask = tasks.find((task) => task.task_content === taskContent);

    if (completedTask) {
      // タスクリストから削除
      setTasks((prevTasks) => prevTasks.filter((task) => task.task_content !== taskContent));

      // 実績時間を追加して完了リストに移動
      const updatedTask = { ...completedTask, actualTime };
      setCompleteTasks((prevTasks) => [...prevTasks, updatedTask]);
    }
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
              <ConpletedTaskList tasks={compeltetasks} bgColor={categoryColors[selectedCategory]} />
            </Box>

          </VStack>
        </Box>
      </HStack >
    </Flex >
  );
};

export default MainLayout;
