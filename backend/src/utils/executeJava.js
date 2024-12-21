const { exec } = require("child_process");
const path = require("path");

const executeJava = (filePath) => {
  console.log("---------Starting execute File---------------");

  const fileName = path.basename(filePath, ".java"); // Get the class name (without .java extension)
  const dir = path.dirname(filePath); // Get the directory of the Java file

  console.log("filePath:", filePath);
  console.log("fileName:", fileName);
  console.log("dir:", dir);

  return new Promise((resolve, reject) => {
    // Command to compile and execute Java code
    const command = `javac ${filePath} && java -cp ${dir} ${fileName}`;
    console.log("Command:", command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(
          "Compilation or Execution Error:",
          stderr || error.message
        );
        return reject(
          stderr || error.message || "Error during Java code execution"
        );
      }

      if (stderr) {
        console.error("Runtime Error:", stderr);
        return reject(stderr);
      }

      console.log("---------Ending execute File---------------");
      resolve(stdout);
    });
  });
};

module.exports = { executeJava };
