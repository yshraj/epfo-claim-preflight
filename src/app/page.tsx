import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center gap-6 max-w-md mx-auto">
      <h1 className="text-2xl sm:text-3xl font-semibold">
        Will your PF claim get rejected?
      </h1>
      <p className="text-slate-600">
        Check your records before you submit — not three weeks after.
      </p>
      <Link
        href="/login"
        className="mt-2 inline-block bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Get started
      </Link>
    </div>
  );
}
