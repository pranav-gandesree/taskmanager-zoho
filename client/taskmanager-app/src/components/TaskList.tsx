
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import TaskItem from "./TaskItem";

interface Task {
  id: bigint;
  title: string;
  description: string;
  pending: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: bigint) => void;
  onEditTask: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks = [], onDeleteTask, onEditTask }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "completed">("all");
  const [debouncedQuery, setDebouncedQuery] = useState(""); 

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); 

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);


  // filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(debouncedQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "pending" && task.pending) ||
      (filterStatus === "completed" && !task.pending);

    return matchesSearch && matchesFilter;
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" color="primary.light">
          My Tasks
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          {/* search box */}
          <TextField
            label="Search by title"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#224362] "
            InputProps={{
              style: {
                color: "#3b82f6",
              },
            }}
            InputLabelProps={{
              style: { color: "#9BA49E" },
            }}
          />
          {/* filter dropdown */}
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "pending" | "completed")}
              label="Status"
              className="bg-[#224362] "

            >
              <MenuItem value="all" className="text-white">All</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* task list */}
      {filteredTasks.length === 0 ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography color="text.secondary">No tasks match your criteria. Try adding or searching for tasks!</Typography>
        </Box>
      ) : (
        filteredTasks.map((task) => (
          <TaskItem key={String(task.id)} task={task} onDelete={onDeleteTask} onEdit={onEditTask} />
        ))
      )}
    </Container>
  );
};

export default TaskList;
