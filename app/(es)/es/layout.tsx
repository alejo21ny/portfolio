import RootShell, { rootMetadata } from "@/app/components/RootShell";

export const metadata = rootMetadata("es");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="es">{children}</RootShell>;
}
