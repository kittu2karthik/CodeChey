import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URI from "../config";
import ProblemStatement from "./ProblemStatement.jsx";
import CodeEditor from "./CodeEditor.jsx";

import TestCases from "./TestCases";

import Split from "react-split";

function ProblemDetailsPage() {
  const { id } = useParams(); // Get the problem ID from the URL
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`${API_URI}/problems/${id}`);
        setProblem(response.data.data.problem);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch problem details." + err.message);
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [id]);

  if (loading) {
    return <div className="mt-10 text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  return (
    <Split
      sizes={[50, 50]}
      minSize={100}
      gutterSize={10}
      className="flex h-screen"
    >
      {problem && <ProblemStatement problem={problem} />}

      <div id="pane2" className="bg-red-500 p-4">
        <Split sizes={[50, 50]} minSize={100} gutterSize={10}>
          <CodeEditor />
          <TestCases />
        </Split>
      </div>
    </Split>
  );
}

export default ProblemDetailsPage;
