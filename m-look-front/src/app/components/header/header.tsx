"use client";

import HeaderItems from "./headerItems";
import NavBar from "./navBar";

const Header: React.FC = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/", label: "Bags" },
    { href: "/", label: "Sneakers" },
    { href: "/", label: "Belt" },
    { href: "/", label: "Contact" },
  ];

  return (
    <header className="flex flex-col z-10 sticky top-0 w-full border-b">
      <HeaderItems />
      <NavBar links={navLinks} />
    </header>
  );
};

export default Header;
