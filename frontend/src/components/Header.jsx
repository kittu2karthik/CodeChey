import NavBar from "./NavBar";
import Button from "./ButtonLink";
import Logo from "./Logo";

function Header() {
  return (
    <NavBar>
      <Logo />
      <div className="flex gap-8">
        <Button>login</Button>
        <Button>signup</Button>
      </div>
    </NavBar>
  );
}

export default Header;
