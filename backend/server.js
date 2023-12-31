import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import db from "./utils/config.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoute from "./routes/projectRoutes.js";
import taskRoute from "./routes/taskRoutes.js";

const app = express();
//body parser middleware
app.use(express.json()); // for raw json
app.use(express.urlencoded({ extended: true })); //for url parsing
app.use(cookieParser());

const port = process.env.PORT || 3000;
db();

app.get("/test", (req, res) => {
  let a = req.cookies;
  console.log(a);
});
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, `/client/dist`)));
} else {
  app.get("/", (req, res) => {
    res.send("app is running");
  });
}

app.use(notFound), app.use(errorHandler);

app.listen(port, () => {
  console.log(`app is running successfully at ${port}`);
});
