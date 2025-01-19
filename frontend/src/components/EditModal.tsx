import { useState, useEffect } from "react";
import {
  Modal,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import Task from "../types/Task";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdate: (updatedTask: Task) => void;
}

const EditModal = ({ open, onClose, task, onUpdate }: EditModalProps) => {
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

  // Synchronize state with the task prop whenever it changes
  useEffect(() => {
    setUpdatedTask(task);
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => (prevTask ? { ...prevTask, [name]: value } : null));
  };

  const handleStatusChange = (event: SelectChangeEvent<"true" | "false">) => {
    setUpdatedTask((prevTask) =>
      prevTask ? { ...prevTask, pending: event.target.value === "true" } : null
    );
  };

  const handleUpdate = () => {
    if (updatedTask) {
      onUpdate(updatedTask);
      onClose();
    }
  };

  if (!task) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div
        className="modal-container bg-[#242424] p-6 rounded-lg shadow-lg"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
        }}
      >
        <div className="flex flex-col gap-4">
          <h2 className="mb-4 text-lg font-semibold">Edit Task</h2>
          <TextField
            label="Title"
            name="title"
            value={updatedTask?.title || ""}
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter task title"
            InputProps={{
              style: {
                color: "#3b82f6",
                borderColor: "#3b82f6",
              },
            }}
            InputLabelProps={{
              style: { color: "#9BA49E" },
            }}
            className="mb-4 border-blue-500 focus:border-blue-500"
          />
          <TextField
            label="Description"
            name="description"
            value={updatedTask?.description || ""}
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter task description"
            InputProps={{
              style: {
                color: "#3b82f6",
                borderColor: "#3b82f6",
              },
            }}
            InputLabelProps={{
              style: { color: "#9BA49E" },
            }}
            className="mb-4 border-blue-500 focus:border-blue-500"
          />
          <FormControl fullWidth>
            <InputLabel style={{ color: "#9BA49E" }}>Status</InputLabel>
            <Select
              value={updatedTask?.pending ? "true" : "false"}
              onChange={handleStatusChange}
              style={{ color: "#3b82f6" }}
            >
              <MenuItem value="true">Pending</MenuItem>
              <MenuItem value="false">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
