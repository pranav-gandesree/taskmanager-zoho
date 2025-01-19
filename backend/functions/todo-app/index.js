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
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
  }
));

app.options("*", cors());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  next();
});



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
