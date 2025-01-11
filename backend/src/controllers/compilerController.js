const { generateFile } = require("../utils/generateFile");
const { executeJavascript } = require("../utils/executeJavascript");
const { executePython } = require("../utils/executePython");
const { executeCpp } = require("../utils/executeCpp");
const { generateInputFile } = require("../utils/generateInputFile");
const { executeJava } = require("../utils/executeJava");
const AppError = require("../utils/appError");
const path = require("path");
const fs = require("fs");

const Problem = require("../models/problemModel");
const Submission = require("../models/submissionModel");

const catchAsync = require("../utils/catchAsync");

exports.runCode = catchAsync(async (req, res, next) => {
  const { code, language, input = "" } = req.body;

  if (!code) {
    return next(new Error("Please enter the code"));
  }

  try {
    const filePath = await generateFile(language, code);
    let inputFilePath = await generateInputFile(input);
    let output;

    switch (language) {
      case "javascript":
        output = await executeJavascript(filePath, inputFilePath);
        break;
      case "python":
        output = await executePython(filePath, inputFilePath);
        break;
      case "cpp":
        output = await executeCpp(filePath, inputFilePath);
        break;
      case "java":
        output = await executeJava(filePath, inputFilePath);
        break;
      default:
        return next(new Error(`Unsupported language: ${language}`));
    }

    res.status(200).json({ filePath, input, output });
  } catch (error) {
    console.error("Error during execution:", error.message);
    return next(
      new Error(error.message || "Something went wrong during execution")
    );
  }
});

exports.submitCode = catchAsync(async (req, res, next) => {
  const { code, language, problemId, userId } = req.body;

  console.log(req.body);

  if (!code || !language) {
    return next(
      new AppError("Please provide both the code and language.", 400)
    );
  }

  if (!problemId) {
    return next(new AppError("Problem ID is required.", 400));
  }

  const problem = await Problem.findById(problemId).populate("testCases");
  if (!problem) {
    return next(new AppError("Problem not found.", 404));
  }

  const filePath = await generateFile(language, code);

  let passedCount = 0;
  const results = [];

  if (!problem.testCases || problem.testCases.length === 0) {
    return next(new AppError("No test cases available for this problem.", 404));
  }

  for (const testCase of problem.testCases) {
    const { input, output: expectedOutput } = testCase;

    try {
      console.log(`Processing test case: ${input}`);

      const inputFilePath = path.join(__dirname, `input-${Date.now()}.txt`);

      fs.writeFileSync(inputFilePath, input);

      let executionResult;

      switch (language) {
        case "javascript":
          executionResult = await executeJavascript(
            filePath,
            inputFilePath,
            problem.timeLimit
          );
          break;
        case "python":
          executionResult = await executePython(
            filePath,
            inputFilePath,
            problem.timeLimit
          );
          break;
        case "cpp":
          executionResult = await executeCpp(
            filePath,
            inputFilePath,
            problem.timeLimit
          );
          break;
        case "java":
          executionResult = await executeJava(
            filePath,
            inputFilePath,
            problem.timeLimit
          );
          break;
        default:
          throw new AppError(`Unsupported language: ${language}`, 400);
      }

      if (executionResult.trim() === expectedOutput.trim()) {
        passedCount++;
      }

      results.push({
        input,
        expectedOutput,
        output: executionResult.trim(),
        isPassed: executionResult.trim() === expectedOutput.trim(),
      });
    } catch (err) {
      console.error("Error during code execution:", err);
      return next(new AppError(`Execution error: ${err.message}`, 500));
    }
  }

  const accuracy =
    problem.testCases.length > 0
      ? (passedCount / problem.testCases.length) * 100
      : 0;

  const submission = await Submission.create({
    problemId,
    userId,
    code,
    language,
    results,
    passedCount,
    accuracy,
    verdict: passedCount === problem.testCases.length ? "Accepted" : "Rejected",
  });

  res.status(200).json({
    status: "success",
    data: { submission },
  });
});
