const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "../../Codes", "code");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
  let fileName;

  if (format === "java") {
    const classNameMatch = content.match(/public\s+class\s+(\w+)/);
    if (!classNameMatch) {
      throw new Error("Invalid Java code: No public class found");
    }
    fileName = `${classNameMatch[1]}.java`;
  } else {
    const jobID = uuid();
    fileName = `${jobID}.${format === "javascript" ? "js" : format === "python" ? "py" : format}`;
  }

  const filePath = path.join(dirCodes, fileName);
  fs.writeFileSync(filePath, content);
  return filePath;
};

module.exports = {
  generateFile,
};
