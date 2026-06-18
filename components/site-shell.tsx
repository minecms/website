import type { ReactNode } from "react";

export function SiteShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}
