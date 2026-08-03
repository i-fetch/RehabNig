import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="page-shell px-6 py-16 lg:px-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-subtle bg-surface-raised p-10 shadow-brand">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-brand">Rehab Connect</p>
          <h1 className="font-display text-4xl font-semibold text-primary sm:text-5xl">
            Personalized recovery support for every consultation.
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            Book telehealth consultations, coordinate care, and track recovery in one calm and trusted experience.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/(auth)/register" className="rounded-full bg-brand px-6 py-3 font-medium text-primary">
            Get started
          </Link>
          <Link href="/(auth)/login" className="rounded-full border border-subtle bg-surface px-6 py-3 font-medium text-primary">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
