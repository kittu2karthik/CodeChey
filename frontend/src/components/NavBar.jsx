function NavBar({ children }) {
  return (
    <header className="mx-auto flex w-10/12 max-w-[1200px] items-center justify-between pt-10">
      {children}
    </header>
  );
}

export default NavBar;
