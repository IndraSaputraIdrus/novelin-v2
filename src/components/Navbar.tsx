import clsx from "clsx";
import Link from "next/link";
import Container from "./Container";

const navLinks = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
];

export default function Navbar() {
  return (
    <header
      className={clsx("border-b border-gray-300 bg-gray-100 text-gray-950")}
    >
      <Container>
        <nav
          className={clsx("flex justify-between items-center", "h-14")}
        >
          <Link href="/">
            <h1 className="text-2xl font-semibold">Novelin</h1>
          </Link>
          <ul className={clsx("flex items-center", "space-x-10")}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.url}
                  className="text-gray-700 hover:text-gray-950"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
