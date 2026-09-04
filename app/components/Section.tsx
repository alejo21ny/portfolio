import { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {eyebrow && (
          <p className="mb-2 text-sm font-medium tracking-wide text-accent">{eyebrow}</p>
        )}
        <h2 className="mb-8 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}
