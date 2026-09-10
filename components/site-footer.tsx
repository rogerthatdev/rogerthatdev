export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-slate-500 sm:flex-row">
        <span>© {new Date().getFullYear()} rogerthat.dev</span>
        <div className="flex gap-5">
          <a href="/feed.xml" className="hover:text-slate-900">
            RSS
          </a>
          <a
            href="https://github.com/rogerthatdev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-900"
          >
            Git
          </a>
          <a href="/colophon" className="hover:text-slate-900">
            Colophon
          </a>
        </div>
      </div>
    </footer>
  );
}
