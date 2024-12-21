function Input({ testcase, onChangeTestCase }) {
  return (
    <input
      type="text"
      className="h-1/4 w-full text-black"
      value={testcase}
      onChange={(e) => onChangeTestCase(e.target.value)}
    />
  );
}

export default Input;
