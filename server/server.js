const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

mongoose.connect("mongodb://127.0.0.1:27017/portfolio")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const Project = require("../models/Project");

// API
app.get("/api/projects", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.post("/api/projects", async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.send("Project Saved!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});
