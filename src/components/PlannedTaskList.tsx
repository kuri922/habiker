import { Box, Button, Flex, List, ListItem, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { TaskModal } from "./TaskModal";
import { useState } from "react";
import { Task } from "../Types/task";


type PlannedTaskListProps = {
  tasks: Task[];
  onCompleteTask: (task: string, actualTime: number) => void;
  bgColor: string;
}

export const PlannedTaskList = ({ tasks, onCompleteTask, bgColor }: PlannedTaskListProps) => {
  //ポップアップの表示状態を管理するためのステート
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  const handleOpenModal = (task: Task) => {
    setSelectedTask(task);
    onOpen();
  }

  const handleComplete = (actualTime: number) => {
    if (selectedTask) {
      onCompleteTask(selectedTask.task_content, actualTime);
      onClose();
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" fontWeight="bold">
        予定タスク
      </Text>
      <Box
        bg={bgColor}
        borderRadius="md"
        p={4}
        h="200px" // 高さを調整する
        overflowY="auto" // スクロール対応
      >
        <List spacing={3}>
          {tasks.map((task, index) => (
            <ListItem key={index}>
              <Flex justifyContent="space-between">
                <Text>
                  {task.task_content}
                </Text>
                <Button size="sm" colorScheme="green" onClick={() => { handleOpenModal(task) }}>
                  完了
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* モーダルの表示 */}
      <TaskModal isOpen={isOpen} onClose={onClose} onComplete={handleComplete} />
    </VStack>
  )

}