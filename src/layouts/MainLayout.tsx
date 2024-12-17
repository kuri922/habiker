// src/layouts/MainLayout.tsx
import { useCallback, useEffect, useState } from "react";
import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import { SideMenu } from "../components/SideMenu";
import { TaskInput } from "../components/TaskInput";
import { PlannedTaskList } from "../components/PlannedTaskList";
import { CompletedTaskList } from "../components/CompletedTaskList ";
import { categoryColors } from "../constants/colors";
import { Task } from "../Types/task";
import { FixedChart } from "../components/Chart";
import { ChartData } from "../Types/ChartData"


const MainLayout = () => {
  /* 予定タスク情報 */
  const [tasks, setTasks] = useState<Task[]>([]);
  /* 完了タスク情報 */
  const [completetasks, setCompleteTasks] = useState<Task[]>([]);
  /* 背景色取得情報 */
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  /* グラフ表示用データ取得情報 */
  const [chartData, setChartData] = useState<ChartData[]>([]);

  /* 予定タスクへの追加関数 */
  const handleAddTask = async (newTaskContent: string) => {
    const newTask = { task_content: newTaskContent, category_id: selectedCategory };
    try {
      const response = await fetch("http://localhost:3000/api/add-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        alert("登録に失敗しました");
      }
    } catch (error) {
      console.error("登録エラー:", error);
      alert("サーバーエラーが発生しました");
    }
  };

  /* メニュー選択時に予定タスクと完了タスク取得関数 */
  const fetchTask = async (categoryId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks?category_id=${categoryId}`);
      if (response.ok) {
        const data = await response.json();

        setTasks(data.plannedTasks);
        setCompleteTasks(data.completedTasks);

      } else {
        console.error("タスク取得失敗:", response.statusText)
      }
    } catch {
      console.error("タスク取得エラー")
    }
  }

  useEffect(() => {
    if (selectedCategory) {
      fetchTask(selectedCategory);
    }
  }, [selectedCategory]);

  /* 完了タスクへの移動関数 */
  const handleCompleteTask = async (taskContent: string, actualTime: number) => {
    // 完了タスクを検索
    const completedTask = tasks.find((task) => task.task_content === taskContent);

    if (completedTask) {
      // タスクリストから削除
      setTasks((prevTasks) => prevTasks.filter((task) => task.task_content !== taskContent));

      // 実績時間を追加して完了リストに移動
      const updatedTask = { ...completedTask, actualTime };
      setCompleteTasks((prevTasks) => [...prevTasks, updatedTask]);

      //完了タスクのDB登録
      try {
        const response = await fetch("http://localhost:3000/api/complete-task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task_content: updatedTask.task_content,
            category_id: updatedTask.category_id,
            actual_minutes: updatedTask.actualTime,
          }),
        });

        if (response.ok) {
          console.log("完了タスクがDBに登録されました")
        } else {
          console.error("完了タスク登録失敗", response.statusText);
          alert("完了タスクの登録に失敗しました")
        }

      } catch (error) {
        console.error("完了タスク登録エラー:", error);
        alert("サーバーエラーが発生しました");
      }
    }
  }

  const fetchChartData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api//chart-tasks");
      if (response.ok) {
        const data = await response.json();

        // total_time を数値型に変換
        const formattedData = data.map((item: { category_id: number; total_time: string }) => ({
          ...item,
          total_time: Number(item.total_time),
        }));

        setChartData(formattedData);
      } else {
        console.error("グラフデータ取得失敗:", response.statusText);
      }
    } catch (error) {
      console.error("グラフデータ取得エラー:", error);
    }
  }, []); // 空の依存配列にすることで、一度だけ関数を生成

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]); // fetchChartDataの依存関係のみを設定

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
              <PlannedTaskList tasks={tasks} onCompleteTask={handleCompleteTask} bgColor={categoryColors[selectedCategory].color} />
            </Box >
            <Box>
              <CompletedTaskList tasks={completetasks} bgColor={categoryColors[selectedCategory].color} />
            </Box>

          </VStack>
        </Box>
        <Box mt="-200px">
          <FixedChart data={chartData} />
        </Box>
      </HStack >
    </Flex >
  );
};

export default MainLayout;
