import { Button, Flex, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, VStack } from "@chakra-ui/react";
import { useState } from "react";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (actualTime: number) => void;
}

export const TaskModal = ({ isOpen, onClose, onComplete }: TaskModalProps) => {
  // 入力された時間
  const [time, setTime] = useState<number>(0);

  const handleComplete = () => {
    onComplete(time);
    setTime(0);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>実績時間を入力</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <VStack spacing={4} align="stretch">
              <Flex align="center">
                <FormLabel>時間</FormLabel>
                <Select
                  value={time}
                  onChange={(e) => setTime(Number(e.target.value))}
                  placeholder="分を選択"
                >
                  {Array.from({ length: 36 }, (_, i) => (i + 1) * 5).map((minute) => (
                    <option key={minute} value={minute}>
                      {minute} 分
                    </option>
                  ))}
                </Select>
              </Flex>
            </VStack>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleComplete}>
            完了
          </Button>
          <Button variant="ghost" onClick={onClose}>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}