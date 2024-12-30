import { useState, useEffect } from "react";
import axios from "axios";

import Problem from "./Problem";

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
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold">Problems</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-black-200 border-b-2 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Title
              </th>

              <th className="border-b-2 border-gray-200 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Difficulty
              </th>
              <th className="border-b-2 border-gray-200 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Topics
              </th>
              <th className="border-b-2 border-gray-200 px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-black">
                Companies
              </th>
            </tr>
          </thead>
          <tbody>
            {problems?.map((problem) => (
              <Problem key={problem._id} problem={problem} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProblemsPage;
