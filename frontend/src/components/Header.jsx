import Navbar from "./Navbar";
import Button from "./ButtonLink";
import Logo from "./Logo";

function Header() {
  return (
    <Navbar>
      <Logo />
      <div className="flex gap-8">
        <Button>login</Button>
        <Button>signup</Button>
      </div>
    </Navbar>
  );
}

export default Header;
