import { Button, HStack, Input } from "@chakra-ui/react"
import { useState } from "react";

type TaskInputProps = {
  onAddTask: (task: string) => void
}

export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim() !== "") {
      onAddTask(task);
      setTask("");
    }
  }
  return (
    <HStack spacing={5} align="center">
      <Input
        placeholder='入力してください'
        value={task}
        onChange={(e) => setTask(e.target.value)} />
      <Button color="black" onClick={handleAddTask} w="200px" bgColor="aqua">
        登録
      </Button>
    </HStack>
  )
}