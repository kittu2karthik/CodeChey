import React, { useState } from "react";

import { Link } from "react-router-dom";

function NavBar({ children }) {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="flex h-24 items-center justify-between p-3">
      {children}

      <button
        onClick={toggleNav}
        className="h-12 w-12 rounded-md bg-white p-2 shadow-md"
      >
        <Icon isNavOpen={isNavOpen} />
      </button>

      {/* Dropdown or Navigation Menu */}
      {isNavOpen && (
        <div className="absolute left-1/2 top-1/2 h-auto w-full -translate-x-1/2 -translate-y-1/2 transform rounded-lg p-4 text-white shadow-lg">
          <ul className="flex flex-col gap-2 bg-white">
            <Link
              to="/login"
              className="cursor-pointer rounded-md p-2 text-center font-semibold text-gray-700 transition hover:bg-red-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="signup"
              className="cursor-pointer rounded-md p-2 text-center font-semibold text-gray-700 transition hover:bg-red-300 hover:text-white"
            >
              Signup
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;

function Icon({ isNavOpen }) {
  return (
    <img
      src={
        isNavOpen
          ? "https://www.pngfind.com/pngs/m/90-904785_png-file-svg-close-button-icon-png-transparent.png"
          : "https://cdn.iconscout.com/icon/premium/png-512-thumb/hamburger-menu-5-614504.png?f=webp&w=256"
      }
      alt={isNavOpen ? "Close Menu" : "Open Menu"}
      className="h-full w-full object-contain"
    />
  );
}
