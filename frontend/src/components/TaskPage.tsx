
import { getTasks, updateTask, deleteTask, createTask } from "../api/tasks";
import TaskList from "./TaskList";
import { useEffect, useState } from "react";
import Task from "../types/Task";
import TaskForm from "./TaskForm";
import { Snackbar, Alert } from "@mui/material";
import EditModal from "./EditModal";
import Loader from "./Loading";

function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" | "info" | "warning" } | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const showAlert = (message: string, severity: "success" | "error" | "info" | "warning") => {
    setAlert({ message, severity });
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCreateTask = async (newTask: { title: string; description: string; pending: boolean }) => {
    try {
      const createdTask = await createTask(newTask);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      showAlert("Task created successfully!", "success");
    } catch (error) {
      console.error("error creating task", error);
      showAlert("failed to create task", "error");
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      setError("failed to fetch tasks");
      console.error("error fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: bigint) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
      showAlert("Task deleted successfully!", "success");
    } catch (error) {
      console.error("error deleting task", error);
      showAlert("failed to delete task", "error");
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setEditModalOpen(true); 
  };

  const updateTaskHandler = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask);
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      showAlert("Task updated successfully!", "success");
    } catch (error) {
      console.error("E]error updating task:", error);
      showAlert("Failed to update task", "error");
    }
  };

  if (isLoading) {
    return <Loader/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="m-4 p-4">
        <TaskForm onCreateTask={handleCreateTask} />
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={alert?.severity || "info"} sx={{ width: "100%" }}>
          {alert?.message || "No message available"}
        </Alert>
      </Snackbar>


      <EditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        task={taskToEdit}
        onUpdate={updateTaskHandler}
      />
    </>
  );
}

export default TaskPage;
