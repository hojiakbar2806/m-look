"use client";

import React from "react";
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
    <React.Fragment>
      <HeaderItems />
      <NavBar links={navLinks} />
    </React.Fragment>
  );
};

export default Header;
