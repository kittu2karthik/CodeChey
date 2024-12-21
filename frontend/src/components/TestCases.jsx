import { useState } from "react";
import RunButton from "./RunButton";
import TestCaseButton from "./TextCaseButton";
import Input from "./Input";

function TestCases({ id, value, language, testcase, onChangeTestCase }) {
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
      <TestCaseButton
        id={id}
        onOutput={setOutput}
        value={value}
        language={language}
        testcase={testcase}
      />
      <Input testcase={testcase} onChangeTestCase={onChangeTestCase} />
    </>
  );
}

export default TestCases;
