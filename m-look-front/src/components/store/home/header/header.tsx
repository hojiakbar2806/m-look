import React from "react";
import HeaderItems from "./topItem/headerItems";
import NavBar from "./navItems/navBar";

const Header: React.FC = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/bags", label: "Bags" },
    { href: "/sneakers", label: "Sneakers" },
    { href: "/belt", label: "Belt" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <React.Fragment>
      <HeaderItems />
      <NavBar links={navLinks} />
    </React.Fragment>
  );
};

export default Header;
