const express = require("express");
const router = express.Router();


router.get("/getTasks", async(req, res)=>{
    try {
        const { catalyst } = res.locals;
        const zcql = catalyst.zcql();
    
        const tasksQuery = await zcql.executeZCQLQuery(
          `SELECT ROWID, Title, Description, Pending  FROM Tasks`
        );

        // console.log('Raw query result:', JSON.stringify(tasksQuery, null, 2));
    
        const tasks = tasksQuery.map((row) => ({
            id: row.Tasks.ROWID,
            title: row.Tasks.Title,
            description: row.Tasks.Description,
            pending: row.Tasks.Pending
          }));
          

        // console.log("mapped tasks is ", tasks)
    
  
        res.status(200).send({
          status: "success",
          data: {
            tasks,
          },
        });
      } catch (err) {
        console.error(err);
        res.status(500).send({
          status: "failure",
          message: "Unable to fetch tasks. Please try again.",
        });
      }
})



router.post("/addTask", async (req, res) => {
  try {
    const { title, description, pending } = req.body;
    // console.log(req.body);

    if (!title || !description || pending === undefined) {
      return res.status(400).send({
        status: "failure",
        message: "title, description and pending field is required.",
      });
    }

    const { catalyst } = res.locals;
    const table = catalyst.datastore().table("Tasks");

    const { ROWID: id } = await table.insertRow({
      Title: title,
      Description: description,
      Pending: pending
    });

    res.status(201).send({
      status: "success",
      data: {
        task: {
          id,
          title,
          description,
          pending
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failure",
      message: "Unable to create task. Please try again.",
    });
  }
});
  

  
router.put("/updateTask/:ROWID", async (req, res) => {
  try {
    const { ROWID } = req.params;
    const { description, title, pending } = req.body;

    if (!ROWID) {
      return res.status(400).send({
        status: "failure",
        message: "Task ID (ROWID) is required.",
      });
    }

    const { catalyst } = res.locals;
    const table = catalyst.datastore().table("Tasks");

    if (!title && !description && pending === undefined) {
      return res.status(400).send({
        status: "failure",
        message: "At least one field (title, description, or pending) must be provided to update.",
      });
    }

    const task = await table.getRow(ROWID);
    if (!task) {
      return res.status(404).send({
        status: "failure",
        message: "Task not found.",
      });
    }

    const updatedData = {
      Title: title !== undefined ? title : task.Title,
      Description: description !== undefined ? description : task.Description,
      Pending: pending !== undefined ? pending : task.Pending,
    };


    if (!updatedData || typeof updatedData !== 'object') {
      throw new Error('Invalid update data');
    }

    await table.updateRow({
      ROWID: ROWID,
      ...updatedData
    });

    res.status(200).send({
      status: "success",
      data: {
        todoItem: {
          id: ROWID,
          title: updatedData.Title,
          description: updatedData.Description,
          pending: updatedData.Pending,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failure",
      message: "Unable to update task. Please try again.",
    });
  }
});



  router.delete("/deleteTask/:ROWID", async (req, res) => {
    try {
      const { ROWID } = req.params;
  
      if (!ROWID) {
        return res.status(400).send({
          status: "failure",
          message: "Task ID (ROWID) is required.",
        });
      }
  
      const { catalyst } = res.locals;
      const table = catalyst.datastore().table("Tasks");
  
      //delete the task
       try {
            await table.deleteRow(ROWID);
        } catch (deleteError) {
            console.error('Delete operation failed:', deleteError);
            return res.status(404).send({
                status: "failure",
                message: "Task not found or could not be deleted."
            });
        }
  
      res.status(200).send({
        status: "success",
        data: {
          task: {
            id: ROWID,
          },
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        status: "failure",
        message: "Unable to delete task. Please try again.",
      });
    }
  });
  


  module.exports = router;