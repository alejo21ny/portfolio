import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/integrations", label: "Integrations" },
  { href: "/labs", label: "Labs" },
  { href: "/docs", label: "Docs" },
  { href: "/english", label: "English" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="font-semibold">David Gomez</Link>
        <div className="ml-auto flex gap-3 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
