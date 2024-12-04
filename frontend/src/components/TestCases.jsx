import { useState } from "react";
import RunButton from "./RunButton";
import CompileButton from "./CompileButton";

function TestCases({ id, value, language }) {
  const [output, setOutput] = useState("");

  return (
    <>
      {output && <p>{output}</p>}
      <RunButton
        id={id}
        onOutput={setOutput}
        value={value}
        language={language}
      />
      <CompileButton />
    </>
  );
}

export default TestCases;
