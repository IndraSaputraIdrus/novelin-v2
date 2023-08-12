import clsx from "clsx";
import Link from "next/link";

const navLinks = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
];

export default function Navbar() {
  return (
    <header className={clsx("border-b border-white")}>
      <nav
        className={clsx(
          "flex justify-between items-center",
          "max-w-2xl h-14",
          "px-5 mx-auto md:px-3"
        )}
      >
        <h1 className="text-2xl font-semibold">Novelin</h1>
        <ul className={clsx("flex items-center", "space-x-10")}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link href={link.url}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
