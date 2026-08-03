import { PatientShell } from "@/components/patient/PatientShell";
import Link from "next/link";

export default function PatientSettingsPage() {
  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Settings</p>
            <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Manage your account</h1>
            <p className="mt-3 text-secondary">Update your profile, review privacy settings, and access support resources.</p>
          </section>

          <section className="surface-card rounded-3xl border border-subtle p-6 space-y-4">
            <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
              <p className="text-sm font-medium text-secondary">Profile</p>
              <p className="mt-2 text-primary">Patient Demo</p>
              <p className="mt-1 text-sm text-secondary">patient@example.com</p>
            </div>
            <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
              <p className="text-sm font-medium text-secondary">Notifications</p>
              <p className="mt-2 text-sm text-secondary">You are currently subscribed to care updates.</p>
            </div>
            <Link href="/patient/dashboard" className="inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary">
              Back to dashboard
            </Link>
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
