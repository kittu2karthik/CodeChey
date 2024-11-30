import { useNavigate } from "react-router-dom";

function Problem({ problem }) {
  const navigate = useNavigate();

  const handleTitleClick = () => {
    navigate(`/problem/${problem._id}`);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td
        className="border-b border-gray-200 px-6 py-4 text-black"
        onClick={handleTitleClick}
      >
        {problem.title}
      </td>

      <td className="border-b border-gray-200 px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-black ${
            problem.difficulty === "hard"
              ? "bg-red-500"
              : problem.difficulty === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
          }`}
        >
          {problem.difficulty}
        </span>
      </td>
      <td className="border-b border-gray-200 px-6 py-4 text-black">
        {problem.topics.join(", ")}
      </td>
      <td className="border-b border-gray-200 px-6 py-4 text-black">
        {problem.companies.join(", ")}
      </td>
    </tr>
  );
}

export default Problem;
