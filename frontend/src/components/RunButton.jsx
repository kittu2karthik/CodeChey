import axios from "axios";
import API_URI from "../config";

function RunButton({ id, value, language, onOutput, input }) {
  const runCode = async () => {
    try {
      const response = await axios.post(`${API_URI}/users/run`, {
        code: value,
        problemId: id,
        input: input,
        language: language,
      });

      console.log(response.data.output);
      onOutput(response.data.output);

      console.log("Compilation result:", response.data);
    } catch (error) {
      console.error("Error during code execution:", error);

      onOutput(error.response.data.stack);
    }
  };

  return (
    <button
      onClick={runCode}
      className="rounded bg-purple-900 p-2 text-white hover:bg-purple-600"
    >
      Run
    </button>
  );
}

export default RunButton;
