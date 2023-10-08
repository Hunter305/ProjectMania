import express from "express";
import { allProjects, createProject } from "../controller/projectController.js";

const router = express.Router();
router.route("/").post(createProject).get(allProjects);
export default router;
