import { Box, Flex, Text, VStack } from "@chakra-ui/react"



export const SideMenu = () => {
    return (

        <Flex h="100vh" overflow="hidden" left="0">
            {/* サイドメニュー */}
            <Box bg="blue.100" w="250px" p={10}>
                <VStack spacing={4}>
                    <Text bg="green.100" w="100%" p={2} borderRadius="md" textAlign="center">
                        幸福の時間
                    </Text>
                    <Text bg="pink.100" w="100%" p={2} borderRadius="md" textAlign="center">
                        役割の時間
                    </Text>
                    <Text bg="yellow.100" w="100%" p={2} borderRadius="md" textAlign="center">
                        投資の時間
                    </Text>
                    <Text bg="gray.200" w="100%" p={2} borderRadius="md" textAlign="center">
                        浪費の時間
                    </Text>
                </VStack>
            </Box>
        </Flex>

    )
}