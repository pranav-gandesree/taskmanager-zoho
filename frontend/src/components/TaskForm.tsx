
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";

interface TaskFormProps {
  onCreateTask: (task: { title: string; description: string; pending: boolean }) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onCreateTask }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pending, setPending] = useState(false);

  const handleToggle = () => setPending(!pending);

  const handleSubmit = () => {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    onCreateTask({ title, description, pending });
    setTitle("");
    setDescription("");
    setPending(false);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="flex flex-row-reverse">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Create Task
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
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
            <Typography
              variant="h6"
              className="mb-4 text-white font-semibold"
            >
              Create a New Task
            </Typography>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2563eb", 
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1d4ed8", 
                  },
                },
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{
                style: {
                  color: "#3b82f6", 
                },
              }}
              InputLabelProps={{
                style: { color: "#9BA49E" }, 
              }}
              className="mb-4"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "&:hover fieldset": {
                    borderColor: "#2563eb",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1d4ed8",
                  },
                },
              }}
            />
          </div>
          <FormControlLabel
            control={
              <Switch
                checked={pending}
                onChange={handleToggle}
                color="primary"
              />
            }
            label="Pending"
            className="mb-4 text-white"
          />
          <Box className="flex justify-end gap-4 mt-2">
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              className="text-white border-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TaskForm;
