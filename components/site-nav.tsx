import Link from "next/link";
import { typo } from "@/lib/typography";

type SiteNavProps = {
  variant?: "hero" | "default";
};

export function SiteNav({ variant = "default" }: SiteNavProps) {
  const isHero = variant === "hero";

  return (
    <nav
      className={`flex items-center gap-6 text-[13px] tracking-wide transition-colors duration-300 ${
        isHero ? "text-white/80" : "text-[#121212]/70"
      }`}
    >
      <Link
        href="/versions"
        className={`transition-colors duration-300 ${isHero ? "hover:text-white" : "hover:text-[#121212]"}`}
      >
        {typo("Версии")}
      </Link>
      <Link
        href="https://github.com/minecms/minecms"
        className={`transition-colors duration-300 ${isHero ? "hover:text-white" : "hover:text-[#121212]"}`}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </Link>
      <Link
        href="https://www.npmjs.com/org/minecms"
        className={`transition-colors duration-300 ${isHero ? "hover:text-white" : "hover:text-[#121212]"}`}
        target="_blank"
        rel="noreferrer"
      >
        npm
      </Link>
    </nav>
  );
}
