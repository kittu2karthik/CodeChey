const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "../../Codes", "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath, inputFilePath, timeLimit = 5000) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filepath)) {
      return reject(new Error(`File not found: ${filepath}`));
    }

    if (inputFilePath && !fs.existsSync(inputFilePath)) {
      return reject(new Error(`Input file not found: ${inputFilePath}`));
    }

    const jobId = path.basename(filepath).split(".")[0];
    const outPath = path.join(outputPath, `${jobId}.out`);

    const command = inputFilePath
      ? `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out < ${inputFilePath}`
      : `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`;

    exec(command, { timeout: timeLimit }, (error, stdout, stderr) => {
      if (error) {
        if (error.killed || error.signal === "SIGTERM") {
          return reject(
            new Error(
              "Time Limit Exceeded: The script took too long to execute."
            )
          );
        }

        console.error("Execution Error:", error.message);
        console.error("Standard Error Output:", stderr);
        return reject(
          new Error(stderr || error.message || "Error executing C++ code.")
        );
      }

      resolve(stdout.trim());
    });
  });
};

module.exports = {
  executeCpp,
};
