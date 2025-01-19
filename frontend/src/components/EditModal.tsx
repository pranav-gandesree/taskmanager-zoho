import { useState } from "react";
import { Modal, TextField, Switch, FormControlLabel, Button, Box, Typography } from "@mui/material";
import Task from "../types/Task";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdate: (updatedTask: Task) => void;
}

const EditModal = ({ open, onClose, task, onUpdate }: EditModalProps) => {
  const [updatedTask, setUpdatedTask] = useState<Task | null>(task);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedTask((prevTask) => (prevTask ? { ...prevTask, [name]: value } : null));
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTask((prevTask) => (prevTask ? { ...prevTask, pending: e.target.checked } : null));
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
      <Box
        className="bg-[#242424] rounded-lg shadow-lg p-6"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
        }}
      >
        <div className="flex flex-col gap-4">
          <Typography variant="h6" className="mb-4 text-white font-semibold">
            Edit Task
          </Typography>
          <TextField
            label="Title"
            name="title"
            value={updatedTask?.title || ""}
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter task title"
            InputProps={{
              style: {
                color: "#3b82f6", // Blue text color
                borderColor: "#3b82f6",
              },
            }}
            InputLabelProps={{
              style: { color: "#9BA49E" }, // Light grey label color
            }}
            className="mb-4 border-blue-500 focus:border-blue-500"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3b82f6",
                },
                "&:hover fieldset": {
                  borderColor: "#2563eb", // Darker blue on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1d4ed8", // Dark blue when focused
                },
              },
            }}
          />
          <TextField
            label="Description"
            name="description"
            value={updatedTask?.description}
            onChange={handleInputChange}
            fullWidth
            placeholder="Enter task description"
            multiline
            rows={3}
            InputProps={{
              style: {
                color: "#3b82f6", // Blue text color
              },
            }}
            InputLabelProps={{
              style: { color: "#9BA49E" }, // Light grey label color
            }}
            className="mb-4"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3b82f6",
                },
                "&:hover fieldset": {
                  borderColor: "#2563eb", // Darker blue on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1d4ed8", // Dark blue when focused
                },
              },
            }}
          />
        </div>
        <FormControlLabel
          control={<Switch checked={updatedTask?.pending} onChange={handleSwitchChange} color="primary" />}
          label="Pending"
          className="mb-4 text-white"
        />
        <Box className="flex justify-end gap-4 mt-2">
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            className="text-white border-white hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
