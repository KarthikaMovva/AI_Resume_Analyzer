const express = require("express");
const multer = require("multer");
const extractText = require("../Services/ParserServices");
const analyzeResume =
    require("../Services/AIServices");

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