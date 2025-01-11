import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer items-center justify-center gap-4 hover:text-purple-900"
      onClick={() => navigate("/")}
    >
      <img
        src="http://logobook.com/wp-content/uploads/2019/02/Banco_Zaragozano_logo-1.svg"
        alt=""
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-2"
      />
      <p className="text-3xl font-extrabold tracking-tighter">Codechey</p>
    </div>
  );
}

export default Logo;
