"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Clock3, CreditCard, Video } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";

const consultationTypes = [
  { value: "video", label: "Video consultation", description: "Remote session with a care coordinator" },
  { value: "voice", label: "Voice consultation", description: "Call-based follow-up" },
  { value: "chat", label: "Chat consultation", description: "Text-based check-in" },
  { value: "physical", label: "Physical visit", description: "In-person support" },
];

export default function PatientBookPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("video");
  const [form, setForm] = useState({ scheduledDate: "", scheduledTime: "", fee: 10000 });

  useEffect(() => {
    async function loadBookings() {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      if (data.bookings) {
        setBookings(data.bookings);
      }
      setLoading(false);
    }

    void loadBookings();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patientId: "patient-demo", consultationType: selectedType, scheduledDate: form.scheduledDate, scheduledTime: form.scheduledTime, fee: form.fee }),
    });

    const data = await response.json();
    if (response.ok && data.booking) {
      setBookings((current) => [data.booking, ...current]);
      setForm({ scheduledDate: "", scheduledTime: "", fee: 10000 });
    }
  }

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Book a consultation</p>
                <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Choose a care session that fits your plan</h1>
                <p className="mt-3 max-w-2xl text-secondary">
                  The booking experience is now connected to live booking records so you can see available scheduling patterns and recent appointments.
                </p>
              </div>
              <Link href="/patient/consultations" className="inline-flex items-center gap-2 rounded-full border border-subtle bg-surface-muted px-4 py-2 text-sm font-medium text-secondary">
                View consultation history
              </Link>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="surface-card rounded-3xl border border-subtle p-6">
              <div className="flex items-center gap-2">
                <Video size={18} className="text-brand" />
                <h2 className="font-display text-xl font-semibold text-primary">Consultation options</h2>
              </div>
              <div className="mt-5 space-y-3">
                {consultationTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setSelectedType(type.value)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${selectedType === type.value ? "border-brand bg-brand/10" : "border-subtle bg-surface-muted"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-primary">{type.label}</p>
                        <p className="mt-1 text-sm text-secondary">{type.description}</p>
                      </div>
                      <div className="rounded-full border border-subtle px-3 py-1 text-sm text-secondary">{type.value}</div>
                    </div>
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3 rounded-2xl border border-subtle bg-surface-muted p-4">
                <div>
                  <label className="text-sm font-medium text-secondary">Preferred date</label>
                  <input type="date" value={form.scheduledDate} onChange={(event) => setForm({ ...form, scheduledDate: event.target.value })} required className="mt-2 w-full rounded-2xl border border-subtle bg-surface px-3 py-2 text-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium text-secondary">Time</label>
                  <input type="time" value={form.scheduledTime} onChange={(event) => setForm({ ...form, scheduledTime: event.target.value })} required className="mt-2 w-full rounded-2xl border border-subtle bg-surface px-3 py-2 text-primary" />
                </div>
                <button type="submit" className="w-full rounded-full bg-brand px-4 py-3 text-sm font-semibold text-primary">Create booking</button>
              </form>
            </div>

            <div className="surface-card rounded-3xl border border-subtle p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Recent bookings</p>
              <div className="mt-4 space-y-3">
                {loading ? (
                  <p className="text-sm text-secondary">Loading bookings...</p>
                ) : bookings.length > 0 ? (
                  bookings.slice(0, 6).map((booking: any) => (
                    <div key={booking._id?.toString() || booking.createdAt} className="rounded-2xl border border-subtle bg-surface-muted p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-primary">{booking.consultationType}</p>
                        <div className="rounded-full bg-brand/15 px-3 py-1 text-sm font-medium text-brand">{booking.status}</div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-secondary">
                        <span className="inline-flex items-center gap-2"><CalendarDays size={14} />{new Date(booking.scheduledDate).toLocaleDateString()}</span>
                        <span className="inline-flex items-center gap-2"><Clock3 size={14} />{booking.scheduledTime}</span>
                        <span className="inline-flex items-center gap-2"><CreditCard size={14} />₦{booking.fee?.toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-secondary">No bookings recorded yet.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
