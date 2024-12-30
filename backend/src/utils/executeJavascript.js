const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeJavascript = (filepath, inputFilePath, timeLimit = 5000) => {
  return new Promise((resolve, reject) => {
    // Check if the file to be executed exists
    if (!fs.existsSync(filepath)) {
      return reject(new Error(`File not found: ${filepath}`));
    }

    // Check if the input file exists, if provided
    if (inputFilePath && !fs.existsSync(inputFilePath)) {
      return reject(new Error(`Input file not found: ${inputFilePath}`));
    }

    // Construct the command for executing the JavaScript file
    const command = inputFilePath
      ? `node ${filepath} < ${inputFilePath}`
      : `node ${filepath}`;

    // Execute the command with a specified timeout
    exec(command, { timeout: timeLimit }, (error, stdout, stderr) => {
      if (error) {
        // Handle timeout errors separately
        if (error.killed || error.signal === "SIGTERM") {
          return reject(
            new Error(
              "Time Limit Exceeded: The script took too long to execute."
            )
          );
        }

        // Log and reject any other execution errors
        console.error("Execution Error:", error.message);
        console.error("Standard Error Output:", stderr);
        return reject(
          new Error(
            stderr || error.message || "Error executing JavaScript code."
          )
        );
      }

      // Resolve with the trimmed standard output
      resolve(stdout.trim());
    });
  });
};

module.exports = {
  executeJavascript,
};
