import Project from "../model/projectModel.js";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

/*
description --> creating a project
route --> /api/projects
method --> post
*/
const createProject = asyncHandler(async (req, res) => {
  try {
    let a = req.cookies.jwt;
    const decodedToken = jwt.verify(a, process.env.JWT_SECRET);

    const userId = decodedToken.userId;
    const { projectName, description } = req.body;

    // Create a new project
    const project = new Project({ projectName, description });
    await project.save();

    // Find the user by ID and push the new project to their projects array
    const user = await User.findById(userId);
    user.projects.push(project);
    await user.save();

    res.json({ success: true, message: "Project added successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error adding project to user." });
  }
});
/*
description --> getting all the projects
route --> /api/projects
method --> get
*/
const allProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();
  if (projects) {
    res.status(200).json(projects);
  } else {
    res.status(500);
    throw new Error("not able to fetch products");
  }
});

export { createProject, allProjects };
