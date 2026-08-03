import Link from "next/link";

export function PatientShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface text-primary">
      <nav className="border-b border-subtle bg-surface-raised/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/patient/dashboard" className="font-display text-lg font-semibold text-primary">
            Rehab Connect
          </Link>
          <div className="flex gap-4 text-sm text-secondary">
            <Link href="/patient/dashboard">Dashboard</Link>
            <Link href="/patient/book">Book</Link>
            <Link href="/patient/consultations">Consultations</Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
