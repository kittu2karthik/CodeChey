function Input({ input, onChangeInput }) {
  return (
    <input
      type="text"
      className="h-1/4 w-full text-black"
      value={input}
      placeholder="Input your test cases here"
      onChange={(e) => onChangeInput(e.target.value)}
    />
  );
}

export default Input;
