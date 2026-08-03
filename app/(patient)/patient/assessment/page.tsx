"use client";

import { useState } from "react";
import { PatientShell } from "@/components/patient/PatientShell";

export default function PatientAssessmentPage() {
  const [form, setForm] = useState({ condition: "", painLevel: "5", mobilityNotes: "", injuryDate: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/assessments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: "patient-demo",
        condition: form.condition,
        painLevel: Number(form.painLevel),
        mobilityNotes: form.mobilityNotes,
        injuryDate: form.injuryDate,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Could not save assessment.");
      return;
    }

    setMessage("Assessment saved. Your care team can review the details soon.");
    setForm({ condition: "", painLevel: "5", mobilityNotes: "", injuryDate: "" });
  }

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Recovery assessment</p>
            <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Tell us how your body is feeling</h1>
            <p className="mt-3 text-secondary">This assessment helps your care coordinator understand your pain, mobility, and recovery needs.</p>
          </section>

          <section className="surface-card rounded-3xl border border-subtle p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-secondary">Primary condition</label>
                <input
                  type="text"
                  value={form.condition}
                  onChange={(event) => setForm({ ...form, condition: event.target.value })}
                  className="mt-2 w-full rounded-3xl border border-subtle bg-surface px-4 py-3 text-primary outline-none"
                  placeholder="Knee pain, shoulder stiffness, etc."
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-secondary">Pain level (0–10)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={form.painLevel}
                  onChange={(event) => setForm({ ...form, painLevel: event.target.value })}
                  className="mt-3 w-full"
                />
                <div className="mt-2 text-sm text-secondary">Current pain: {form.painLevel}/10</div>
              </div>

              <div>
                <label className="text-sm font-medium text-secondary">Mobility notes</label>
                <textarea
                  value={form.mobilityNotes}
                  onChange={(event) => setForm({ ...form, mobilityNotes: event.target.value })}
                  className="mt-2 h-28 w-full rounded-3xl border border-subtle bg-surface px-4 py-3 text-primary outline-none"
                  placeholder="Share any stiffness, movement challenges, or comfort notes..."
                />
              </div>

              <div>
                <label className="text-sm font-medium text-secondary">Injury or symptom start date</label>
                <input
                  type="date"
                  value={form.injuryDate}
                  onChange={(event) => setForm({ ...form, injuryDate: event.target.value })}
                  className="mt-2 w-full rounded-3xl border border-subtle bg-surface px-4 py-3 text-primary outline-none"
                />
              </div>

              {error && <p className="text-sm text-rose-300">{error}</p>}
              {message && <p className="text-sm text-emerald-300">{message}</p>}

              <button type="submit" disabled={loading} className="inline-flex w-full justify-center rounded-full bg-brand px-6 py-4 text-sm font-semibold text-primary disabled:opacity-70">
                {loading ? "Saving assessment..." : "Save assessment"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
