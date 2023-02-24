import Link from "next/link";
import { CSSProperties } from "react";

const link = { margin: 8 };

function NavLink({ href }: { href: string }) {
  return (
    <Link href={href} style={link}>
      {href}
    </Link>
  );
}

const nav: CSSProperties = {
  padding: 4,
  borderRadius: 4,
  backgroundColor: "lightgray",
};

export default function PageNav() {
  return (
    <nav style={nav}>
      <NavLink href="/account" />
      <NavLink href="/users" />
    </nav>
  );
}
