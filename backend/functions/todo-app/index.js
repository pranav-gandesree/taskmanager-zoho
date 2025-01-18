const express = require("express");
const catalystSDK = require("zcatalyst-sdk-node");

const app = express();

// middleware for parsing JSON requests
app.use(express.json());

// middleware to initialize Catalyst SDK for every request
app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});




// app.get("/all", async (req, res) => {
//   try {
//     const { catalyst } = res.locals;
//     const page = parseInt(req.query.page, 10) || 1;
//     const perPage = parseInt(req.query.perPage, 10) || 10;
//     const zcql = catalyst.zcql();

//     // Calculate if there are more rows beyond the current page
//     const totalCountQuery = await zcql.executeZCQLQuery(
//       `SELECT COUNT(ROWID) FROM TodoItems`
//     );
//     const totalCount = parseInt(totalCountQuery[0]["TodoItems.ROWID"], 10);
//     const hasMore = totalCount > page * perPage;

//     // Fetch rows for the current page
//     const offset = (page - 1) * perPage;
//     const todoItemsQuery = await zcql.executeZCQLQuery(
//       `SELECT ROWID, Notes FROM TodoItems LIMIT ${offset}, ${perPage}`
//     );

//     const todoItems = todoItemsQuery.map((row) => ({
//       id: row["TodoItems.ROWID"],
//       notes: row["TodoItems.Notes"],
//     }));

//     res.status(200).send({
//       status: "success",
//       data: {
//         todoItems,
//         hasMore,
//       },
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({
//       status: "failure",
//       message: "Unable to fetch tasks. Please try again.",
//     });
//   }
// });





app.get("/all", async (req, res) => {
	try {
	  const { catalyst } = res.locals;
	  const zcql = catalyst.zcql();
  
	  // Fetch all rows from the TodoItems table
	  const todoItemsQuery = await zcql.executeZCQLQuery(
		`SELECT ROWID, Notes FROM TodoItems`
	  );
  
	  // Map the data to a simpler format for the frontend
	  const todoItems = todoItemsQuery.map((row) => ({
		id: row["TodoItems.ROWID"],
		notes: row["TodoItems.Notes"],
	  }));
  
	  // Send the full data set to the frontend
	  res.status(200).send({
		status: "success",
		data: {
		  todoItems,
		},
	  });
	} catch (err) {
	  console.error(err);
	  res.status(500).send({
		status: "failure",
		message: "Unable to fetch tasks. Please try again.",
	  });
	}
  });

  






app.post("/add", async (req, res) => {
  try {
    const { notes } = req.body;

    // Validate input
    if (!notes) {
      return res.status(400).send({
        status: "failure",
        message: "Notes field is required.",
      });
    }

    const { catalyst } = res.locals;
    const table = catalyst.datastore().table("TodoItems");

    // Insert a new row
    const { ROWID: id } = await table.insertRow({ Notes: notes });

    res.status(201).send({
      status: "success",
      data: {
        todoItem: {
          id,
          notes,
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




app.delete("/:ROWID", async (req, res) => {
  try {
    const { ROWID } = req.params;

    if (!ROWID) {
      return res.status(400).send({
        status: "failure",
        message: "Task ID (ROWID) is required.",
      });
    }

    const { catalyst } = res.locals;
    const table = catalyst.datastore().table("TodoItems");

    // Delete the row
    await table.deleteRow(ROWID);

    res.status(200).send({
      status: "success",
      data: {
        todoItem: {
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

module.exports = app;
