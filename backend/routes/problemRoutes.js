const express = require("express");
const problemController = require("../controllers/problemController");

const router = express.Router();

router
  .route("/")
  .get(problemController.getAllProblems)
  .post(problemController.createProblem);

router
  .route("/:id")
  .get(problemController.getProblem)
  .patch(problemController.updateProblem)
  .delete(problemController.deleteProblem);

module.exports = router;
