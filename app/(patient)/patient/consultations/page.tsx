"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Clock3, FileText, ShieldCheck } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";

export default function PatientConsultationsPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConsultations() {
      const response = await fetch("/api/consultations");
      const data = await response.json();
      if (data.consultations) {
        setConsultations(data.consultations);
      }
      setLoading(false);
    }

    void loadConsultations();
  }, []);

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Consultation history</p>
                <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Review your past sessions</h1>
                <p className="mt-3 max-w-2xl text-secondary">All sessions and summaries are shown here once your care team records them.</p>
              </div>
              <Link href="/patient/book" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary">
                Book again
              </Link>
            </div>
          </section>

          <section className="surface-card rounded-3xl border border-subtle p-6">
            {loading ? (
              <p className="text-sm text-secondary">Loading consultations...</p>
            ) : consultations.length > 0 ? (
              <div className="space-y-4">
                {consultations.map((consultation) => (
                  <Link
                    key={consultation._id?.toString() || consultation.createdAt}
                    href={`/consultations/${consultation._id?.toString()}`}
                    className="block rounded-3xl border border-subtle bg-surface-muted p-5 transition hover:border-brand/50"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-primary">{consultation.type} consultation</p>
                        <p className="mt-1 text-sm text-secondary">Status: {consultation.status}</p>
                      </div>
                      <div className="rounded-full bg-brand/15 px-3 py-1 text-sm font-medium text-brand">View details</div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-secondary">
                      <span className="inline-flex items-center gap-2"><CalendarDays size={14} />{new Date(consultation.createdAt).toLocaleDateString()}</span>
                      <span className="inline-flex items-center gap-2"><Clock3 size={14} />{new Date(consultation.createdAt).toLocaleTimeString()}</span>
                      <span className="inline-flex items-center gap-2"><FileText size={14} />{consultation.summary ? "Summary available" : "No summary"}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-subtle bg-surface-muted p-6 text-sm text-secondary">
                <p>You don’t have any recorded consultations yet.</p>
                <p className="mt-3">Book your first session and your consultation record will appear here.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
