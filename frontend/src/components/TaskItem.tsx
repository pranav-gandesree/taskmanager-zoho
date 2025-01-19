import React from "react";
import { Box, Typography, Button } from "@mui/material";
// import { Delete } from "lucide-react";

interface Task {
  id: bigint;
  title: string;
  description: string;
  pending: boolean;
}

interface TaskItemProps {
  task: Task;
  onDelete: (id: bigint) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      p={2}
      sx={{
        border: "1px solid grey",
        borderRadius: "8px",
        backgroundColor: task.pending ? "yellow" : "green",
      }}
    >
      <Box>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </Box>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(task)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => onDelete(task.id)}
        >
          Delete 
          {/* <Delete/> */}
        </Button>
      </Box>
    </Box>
  );
};

export default TaskItem;
