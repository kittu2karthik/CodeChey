function Input({ input, onChangeInput }) {
  return (
    <input
      type="text"
      className="h-16 w-full p-4 text-black"
      value={input}
      placeholder="Input your test cases here"
      onChange={(e) => onChangeInput(e.target.value)}
    />
  );
}

export default Input;
