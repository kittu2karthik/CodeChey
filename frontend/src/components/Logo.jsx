import React from "react";

function Logo() {
  return (
    <div className="flex items-center justify-center gap-4">
      <img
        src="http://logobook.com/wp-content/uploads/2019/02/Banco_Zaragozano_logo-1.svg"
        alt=""
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white p-2"
      />
      <p>Codechey</p>
    </div>
  );
}

export default Logo;
