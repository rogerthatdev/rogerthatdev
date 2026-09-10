import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader({ active }: { active: "home" | "blog" }) {
  return (
    <header className="border-b border-slate-200">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-lg font-semibold text-slate-900">
            R/M
          </span>
          <span className="font-mono text-sm text-slate-900">
            rogerthat.dev
          </span>
        </Link>
        <span className="font-mono text-xs tracking-wide text-slate-500">
          {siteConfig.statusBadge}
        </span>
      </div>
      <nav className="border-t border-slate-200">
        <div className="mx-auto flex max-w-5xl justify-end gap-6 px-6 py-3 font-mono text-xs uppercase tracking-wide">
          <Link
            href="/"
            className={
              active === "home"
                ? "text-slate-900 underline underline-offset-4"
                : "text-slate-500 hover:text-slate-900"
            }
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={
              active === "blog"
                ? "text-slate-900 underline underline-offset-4"
                : "text-slate-500 hover:text-slate-900"
            }
          >
            Blog
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900"
          >
            Github
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900"
          >
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}
