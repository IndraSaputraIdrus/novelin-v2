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
        "bg-gray-100 text-slate-950"
      )}
      href={href}
    >
      {text}
    </Link>
  );
}
