import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6 text-sm text-slate-500">
        <div>
          <div className="font-display font-bold text-slate-900 mb-1">Claim Pre-Flight</div>
          <p className="max-w-xs">
            Independent hackathon prototype. Not affiliated with or endorsed by
            EPFO. All data is simulated.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2">
          <Link href="/#how-it-works" className="hover:text-slate-900 transition-colors">
            How it works
          </Link>
          <a
            href="https://www.epfindia.gov.in/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-900 transition-colors"
          >
            Official EPFO site ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
