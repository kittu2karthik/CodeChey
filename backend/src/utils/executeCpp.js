const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "../../Codes", "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filepath) => {
  console.log("---------Starting execute-1 File---------------");

  console.log("outputPath", outputPath);

  const jobId = path.basename(filepath).split(".")[0];
  console.log("jobId", jobId);
  const outPath = path.join(outputPath, `${jobId}.out`);
  console.log("outPath", outPath);

  console.log(
    "command",
    `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`
  );

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.out`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
        console.log("---------Ending execute File---------------");
      }
    );
  });
};

module.exports = {
  executeCpp,
};
