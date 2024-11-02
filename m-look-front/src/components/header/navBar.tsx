"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarState } from "src/globalReux/feature/navbarState";
import { RootState } from "src/globalReux/store";

const NavBar: React.FC<{
  links: { href: string; label: string }[];
}> = ({ links }) => {
  const pathname = usePathname();

  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarState = useSelector((state: RootState) => state.navbarHeight);
  const dispatch = useDispatch();


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        dispatch(setNavbarState(currentScrollY < lastScrollY ? true : false));
      }

      if (currentScrollY < 20) {
        dispatch(setNavbarState(true));
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, dispatch]);

  return (
    <nav
      data-state={navbarState.isTop}
      className="global-padding data-[state=true]:top-20 flex justify-between w-full bg-white sticky top-0 transition-all duration-300 z-[39] shadow-md "
    >
      <div className="text-sm md:text-lg lg:text-xl">LOGO</div>
      <ul className="flex items-center gap-12">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={label}>
              <Link
                data-active={isActive}
                className="data-[active=true]:text-primary text-sm md:text-lg text-dark lg:text-xl"
                href={href}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
