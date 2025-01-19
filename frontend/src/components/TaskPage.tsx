// import { getTasks, updateTask, deleteTask, createTask } from "../api/tasks";
// import TaskList from "./TaskList";
// import { useEffect, useState } from "react";
// import Task from "../types/Task";
// import TaskForm from "./TaskForm";
// import { Snackbar, Alert } from "@mui/material";

// function TaskPage() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" | "info" | "warning" } | null>(null);

//   const [snackbarOpen, setSnackbarOpen] = useState(false);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const showAlert = (message: string, severity: "success" | "error" | "info" | "warning") => {
//     setAlert({ message, severity });
//     setSnackbarOpen(true);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleCreateTask = async (newTask: { title: string; description: string; pending: boolean }) => {
//     try {
//       const createdTask = await createTask(newTask);

//       setTasks((prevTasks) => [...prevTasks, createdTask]);
//       showAlert("Task created successfully!", "success");
//     } catch (error) {
//       console.error("Error creating task:", error);
//       showAlert("Failed to create task. Please try again.", "error");
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await getTasks();
//       console.log("tasks is", response.data.tasks);
//       setTasks(response.data.tasks);
//     } catch (error) {
//       setError("Failed to fetch tasks");
//       console.error("Error fetching tasks:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteTask = async (taskId: bigint) => {
//     try {
//       await deleteTask(taskId);
//       setTasks(tasks.filter((task) => task.id !== taskId));
//       showAlert("Task deleted successfully!", "success");
//     } catch (error) {
//       console.error("Error deleting task:", error);
//       showAlert("Failed to delete task. Please try again.", "error");
//     }
//   };

//   const handleEditTask = async (updatedTask: Task) => {
//     try {
//       const apiTask = {
//         id: updatedTask.id,
//         title: updatedTask.title,
//         description: updatedTask.description,
//         pending: updatedTask.pending ? true : false,
//       };

//       await updateTask(apiTask);

//       setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
//       showAlert("Task updated successfully!", "success");
//     } catch (error) {
//       console.error("Error updating task:", error);
//       showAlert("Failed to update task. Please try again.", "error");
//     }
//   };

//   if (isLoading) {
//     return <div>Loading tasks...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <div className="m-4 p-4">
//         <TaskForm onCreateTask={handleCreateTask} />
//         <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} onEditTask={handleEditTask} />
//       </div>
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={4000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={handleSnackbarClose} severity={alert?.severity || "info"} sx={{ width: "100%" }}>
//           {alert?.message || "No message available"}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }

// export default TaskPage;































// import {
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     TextField,
//     Button,
//     Switch,
//     FormControlLabel,
//     Snackbar,
//     Alert,
//   } from "@mui/material";
//   import { useEffect, useState } from "react";
//   import { getTasks, updateTask, deleteTask, createTask } from "../api/tasks";
//   import TaskList from "./TaskList";
//   import Task from "../types/Task";
//   import TaskForm from "./TaskForm";
  
//   function TaskPage() {
//     const [tasks, setTasks] = useState<Task[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [alert, setAlert] = useState<{ message: string; severity: "success" | "error" | "info" | "warning" } | null>(
//       null
//     );
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
  
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
//     useEffect(() => {
//       fetchTasks();
//     }, []);
  
//     const showAlert = (message: string, severity: "success" | "error" | "info" | "warning") => {
//       setAlert({ message, severity });
//       setSnackbarOpen(true);
//     };
  
//     const handleSnackbarClose = () => {
//       setSnackbarOpen(false);
//     };
  
//     const fetchTasks = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
//         const response = await getTasks();
//         setTasks(response.data.tasks);
//       } catch (error) {
//         setError("Failed to fetch tasks");
//         console.error("Error fetching tasks:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     const handleEditTask = async (updatedTask: Task) => {
//       try {
//         const apiTask = {
//           id: updatedTask.id,
//           title: updatedTask.title,
//           description: updatedTask.description,
//           pending: updatedTask.pending ? true : false,
//         };
  
//         await updateTask(apiTask);
  
//         setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
//         showAlert("Task updated successfully!", "success");
//         closeEditModal();
//       } catch (error) {
//         console.error("Error updating task:", error);
//         showAlert("Failed to update task. Please try again.", "error");
//       }
//     };
  
//     const openEditModal = (task: Task) => {
//       setSelectedTask(task);
//       setIsEditModalOpen(true);
//     };
  
//     const closeEditModal = () => {
//       setSelectedTask(null);
//       setIsEditModalOpen(false);
//     };
  
//     if (isLoading) {
//       return <div>Loading tasks...</div>;
//     }
  
//     if (error) {
//       return <div>Error: {error}</div>;
//     }
  
//     return (
//       <>
//         <div className="m-4 p-4">
//           <TaskForm onCreateTask={(newTask) => handleEditTask(newTask as Task)} />
//           <TaskList tasks={tasks} onEditTask={openEditModal} onDeleteTask={() => {}} />
//         </div>
  
//         {selectedTask && (
//           <Dialog open={isEditModalOpen} onClose={closeEditModal}>
//             <DialogTitle>Edit Task</DialogTitle>
//             <DialogContent>
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Title"
//                 placeholder="Enter title"
//                 value={selectedTask.title}
//                 onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
//               />
//               <TextField
//                 fullWidth
//                 margin="normal"
//                 label="Description"
//                 placeholder="Enter description"
//                 value={selectedTask.description}
//                 onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={selectedTask.pending}
//                     onChange={(e) => setSelectedTask({ ...selectedTask, pending: e.target.checked })}
//                   />
//                 }
//                 label="Pending"
//               />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={closeEditModal} color="secondary">
//                 Cancel
//               </Button>
//               <Button
//                 onClick={() => handleEditTask(selectedTask)}
//                 variant="contained"
//                 color="primary"
//               >
//                 Update
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}
  
//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={4000}
//           onClose={handleSnackbarClose}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert onClose={handleSnackbarClose} severity={alert?.severity || "info"} sx={{ width: "100%" }}>
//             {alert?.message || "No message available"}
//           </Alert>
//         </Snackbar>
//       </>
//     );
//   }
  
//   export default TaskPage;
  























// components/TaskPage.tsx
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
      console.error("Error creating task:", error);
      showAlert("Failed to create task. Please try again.", "error");
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTasks();
      setTasks(response.data.tasks);
    } catch (error) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", error);
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
      console.error("Error deleting task:", error);
      showAlert("Failed to delete task. Please try again.", "error");
    }
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setEditModalOpen(true); // Open the edit modal
  };

  const updateTaskHandler = async (updatedTask: Task) => {
    try {
      await updateTask(updatedTask);
      setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
      showAlert("Task updated successfully!", "success");
    } catch (error) {
      console.error("Error updating task:", error);
      showAlert("Failed to update task. Please try again.", "error");
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

      {/* EditModal for task editing */}
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
