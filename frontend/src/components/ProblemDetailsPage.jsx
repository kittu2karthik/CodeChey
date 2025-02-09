import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URI from "../config";
import ProblemStatement from "./ProblemStatement.jsx";
import CodeEditor from "./CodeEditor.jsx";
import TestCases from "./TestCases";
import Split from "react-split";

function ProblemDetailsPage() {
  const { id } = useParams();
  console.log(id);
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("console.log('hello world!');");
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`${API_URI}/problems/${id}`);
        setProblem(response.data.data.problem);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching problem details:", err);
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
      sizes={[60, 40]}
      minSize={100}
      gutterSize={10}
      className="flex h-screen"
    >
      {problem && <ProblemStatement problem={problem} />}
      <div className="no-scrollbar overflow-scroll bg-gradient-to-tr from-zinc-900 to-slate-900">
        <Split
          sizes={[50, 50]}
          minSize={100}
          gutterSize={10}
          direction="vertical"
          className="no-scrollbar flex h-screen flex-col"
        >
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
            input={input}
            onChangeInput={setInput}
          />
        </Split>
      </div>
    </Split>
  );
}

export default ProblemDetailsPage;
