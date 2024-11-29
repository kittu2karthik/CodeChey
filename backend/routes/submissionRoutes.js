const express = require("express");
const submissionController = require("../controllers/submissionController");

const router = express.Router();

router.post("/", submissionController.submitCode);

router.get("/:id", submissionController.getSubmissionById);

module.exports = router;
