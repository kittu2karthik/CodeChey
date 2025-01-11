import axios from "axios";
import API_URI from "../config";
import { useState } from "react";

function SubmitButton({ id, value, language, onOutput, testcase }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const testCase = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        setErrorMessage("User ID not found. Please log in again.");
        return;
      }

      const response = await axios.post(`${API_URI}/users/submitCode`, {
        code: value,
        problemId: id,
        language,
        testcase,
        userId,
      });

      const verdict = response?.data?.data?.submission?.verdict;

      if (verdict) {
        onOutput(verdict);
      } else {
        setErrorMessage("Unexpected response structure.");
      }
    } catch (error) {
      console.error("Error during code execution:", error);

      onOutput(error.response.data.stack);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={testCase}
        className="no-scrollbar rounded bg-green-500 p-2 text-white hover:bg-green-600"
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Submit"}
      </button>

      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </div>
  );
}

export default SubmitButton;
