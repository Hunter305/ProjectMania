import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
  },
  status: {
    type: String,
    enum: ["todo", "inProgress", "completed"],
    default: "todo",
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
