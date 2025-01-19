
import React from "react";
import { Container, Typography, Box } from "@mui/material";
import TaskItem from "./TaskItem";

interface Task {
  id: bigint;
  title: string;
  description: string;
  pending: boolean;
}

interface TaskListProps {
  tasks: Task[] | undefined;
  onDeleteTask: (id: bigint) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks = [],
  onDeleteTask,
  onEditTask,
}) => {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
     
        <Typography
          variant="h4"
          component="h1"
          color="primary.light"
          sx={{ mb: 4 }}
        >
          My Tasks
        </Typography>
        {safeTasks.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
            <Typography color="text.secondary">
              No tasks found. Add some tasks to get started!
            </Typography>
          </Box>
        ) : (
          safeTasks.map((task) => (
            <TaskItem
              key={task.id.toString()}
              task={task}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        )}
    </Container>
  );
};

export default TaskList;
