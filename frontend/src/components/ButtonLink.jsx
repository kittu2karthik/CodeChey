import { Link } from "react-router-dom";

function ButtonLink({ children }) {
  console.log(children);
  return (
    <Link
      to={`/${children}`}
      className="cursor-pointer rounded-md p-2 text-center text-xl font-bold transition hover:bg-purple-900 hover:text-white"
    >
      {children}
    </Link>
  );
}

export default ButtonLink;
