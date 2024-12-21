const { generateFile } = require("../utils/generateFile");
const { executeJavascript } = require("../utils/executeJavascript");
const { executePython } = require("../utils/executePython");
const { executeCpp } = require("../utils/executeCpp");
const { executeJava } = require("../utils/executeJava");
const catchAsync = require("../utils/catchAsync");

exports.runCode = catchAsync(async (req, res, next) => {
  const { problemId, code, language } = req.body;

  if (!code) {
    return next(new Error("Please enter the code"));
  }

  try {
    const filePath = await generateFile(language, code);
    let output;

    switch (language) {
      case "javascript":
        output = await executeJavascript(filePath);
        break;
      case "python":
        output = await executePython(filePath);
        break;
      case "cpp":
        output = await executeCpp(filePath);
        break;
      case "java":
        output = await executeJava(filePath);
        break;
      default:
        return next(new Error(`Unsupported language: ${language}`));
    }

    res.status(200).json({ filePath, output });
  } catch (error) {
    console.error("Error during execution:", error.message);
    return next(
      new Error(error.message || "Something went wrong during execution")
    );
  }
});

exports.testcase = catchAsync(async (req, res, next) => {
  const { problemId, code, language, testcase } = req.body;

  return res.status(200).json({
    data: req.body,
  });
});
