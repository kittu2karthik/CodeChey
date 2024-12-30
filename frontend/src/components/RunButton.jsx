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

      onOutput(response.data.output);

      console.log("Compilation result:", response.data);
    } catch (error) {
      console.error("Error during code execution:", error);

      onOutput("Time Limit Exceeded");
    }
  };

  return (
    <button
      onClick={runCode}
      className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
    >
      Run
    </button>
  );
}

export default RunButton;
