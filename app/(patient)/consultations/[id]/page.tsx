import Link from "next/link";
import { CalendarDays, FileText, MessageSquareText, ShieldCheck } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";
import Consultation from "@/models/Consultation";
import { dbConnect } from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PatientConsultationDetailPage({ params }: Props) {
  const { id } = await params;
  await dbConnect();
  const consultation = await Consultation.findById(id).lean();

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Consultation session</p>
                <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Session overview</h1>
                <p className="mt-3 text-secondary">This view now reads from the consultation record so each session has a real detail state.</p>
              </div>
              <Link href="/patient/consultations" className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface-muted px-4 py-2 text-sm font-medium text-secondary">
                Back to history
              </Link>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="surface-card rounded-3xl border border-subtle p-6">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-brand" />
                <h2 className="font-display text-xl font-semibold text-primary">Session details</h2>
              </div>
              {consultation ? (
                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Status</p>
                    <p className="mt-2 font-semibold text-primary">{consultation.status}</p>
                  </div>
                  <div className="rounded-2xl border border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Type</p>
                    <p className="mt-2 font-semibold text-primary">{consultation.type}</p>
                  </div>
                  <div className="rounded-2xl border border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Notes</p>
                    <p className="mt-2 text-sm text-secondary">{consultation.notes || "No notes have been added yet."}</p>
                  </div>
                  <div className="rounded-2xl border border-subtle bg-surface-muted p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">Summary</p>
                    <p className="mt-2 text-sm text-secondary">{consultation.summary || "No summary has been added yet."}</p>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-sm text-secondary">No consultation record was found for this session.</p>
              )}
            </div>

            <div className="surface-card rounded-3xl border border-subtle p-6">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-brand" />
                <h2 className="font-display text-xl font-semibold text-primary">Session information</h2>
              </div>
              <div className="mt-5 space-y-3 text-sm text-secondary">
                <div className="flex items-center gap-2"><CalendarDays size={14} className="text-brand" /> Follow-up date available in the consultation record.</div>
                <div className="flex items-center gap-2"><MessageSquareText size={14} className="text-brand" /> Notes and summaries appear here once added by the care team.</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
