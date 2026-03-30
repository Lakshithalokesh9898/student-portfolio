const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Import Model
const Project = require("../models/Project");

// ================= API ROUTES =================

// ✅ POST (Save Project)
app.post("/api/projects", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.send("Project Saved!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ GET (Fetch Projects)
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ DELETE
app.delete("/api/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.send("Project Deleted!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// ✅ UPDATE
app.put("/api/projects/:id", async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.send("Project Updated!");
  } catch (err) {
    res.status(500).send(err);
  }
});

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
