const express = require("express");
const { connection } = require("./db");
const cors = require("cors");

const { userRouter } = require("./routes/user.route");
const { TaskModel } = require("./model/task.model");
const { auth } = require("./middlewares/auth.middleware");
const { taskRouter } = require("./routes/task.route");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use(auth);
app.use("/allTask", taskRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to database");
    console.log("App is running on 8080 port");
  } catch (error) {
    console.log(error.message);
  }
});
