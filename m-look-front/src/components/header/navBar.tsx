"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/globalReux/store";

const NavBar: React.FC<{
  links: { href: string; label: string }[];
}> = ({ links }) => {
  const pathname = usePathname();

  const [scrollingState, setScrollingState] = useState<"up" | "down">("up");
  const [lastScrollY, setLastScrollY] = useState(0);
  const { headerItemsHeight: height } = useSelector(
    (state: RootState) => state.navbarHeight
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        setScrollingState(currentScrollY < lastScrollY ? "up" : "down");
      }

      if (currentScrollY < 20) {
        setScrollingState("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [height, lastScrollY]);

  return (
    <nav
      className={`global-padding flex justify-between w-full bg-white sticky top-0 transition-all duration-300 z-[39] shadow-md ${
        scrollingState === "up" && `top-0`
      }`}
      style={{ top: scrollingState === "up" ? `${height}px` : "0" }}
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
