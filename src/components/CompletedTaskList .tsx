import { Box, Flex, List, ListItem, Text, VStack } from "@chakra-ui/react"
import { Task } from "../Types/task";


type ConpletedTaskListProps = {
  tasks: Task[];
  bgColor: string;
}

export const ConpletedTaskList = ({ tasks, bgColor }: ConpletedTaskListProps) => {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" fontWeight="bold">
        完了タスク
      </Text>
      <Box
        bg={bgColor}
        borderRadius="md"
        p={4}
        h="200px" // 高さを調整する
        overflowY="auto" // スクロール対応
      >
        <Flex justifyContent="space-between">
          <List spacing={3}>
            {tasks.map((task, index) => (
              <ListItem key={index}>
                <Text>
                  {task.task_content}
                </Text>
              </ListItem>
            ))}
          </List>
        </Flex>
      </Box>
    </VStack>
  )

}
