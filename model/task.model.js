const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskName: String,
  description: String,
  checklist: String,
  comments: String,
  projectList: String,
  assignedTo: String,
  dueDate: Date,
  labels: String,
  createdBy: String,
});

const TaskModel = mongoose.model("task", taskSchema);

module.exports = {
  TaskModel,
};
