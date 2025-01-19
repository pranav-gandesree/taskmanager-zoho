const express = require("express");
const catalystSDK = require("zcatalyst-sdk-node");
const cors = require("cors");
const TaskRoute = require("./routes/TaskRoutes")

const app = express();

app.use(express.json({
  verify: (req, res, buf, encoding) => {
    if (req.method === 'DELETE') {
      return;
    }
  }
}));

app.use(cors(
  {
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  }
));

app.options("*", cors());

// middleware to initialize Catalyst SDK for every request
app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

app.use("/tasks", TaskRoute)


app.listen(4000, async () => {
  console.log(`Server is running on port 4000`);
});




module.exports = app;
