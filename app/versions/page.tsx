import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { SiteShell } from "@/components/site-shell";
import { typo } from "@/lib/typography";

export const metadata: Metadata = {
  title: typo("Версии MineCMS"),
  description: typo(
    "Текущая версия 0.1.0-alpha.8: обновления безопасности, Vite 8, Turbo 2.9, нулевые уязвимости. Список пакетов @minecms/* и история релизов.",
  ),
};

const CURRENT_VERSION = "0.1.0-alpha.8";

const PACKAGES = [
  { name: "@minecms/core", path: "packages/core" },
  { name: "@minecms/sdk", path: "packages/sdk" },
  { name: "@minecms/sdk-next", path: "packages/sdk-next" },
  { name: "@minecms/sdk-nuxt", path: "packages/sdk-nuxt" },
  { name: "@minecms/ui", path: "packages/ui" },
  { name: "@minecms/server", path: "apps/server" },
  { name: "@minecms/studio", path: "apps/studio" },
  { name: "@minecms/create-minecms-app", path: "packages/create-minecms-app" },
] as const;

const CHANGELOG = [
  {
    version: "0.1.0-alpha.8",
    date: typo("июнь 2026"),
    items: [
      typo(
        "Обновление зависимостей с уязвимостями: turbo 2.9.14, vite 8.0.16, nuxt и транзитивные пакеты (esbuild, postcss, ws и др.) через прямые обновления и pnpm overrides.",
      ),
      typo("0 уязвимостей в аудите зависимостей монорепозитория."),
      typo("Исправления biome lint во всём репозитории."),
      typo("Синхронизация всех пакетов @minecms/* на единую версию 0.1.0-alpha.8."),
      typo("Удаление playground из pnpm workspace (Turbo ≥2.9.10 не поддерживает пакеты вне git root)."),
    ],
  },
  {
    version: "0.1.0-alpha.7",
    date: typo("май 2026"),
    items: [
      typo("Релиз только для @minecms/create-minecms-app: промежуточная версия CLI перед alpha.8."),
    ],
  },
  {
    version: "0.1.0-alpha.6",
    date: typo("май 2026"),
    items: [
      typo("Релиз только для @minecms/create-minecms-app: улучшения шаблонов и CLI."),
    ],
  },
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.28em] text-[#121212]/60">
      {children}
    </p>
  );
}

export default function VersionsPage() {
  return (
    <div className="min-h-screen bg-white text-[#121212]">
      <header className="border-b border-[#121212]/8">
        <SiteShell className="flex items-center justify-between py-6 md:py-7">
          <Link
            href="/"
            className="text-[13px] font-medium tracking-[0.22em] uppercase text-[#121212] transition-opacity hover:opacity-60"
          >
            MineCMS
          </Link>
          <SiteNav />
        </SiteShell>
      </header>

      <main>
        <SiteShell className="py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>{typo("Релизы")}</SectionLabel>
            <h1 className="mt-4 text-balance text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em]">
              {typo("Версии MineCMS")}
            </h1>
            <p className="mt-5 text-base leading-[1.8] text-[#121212]/75 md:text-lg">
              {typo(
                "Все пакеты @minecms/* публикуются на npm с единой версией. Текущий релиз — security-обновление зависимостей и синхронизация монорепозитория.",
              )}
            </p>
          </div>

          <section className="mx-auto mt-16 max-w-3xl">
            <SectionLabel>{typo("Текущая версия")}</SectionLabel>
            <div className="mt-4 rounded-lg border border-[#121212]/10 bg-[#fafafa] px-6 py-5">
              <p className="font-mono text-2xl tracking-[-0.02em] md:text-3xl">
                {CURRENT_VERSION}
              </p>
              <p className="mt-2 text-sm text-[#121212]/65">
                {typo("Дата релиза: июнь 2026")}
              </p>
              <p className="mt-1 text-sm text-[#121212]/65">
                dist-tag: <span className="font-mono">latest</span>,{" "}
                <span className="font-mono">alpha</span>
              </p>
            </div>
          </section>

          <section className="mx-auto mt-16 max-w-3xl">
            <SectionLabel>{typo("Что нового")}</SectionLabel>
            <ul className="mt-4 space-y-3 text-base leading-[1.8] text-[#121212]/75">
              {CHANGELOG[0].items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#121212]/40" aria-hidden>·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto mt-16 max-w-3xl">
            <SectionLabel>{typo("Пакеты")}</SectionLabel>
            <p className="mt-4 text-base leading-[1.8] text-[#121212]/75">
              {typo(
                "Восемь пакетов в организации @minecms на npm. Все синхронизированы на версию 0.1.0-alpha.8.",
              )}
            </p>
            <ul className="mt-6 divide-y divide-[#121212]/8 border-y border-[#121212]/8">
              {PACKAGES.map((pkg) => (
                <li
                  key={pkg.name}
                  className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-mono text-sm md:text-[15px]">{pkg.name}</span>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <Link
                      href={`https://www.npmjs.com/package/${pkg.name}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#121212]/70 transition-opacity hover:text-[#121212]"
                    >
                      npm →
                    </Link>
                    <Link
                      href={`https://github.com/minecms/minecms/tree/main/${pkg.path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#121212]/70 transition-opacity hover:text-[#121212]"
                    >
                      GitHub →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mx-auto mt-16 max-w-3xl">
            <SectionLabel>{typo("История")}</SectionLabel>
            <div className="mt-6 space-y-10">
              {CHANGELOG.map((entry) => (
                <div key={entry.version}>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="font-mono text-lg tracking-[-0.02em] md:text-xl">
                      {entry.version}
                    </h2>
                    <span className="text-sm text-[#121212]/55">{entry.date}</span>
                  </div>
                  <ul className="mt-3 space-y-2 text-[15px] leading-[1.75] text-[#121212]/75">
                    {entry.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-[#121212]/40" aria-hidden>·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-16 max-w-3xl">
            <SectionLabel>{typo("Установка")}</SectionLabel>
            <p className="mt-4 text-base leading-[1.8] text-[#121212]/75">
              {typo(
                "После установки Node 24+ и pnpm 10+ создайте проект одной командой. Тег latest указывает на актуальную версию.",
              )}
            </p>
            <pre className="mt-6 overflow-x-auto rounded-lg border border-[#121212]/10 bg-[#fafafa] px-5 py-4 font-mono text-[13px] leading-[1.9] text-[#121212]/85">
              <code>
                {`pnpm create @minecms/minecms-app my-app -- --next -y
# ${typo("или")}
npx @minecms/create-minecms-app@latest my-app -- --next -y

# ${typo("Установка отдельных пакетов")}
pnpm add @minecms/core@latest @minecms/sdk@latest`}
              </code>
            </pre>
            <p className="mt-4 text-sm text-[#121212]/60">
              {typo(
                "Для предрелизных версий можно явно указать тег: pnpm add @minecms/core@alpha",
              )}
            </p>
          </section>
        </SiteShell>
      </main>

      <footer className="border-t border-[#121212]/8 py-10">
        <SiteShell>
          <div className="flex flex-col items-center gap-4 text-center text-sm text-[#121212]/65 md:flex-row md:justify-between md:text-left">
            <Link href="/" className="transition-opacity hover:text-[#121212]">
              ← {typo("На главную")}
            </Link>
            <p>
              {typo("Сделано в")}{" "}
              <Link
                href="https://fubon.ru"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:text-[#121212]"
              >
                Fubon
              </Link>
            </p>
          </div>
        </SiteShell>
      </footer>
    </div>
  );
}
