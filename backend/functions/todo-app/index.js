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


//enable cors only for local testing

// const corsOptions = {
//   origin: ['https://taskmanager-zoho.vercel.app', 'http://localhost:5173', 'http://localhost:3000'], 
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
//   credentials: true,
//   optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

// app.options('*', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://taskmanager-zoho.vercel.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.sendStatus(204);
// });


app.use((req, res, next) => {
  const catalyst = catalystSDK.initialize(req);
  res.locals.catalyst = catalyst;
  next();
});

app.use("/tasks", TaskRoute)

module.exports = app;
