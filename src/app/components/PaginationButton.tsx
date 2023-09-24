import clsx from "clsx";
import Link from "next/link";

type Props = {
  href: string;
  text: string;
};

export default function PaginationButton({ href, text }: Props) {
  return (
    <Link
      className={clsx(
        "block",
        "w-max",
        "px-3 py-1",
        "text-gray-100 bg-slate-950",
        "rounded",
        "border-2 border-gray-100",
        "custom-shadow",
        "transition duration-300",
        "hover:opacity-70"
      )}
      href={href}
    >
      {text}
    </Link>
  );
}
