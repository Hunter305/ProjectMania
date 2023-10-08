import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
