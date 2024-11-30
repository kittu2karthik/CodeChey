function ProblemStatement({ problem }) {
  return (
    <div
      id="pane1"
      className="scrollbar-thin scrollbar-thumb-white scrollbar-track-red-100 scrollbar-w-2 h-screen flex-1 overflow-y-scroll p-4"
    >
      <h1 className="mb-4 text-3xl font-bold">{problem.title}</h1>
      <p className="mb-4 text-gray-600">{problem.description}</p>
      <p className="mb-4">
        <strong className="text-gray-800">Difficulty:</strong>{" "}
        <span
          className={`rounded-full px-3 py-1 text-white ${
            problem.difficulty === "hard"
              ? "bg-red-500"
              : problem.difficulty === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
          }`}
        >
          {problem.difficulty}
        </span>
      </p>
      <p className="mb-4">
        <strong className="text-gray-800">Topics:</strong>{" "}
        {problem.topics.join(", ")}
      </p>
      <p className="mb-4">
        <strong className="text-gray-800">Companies:</strong>{" "}
        {problem.companies.join(", ")}
      </p>
      <div className="mb-4">
        <strong className="text-gray-800">Hints:</strong>
        <ul className="list-inside list-disc text-gray-600">
          {problem.hints.map((hint, index) => (
            <li key={index}>{hint}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong className="text-gray-800">Examples:</strong>
        <ul className="list-inside list-disc text-gray-600">
          {problem.examples.map((example) => (
            <li key={example._id}>
              <strong>Input:</strong> {example.input} <br />
              <strong>Output:</strong> {example.output} <br />
              <strong>Explanation:</strong> {example.explanation}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <strong className="text-gray-800">Constraints:</strong>
        <ul className="list-inside list-disc text-gray-600">
          {problem.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
      </div>
      <div>
        <strong className="text-gray-800">Test Cases:</strong>
        <ul className="list-inside list-disc text-gray-600">
          {problem.testCases.map((testCase) => (
            <li key={testCase._id}>
              <strong>Input:</strong> {testCase.input} <br />
              <strong>Expected Output:</strong> {testCase.expectedOutput}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProblemStatement;
