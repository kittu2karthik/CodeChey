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
  console.log(id);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("console.log('hello world!');");
  const [testcase, setTestCase] = useState("");

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`${API_URI}/problems/${id}`);
        setProblem(response.data.data.problem);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching problem details:", err); // Log for debugging
        setError("Failed to fetch problem details. Please try again later.");
        setLoading(false);
      }
    };

    fetchProblemDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="mt-10 flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  return (
    <Split
      sizes={[60, 40]} // Give more space to the problem statement pane
      minSize={100}
      gutterSize={10}
      className="flex h-screen"
    >
      {problem && <ProblemStatement problem={problem} />}

      <div id="pane2" className="bg-red-400 p-4">
        <Split gutterSize={10} sizes={[70, 30]}>
          <CodeEditor
            language={language}
            onChangeLanguage={setLanguage}
            value={value}
            onChangeValue={setValue}
          />
          <TestCases
            id={id}
            value={value}
            language={language}
            testcase={testcase}
            onChangeTestCase={setTestCase}
          />
        </Split>
      </div>
    </Split>
  );
}

export default ProblemDetailsPage;
