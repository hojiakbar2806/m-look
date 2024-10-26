import Link from "next/link";

const NavBar: React.FC<{ links: { href: string; label: string }[] }> = ({
  links,
}) => (
  <nav className="flex justify-between w-full bg-white px-4 py-4 md:px-24">
    <div className="text-sm md:text-lg lg:text-xl">LOGO</div>
    <ul className="flex items-center gap-12">
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link className="text-sm md:text-lg lg:text-xl" href={href}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);


export default NavBar;