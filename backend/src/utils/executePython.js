const { exec } = require("child_process");

const executePython = (filePath) => {
  return new Promise((resolve, reject) => {
    console.log("------------------------", filePath);
    exec(`python ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        return reject(stderr || "Error executing Python code");
      }
      resolve(stdout);
    });
  });
};

module.exports = { executePython };
