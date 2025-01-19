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


const corsOptions = {
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
   res.header('Access-Control-Allow-Credentials', 'true');
  
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




module.exports = app;
