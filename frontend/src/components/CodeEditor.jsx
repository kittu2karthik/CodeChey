import { useState, useEffect, useCallback } from "react";

import CodeMirror from "@uiw/react-codemirror";

import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

import { oneDark } from "@codemirror/theme-one-dark";

function CodeEditor() {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState("console.log('hello world!');");

  useEffect(() => {
    switch (language) {
      case "javascript":
        setValue('console.log("hello world");');
        break;
      case "python":
        setValue('print("hello world")');
        break;
      case "cpp":
        setValue(
          '#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Hello World" << endl;\n\treturn 0;\n}',
        );
        break;
      case "java":
        setValue(
          'import java.util.*;\n\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}',
        );
        break;
      default:
        setValue('console.log("hello world");');
    }
  }, [language]);

  const onChange = useCallback((val) => {
    console.log("val:", val);
    setValue(val);
  }, []);

  const getLanguageExtension = (language) => {
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "python":
        return python();
      case "cpp":
        return cpp();
      case "java":
        return java();
      default:
        return javascript({ jsx: true });
    }
  };

  return (
    <div>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4 p-2 text-black"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
      <CodeMirror
        value={value}
        className="h-screen"
        theme={oneDark}
        extensions={[getLanguageExtension(language)]}
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditor;
