import { getTasks, updateTask, deleteTask } from "./api/tasks";
// import Navbar from "./components/Navbar";
import TaskList from "./components/TaskList";
import { useEffect, useState } from "react";
import Task from "./types/Task";
import TaskForm from "./components/TaskForm";


function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = (newTask: { title: string; description: string; pending: boolean }) => {
    const id = BigInt(tasks.length + 1);
    setTasks((prevTasks) => [
      ...prevTasks,
      { id, ...newTask },
    ]);
  };


  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTasks();
      console.log("tasks is", response.data.tasks)
      setTasks(response.data.tasks);
      
    } catch (error) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (taskId: bigint) => {
    try {
      await deleteTask(taskId.toString());
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      // You might want to show an error message to the user
    }
  };

  const handleEditTask = async (updatedTask: Task) => {
    try {
      
      const apiTask = {
        id: updatedTask.id, 
        title: updatedTask.title,
        description: updatedTask.description,
        pending: updatedTask.pending ? true : false

      };

      await updateTask(apiTask);
      
      setTasks(tasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
      // You might want to show an error message to the user
    }
  };

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="m-4 p-4">
        {/* <Navbar /> */}
        <TaskForm onCreateTask={handleCreateTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </div>
    </>
  );
}

export default App;