const { z } = require("zod");

//zod input validation for addTask
const addTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    pending: z.boolean(),
  });
  
  //zod input validation for updateTask
  const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    pending: z.boolean().optional(),
  });
  
  
  module.exports = {addTaskSchema, updateTaskSchema}