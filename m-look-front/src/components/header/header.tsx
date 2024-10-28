"use client";

import React, { useState } from "react";
import HeaderItems from "./headerItems";
import NavBar from "./navBar";

const Header: React.FC = () => {

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/product/bags", label: "Bags" },
    { href: "/product/sneakers", label: "Sneakers" },
    { href: "/product/belt", label: "Belt" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <React.Fragment>
      <HeaderItems  />
      <NavBar links={navLinks} />
    </React.Fragment>
  );
};

export default Header;
