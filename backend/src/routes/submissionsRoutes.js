const express = require("express");
const submissionController = require("../controllers/submissionController.js");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/:id").get(submissionController.getSubmissionByUserID);

module.exports = router;
