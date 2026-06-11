const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    fileName: String,
    atsScore: Number,
    skills: [String],
    missingSkills: [String],
    suggestions: [String],
});

module.exports = mongoose.model("Resume", ResumeSchema);