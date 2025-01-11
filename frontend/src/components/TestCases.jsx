import { useState } from "react";
import RunButton from "./RunButton";
import SubmitButton from "./SubmitButton";
import Input from "./Input";

function TestCases({ id, value, language, input, onChangeInput }) {
  const [output, setOutput] = useState("");

  return (
    <div className="no-scrollbar rounded-lg bg-gray-800 p-4 text-gray-200 shadow-lg">
      {output && (
        <div className="no-scrollbar mb-4 max-h-60 overflow-scroll rounded bg-gray-700 p-3 text-sm text-gray-300">
          <strong>Output: </strong> <pre>{output}</pre>
        </div>
      )}
      <div className="mb-4 flex items-center gap-4">
        <RunButton
          id={id}
          onOutput={setOutput}
          value={value}
          language={language}
          input={input}
        />
        <SubmitButton
          id={id}
          onOutput={setOutput}
          value={value}
          language={language}
          input={input}
        />
      </div>
      <Input input={input} onChangeInput={onChangeInput} />
    </div>
  );
}

export default TestCases;
