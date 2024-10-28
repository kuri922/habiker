import { Box, Button, Flex, VStack } from "@chakra-ui/react"


type SideMenuProps = {
    onCategorySelect: (category: number) => void;
}
export const SideMenu = ({ onCategorySelect }: SideMenuProps) => {
    return (

        <Flex h="100vh" overflow="hidden" left="0">
            {/* サイドメニュー */}
            <Box bg="blue.100" w="250px" p={10}>
                <VStack spacing={4}>
                    <Button bg="green.100" w="100%" p={2} borderRadius="md" textAlign="center" _hover={{ bg: "green.100" }} onClick={() => onCategorySelect(1)}
                    >
                        幸福の時間
                    </Button>
                    <Button bg="pink.100" w="100%" p={2} borderRadius="md" textAlign="center" _hover={{ bg: "pink.100" }} onClick={() => onCategorySelect(2)}>
                        役割の時間
                    </Button>
                    <Button bg="yellow.100" w="100%" p={2} borderRadius="md" textAlign="center" _hover={{ bg: "yellow.100" }} onClick={() => onCategorySelect(3)}>
                        投資の時間
                    </Button>
                    <Button bg="gray.200" w="100%" p={2} borderRadius="md" textAlign="center" _hover={{ bg: "gray.200" }} onClick={() => onCategorySelect(4)}>
                        浪費の時間
                    </Button>
                </VStack>
            </Box>
        </Flex >

    )
}