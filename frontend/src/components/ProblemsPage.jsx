import { useState, useEffect } from "react";
import axios from "axios";

import Table from "./Table";

import API_URI from "../config";

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${API_URI}/problems`);
        console.log(response);
        setProblems(response.data.data.problems);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch problems." + err.message);
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div className="mt-10 text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="h-screen bg-gradient-to-tr from-zinc-900 to-slate-900 p-6 text-gray-200">
      <Table problems={problems} />
    </div>
  );
}

export default ProblemsPage;
