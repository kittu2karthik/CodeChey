const catchAsync = require("../utils/catchAsync");

const { generateFile } = require("../utils/generateFile");
const { executeJavascript } = require("../utils/executeJavascript");

exports.compileCode = catchAsync(async (req, res, next) => {
  const { problemId, code, language = "javascript" } = req.body;
  console.log(problemId, code, language);

  if (!code) {
    return next("Please enter the code", 404);
  }
  if (!problemId) {
    return next("select the problem", 404);
  }

  const filePath = await generateFile(language, code);
  const output = await executeJavascript(filePath);
  res.json({ filePath, output });
});
