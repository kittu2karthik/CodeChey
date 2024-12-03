const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

// Directory to store outputs
const outputPath = path.join(__dirname, "outputs");

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Function to execute a JavaScript file
const executeJavascript = (filepath) => {
  return new Promise((resolve, reject) => {
    // Execute the JavaScript file using Node.js
    exec(`node ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        // Return both error and standard error output
        return reject({ error: error.message, stderr });
      }
      if (stderr) {
        // Reject if there’s any standard error output
        return reject(stderr);
      }
      // Resolve with standard output
      resolve(stdout);
    });
  });
};

module.exports = {
  executeJavascript,
};
