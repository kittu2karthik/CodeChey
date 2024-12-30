import { useState } from "react";
import RunButton from "./RunButton";
import TestCaseButton from "./TextCaseButton";
import Input from "./Input";

function TestCases({ id, value, language, input, onChangeInput }) {
  const [output, setOutput] = useState("");

  return (
    <>
      {output && <p>{output}</p>}
      <RunButton
        id={id}
        onOutput={setOutput}
        value={value}
        language={language}
        input={input}
      />
      <TestCaseButton
        id={id}
        onOutput={setOutput}
        value={value}
        language={language}
        input={input}
      />
      <Input input={input} onChangeInput={onChangeInput} />
    </>
  );
}

export default TestCases;
