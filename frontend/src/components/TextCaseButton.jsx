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
      const response = await axios.post(`${API_URI}/users/submitCode`, {
        code: value,
        problemId: id,
        language: language,
        testcase: testcase,
        userId: "6748babd85bc7574f2cecf32",
      });

      console.log("Compilation result:", response.data);

      console.log(response.data.data.submission.verdict);

      if (response.status === "success") {
        onOutput(response.data.data.submission.verdict);
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
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Submit"}
      </button>

      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default TestCaseButton;
