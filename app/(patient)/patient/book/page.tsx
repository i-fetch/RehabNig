import Link from "next/link";
import { CalendarDays, Clock3, CreditCard, Video } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";
import Booking from "@/models/Booking";
import { dbConnect } from "@/lib/db";

const consultationTypes = [
  { value: "video", label: "Video consultation", description: "Remote session with a care coordinator" },
  { value: "voice", label: "Voice consultation", description: "Call-based follow-up" },
  { value: "chat", label: "Chat consultation", description: "Text-based check-in" },
  { value: "physical", label: "Physical visit", description: "In-person support" },
];

export default async function PatientBookPage() {
  await dbConnect();
  const bookings = await Booking.find({}).sort({ scheduledDate: 1, scheduledTime: 1 }).limit(6).lean();

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
                  <div key={type.value} className="rounded-2xl border border-subtle bg-surface-muted p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-primary">{type.label}</p>
                        <p className="mt-1 text-sm text-secondary">{type.description}</p>
                      </div>
                      <div className="rounded-full border border-subtle px-3 py-1 text-sm text-secondary">{type.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-3xl border border-subtle p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Recent bookings</p>
              <div className="mt-4 space-y-3">
                {bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <div key={booking._id.toString()} className="rounded-2xl border border-subtle bg-surface-muted p-4">
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
