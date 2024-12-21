import axios from "axios";
import API_URI from "../config";
import { useState } from "react";

function TestCaseButton({ id, value, language, onOutput, testcase }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const testCase = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error message

    try {
      const response = await axios.post(`${API_URI}/users/testcase`, {
        code: value,
        problemId: id,
        language: language,
        testcase: testcase,
      });

      console.log("Compilation result:", response.data);

      if (response.data.output) {
        onOutput(response.data.output);
      } else {
        onOutput("No output received.");
      }
    } catch (error) {
      console.error("Error during code execution:", error);
      setErrorMessage("An error occurred while executing the test case.");
      onOutput(""); // Clear output if error occurs
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  };

  return (
    <div>
      <button
        onClick={testCase}
        className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600"
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? "Running..." : "TestCase"}
      </button>

      {errorMessage && (
        <p className="mt-2 text-red-500">{errorMessage}</p> // Show error message if any
      )}
    </div>
  );
}

export default TestCaseButton;
