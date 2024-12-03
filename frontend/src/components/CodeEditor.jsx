import { useEffect, useCallback } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

function CodeEditor({ language, onChangeLanguage, value, onChangeValue }) {
  useEffect(() => {
    const defaultCode = {
      javascript: 'console.log("hello world");',
      python: 'print("hello world")',
      cpp: `#include <iostream>
using namespace std;

int main() {
\tcout << "Hello World" << endl;
\treturn 0;
}`,
      java: `import java.util.*;

public class HelloWorld {
\tpublic static void main(String[] args) {
\t\tSystem.out.println("Hello World");
\t}
}`,
    };

    onChangeValue(defaultCode[language]);
  }, [language, onChangeValue]);

  const onChange = useCallback(
    (val) => {
      console.log("CodeMirror value updated:", val);
      onChangeValue(val);
    },
    [onChangeValue],
  );

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
        onChange={(e) => onChangeLanguage(e.target.value)}
        className="mb-4 rounded border border-gray-300 p-2 text-black"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="cpp">C++</option>
        <option value="java">Java</option>
      </select>
      <CodeMirror
        value={value}
        className="h-[50vh] rounded border border-gray-300"
        theme={oneDark}
        extensions={[getLanguageExtension(language)]}
        onChange={onChange}
      />
    </div>
  );
}

export default CodeEditor;
