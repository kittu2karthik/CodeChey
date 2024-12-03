import axios from "axios";
import API_URI from "../config";

function RunButton({ id, value, language, onOutput }) {
  const compileCode = async () => {
    try {
      // API call to run the code
      const response = await axios.post(`${API_URI}/users/run`, {
        code: value,
        problemId: id,
        language: language,
      });

      // Handle response
      console.log("Compilation result:", response.data);
      if (response.data.output) {
        onOutput(response.data.output); // Pass the output to the parent
      } else {
        onOutput("No output received.");
      }
    } catch (error) {
      console.error("Error during code execution:", error);

      onOutput(""); // Clear existing output
    }
  };

  return (
    <button
      onClick={compileCode}
      className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
    >
      Run
    </button>
  );
}

export default RunButton;
