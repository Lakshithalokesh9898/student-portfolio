const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  tech: String,
  image: String   // 👈 ADD THIS
});

module.exports = mongoose.model("Project", projectSchema);