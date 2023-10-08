import asyncHandler from "../middleware/asyncHandler.js";
import Project from "../model/projectModel.js";
import Task from "../model/taskModel.js";

/*
description: to create a task and adding it into projects
method: POST,
route: /api/tasks/projectid/task
*/
const addTask = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;
    const { taskName, description, deadline, status } = req.body;

    // Create a new task
    const task = new Task({
      taskName,
      description,
      deadline,
      status,
      project: projectId,
    });

    await task.save();

    // Find the project by ID and push the new task to their tasks array
    const project = await Project.findById(projectId);
    project.tasks.push(task);
    await project.save();

    res.json({ success: true, message: "Task added successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding task to project." });
  }
});

/*
description: to get all the tasks
method: GET,
route: /api/tasks/projectid/task
*/
const allTask = asyncHandler(async (req, res) => {
  const tasks = await Task.find();
  if (tasks) {
    res.status(200).json(tasks);
  } else {
    res.status(500);
    throw new Error("Internal Error");
  }
});

const getAllTasksForProject = asyncHandler(async (req, res) => {
  try {
    const { projectId } = req.params;

    // Find the project by ID and populate the 'tasks' field to get all associated tasks
    const project = await Project.findById(projectId).populate("tasks");

    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found." });
    }

    const tasks = project.tasks; // This will contain all tasks associated with the project
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks for the project.",
    });
  }
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    // Find the task by ID and update its status
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true } // Set new to true to return the updated task
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      message: "Task status updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating task status" });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { taskId } = req.params; // Extract task ID from the URL parameter

    // Check if the task with the specified ID exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Delete the task from the database
    await Task.findByIdAndDelete(taskId);

    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting task" });
  }
});

export {
  addTask,
  allTask,
  getAllTasksForProject,
  updateTaskStatus,
  deleteTask,
};
