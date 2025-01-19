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
          <Typography variant="h6" className="mb-4">
            Create a New Task
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 text-blue-600"
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4 text-blue-600"
          />
          <FormControlLabel
            control={
              <Switch
                checked={pending}
                onChange={handleToggle}
                color="primary"
              />
            }
            label="Pending"
            className="mb-4"
          />
          <Box className="flex justify-end">
            <Button
              onClick={handleClose}
              variant="outlined"
              color="secondary"
              className="mr-2"
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
