import express from "express";
import {
  addTask,
  allTask,
  deleteTask,
  getAllTasksForProject,
  updateTaskStatus,
} from "../controller/taskController.js";
const router = express.Router();

router.route("/:projectId/task").post(addTask).get(getAllTasksForProject);
router.route("/").get(allTask);
router.route("/:taskId/status").put(updateTaskStatus);
router.route("/:taskId").delete(deleteTask);
export default router;
