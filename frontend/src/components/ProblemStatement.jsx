function ProblemStatement({ problem }) {
  return (
    <div
      id="pane1"
      className="no-scrollbar h-screen flex-1 overflow-y-scroll bg-gradient-to-tr from-zinc-900 to-slate-900 p-6 scrollbar-thin"
    >
      <div className="mx-auto max-w-4xl rounded-lg p-6 shadow-lg">
        {/* Problem Title */}
        <h1 className="mb-6 text-center text-4xl font-extrabold text-white">
          {problem.title}
        </h1>

        {/* Problem Description */}
        <p className="mb-6 text-center text-lg text-white">
          {problem.description}
        </p>

        {/* Difficulty */}
        <div className="mb-6 flex items-center justify-center">
          <span
            className={`inline-block rounded-full px-4 py-2 text-sm font-semibold uppercase ${
              problem.difficulty === "hard"
                ? "bg-red-600 text-white"
                : problem.difficulty === "medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500 text-white"
            }`}
          >
            Difficulty: {problem.difficulty}
          </span>
        </div>

        {/* Topics */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-white">Topics:</h3>
          <div className="flex flex-wrap gap-2">
            {problem.topics.map((topic, index) => (
              <span
                key={index}
                className="inline-block rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-white">Companies:</h3>
          <div className="flex flex-wrap gap-2">
            {problem.companies.map((company, index) => (
              <span
                key={index}
                className="inline-block rounded-full bg-blue-700 px-3 py-1 text-sm text-white"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Hints */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-white">Hints:</h3>
          <ul className="list-inside list-disc pl-4 text-gray-300">
            {problem.hints.map((hint, index) => (
              <li key={index}>{hint}</li>
            ))}
          </ul>
        </div>

        {/* Examples */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-white">Examples:</h3>
          {problem.examples.map((example) => (
            <div
              key={example._id}
              className="mb-4 rounded-lg bg-gray-700 p-4 shadow-md"
            >
              <p className="text-white">
                <strong>Input:</strong> {example.input}
              </p>
              <p className="text-white">
                <strong>Output:</strong> {example.output}
              </p>
              {example.explanation && (
                <p>
                  <strong>Explanation:</strong> {example.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Constraints */}
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-semibold text-white">
            Constraints:
          </h3>
          <ul className="list-inside list-disc pl-4 text-gray-300">
            {problem.constraints.map((constraint, index) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemStatement;
