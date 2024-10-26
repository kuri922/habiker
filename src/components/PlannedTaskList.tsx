import { Box, Button, Flex, List, ListItem, Text, VStack } from "@chakra-ui/react";

type PlannedTaskListProps = {
  tasks: string[];
  onCompleteTask: (task: string) => void;
}

export const PlannedTaskList = ({ tasks, onCompleteTask }: PlannedTaskListProps) => {

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="2xl" fontWeight="bold">
        予定タスク
      </Text>
      <Box
        bg="green.100"
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
                  {task}
                </Text>
                <Button size="sm" colorScheme="green" onClick={() => { onCompleteTask(task) }}>
                  完了
                </Button>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Box>
    </VStack>
  )

}