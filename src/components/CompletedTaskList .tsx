import { Box, Flex, Text, VStack } from "@chakra-ui/react"


type ConpletedTaskListProps = {
  comptasks: string[];
  bgColor: string;
}

export const ConpletedTaskList = ({ comptasks, bgColor }: ConpletedTaskListProps) => {
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
          <Text>
            {comptasks}
          </Text>
        </Flex>
      </Box>
    </VStack>
  )

}
