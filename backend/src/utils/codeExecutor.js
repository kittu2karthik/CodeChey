const axios = require("axios");

const executeCode = async ({ code, input, language }) => {
  try {
    const response = await axios.post("https://api.codeexecution.com/execute", {
      code,
      input,
      language,
    });

    return {
      output: response.data.output,
      error: null,
    };
  } catch (error) {
    return {
      output: null,
      error: error.response?.data?.error || "Execution failed",
    };
  }
};

module.exports = executeCode;
