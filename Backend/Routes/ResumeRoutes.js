const express = require("express");
const multer = require("multer");
const extractText = require("../Services/ParserServices");
const analyzeResume = require("../Services/AIServices");
const Resume = require("../Models/Resume");

const router = express.Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post(
    "/upload",
    upload.single("resume"),
    async (req, res) => {

        try {

            const resumeText =
                await extractText(req.file.path);

            const analysis =
                await analyzeResume(resumeText);
            const cleaned = analysis
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const result = JSON.parse(cleaned);
            console.log(result);
            await Resume.create({
                fileName: req.file.originalname,
                atsScore: result.atsScore,
                skills: result.skills,
                missingSkills: result.missingSkills,
                suggestions: result.suggestions,
            });

            res.json({
                analysis,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message: error.message,
            });

        }

    }
);

module.exports = router;