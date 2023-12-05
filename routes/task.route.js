const express = require("express");
const taskRouter = express.Router();
const jwt = require("jsonwebtoken");
const { TaskModel } = require("../model/task.model");

taskRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "sagar");
  try {
    if (decoded) {
      const allTask = await TaskModel.find({
        $or: [{ createdBy: decoded.userID }, { assignedTo: decoded.userID }],
      });
      res.status(200).send({ allTask: allTask });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

taskRouter.post("/task", async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    await task.save();
    res.status(201).send({ msg: "Task Added Successfully" });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = {
  taskRouter,
};
