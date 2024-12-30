const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "../../Codes", "Inputs");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateInputFile = async (input) => {
  if (input === "") {
    return null;
  }

  const jobID = uuid();

  let fileName = `${jobID}.txt`;

  console.log("FileNmae", fileName);

  const filePath = path.join(dirCodes, fileName);

  const inputContent = input.split(" ").join("\n");

  console.log("input", input);
  console.log("filepath", filePath);

  fs.writeFileSync(filePath, inputContent);
  console.log("******** ending cpp file");
  return filePath;
};

module.exports = {
  generateInputFile,
};
