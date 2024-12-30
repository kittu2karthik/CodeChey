const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executePython = (filePath, inputFilePath, timeLimit) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      return reject(new Error(`File not found: ${filePath}`));
    }

    if (inputFilePath && !fs.existsSync(inputFilePath)) {
      return reject(new Error(`Input file not found: ${inputFilePath}`));
    }

    const command = inputFilePath
      ? `python ${filePath} < ${inputFilePath.replace(/\s+/g, " ")}`
      : `python ${filePath}`;

    exec(command, { timeout: timeLimit }, (error, stdout, stderr) => {
      if (error) {
        if (error.killed || error.signal === "SIGTERM") {
          return reject(
            new Error(
              "Time Limit Exceeded: The script took too long to execute."
            )
          );
        }
        return reject(
          stderr || error.message || "Error executing Python code."
        );
      }

      resolve(stdout.trim());
    });
  });
};

module.exports = { executePython };
