const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const executeCode = require("../utils/codeExecutor");
const Problem = require("../models/problemModel");
const Submission = require("../models/submissionModel");

exports.submitCode = catchAsync(async (req, res, next) => {
  const { problemId, code, language } = req.body;

  if (!problemId || !code || !language) {
    return next(
      new AppError("Please provide problemId, code, and language", 400)
    );
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return next(new AppError("Problem not found", 404));
  }

  const testCases = problem.testCases;

  const executionResults = [];
  let passedCount = 0;

  for (const testCase of testCases) {
    const { input, expectedOutput } = testCase;

    const { output, error } = await executeCode({ code, input, language });

    const isPassed = error ? false : output.trim() === expectedOutput.trim();

    executionResults.push({
      input,
      expectedOutput,
      output: error || output,
      isPassed,
    });

    if (isPassed) passedCount++;
  }

  const accuracy = (passedCount / testCases.length) * 100;

  const submission = await Submission.create({
    problemId,
    userId: req.user.id,
    code,
    language,
    results: executionResults,
    passedCount,
    accuracy,
  });

  res.status(201).json({
    status: "success",
    data: {
      submission,
    },
  });
});

exports.getSubmissionById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const submission = await Submission.findById(id).populate({
    path: "problemId",
    select: "title description",
  });

  if (!submission) {
    return next(new AppError("Submission not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      submission,
    },
  });
});
