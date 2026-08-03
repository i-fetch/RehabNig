import Link from "next/link";
import { Activity, ArrowRight, CalendarDays, CreditCard, MessageSquareText, ShieldCheck } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";
import { dbConnect } from "@/lib/db";
import Booking from "@/models/Booking";
import Assessment from "@/models/Assessment";
import Payment from "@/models/Payment";

export default async function PatientDashboardPage() {
  await dbConnect();
  const [upcomingBooking, latestAssessment, latestPayment] = await Promise.all([
    Booking.findOne({}).sort({ scheduledDate: 1, scheduledTime: 1 }).lean(),
    Assessment.findOne({}).sort({ createdAt: -1 }).lean(),
    Payment.findOne({}).sort({ createdAt: -1 }).lean(),
  ]);

  const overviewCards = [
    {
      title: "Next consultation",
      value: upcomingBooking ? `${new Date(upcomingBooking.scheduledDate).toLocaleDateString()} · ${upcomingBooking.scheduledTime}` : "No booking yet",
      detail: upcomingBooking ? `${upcomingBooking.consultationType} consultation` : "Book your next session",
      icon: CalendarDays,
    },
    {
      title: "Assessment status",
      value: latestAssessment ? `${latestAssessment.status}` : "Pending",
      detail: latestAssessment ? latestAssessment.condition : "Add your recovery assessment",
      icon: Activity,
    },
    {
      title: "Payment",
      value: latestPayment ? `₦${latestPayment.amount?.toLocaleString()}` : "No payment yet",
      detail: latestPayment ? latestPayment.status : "Payment will appear here",
      icon: CreditCard,
    },
  ];

  const quickActions = [
    { label: "Book a consultation", href: "/patient/book", description: "Choose a slot and complete checkout" },
    { label: "Create assessment", href: "/patient/assessment", description: "Track your progress and notes" },
    { label: "View consultations", href: "/patient/consultations", description: "See past sessions and summaries" },
  ];

  const activityItems = [
    { title: "Consultation reminder", detail: upcomingBooking ? `Your ${upcomingBooking.consultationType} session is booked for ${new Date(upcomingBooking.scheduledDate).toLocaleDateString()} at ${upcomingBooking.scheduledTime}.` : "Book a consultation to set your next care touchpoint." },
    { title: "Assessment status", detail: latestAssessment ? `Your latest assessment is ${latestAssessment.status}.` : "Add your recovery assessment to keep your care plan current." },
    { title: "Payment status", detail: latestPayment ? `Latest payment is ${latestPayment.status}.` : "Your payment record will appear here after checkout." },
  ];

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand">Welcome back</p>
                <h1 className="mt-3 font-display text-3xl font-semibold text-primary">Your recovery journey is on track</h1>
                <p className="mt-3 max-w-2xl text-secondary">
                  Review your upcoming appointments, keep your recovery notes updated, and move through your care plan with confidence.
                </p>
              </div>
              <Link
                href="/patient/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary transition hover:scale-[1.01]"
              >
                Book next consultation
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {overviewCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="surface-card rounded-3xl border border-subtle p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-surface-muted p-2 text-brand">
                      <Icon size={18} />
                    </div>
                    <p className="text-sm font-medium text-secondary">{card.title}</p>
                  </div>
                  <p className="mt-4 text-xl font-semibold text-primary">{card.value}</p>
                  <p className="mt-2 text-sm text-muted">{card.detail}</p>
                </div>
              );
            })}
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="surface-card rounded-3xl border border-subtle p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Upcoming session</p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-primary">Video rehabilitation review</h2>
                </div>
                <div className="rounded-full border border-subtle bg-surface-muted px-3 py-1 text-sm text-secondary">
                  Scheduled
                </div>
              </div>

              <div className="mt-6 space-y-4 rounded-2xl border border-subtle bg-surface-muted p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-primary">Wednesday, 10:00 AM</p>
                    <p className="mt-1 text-sm text-secondary">With care coordinator Amina Yusuf</p>
                  </div>
                  <div className="rounded-full bg-brand/15 px-3 py-1 text-sm font-medium text-brand">Video</div>
                </div>

                <div className="flex items-center gap-2 text-sm text-secondary">
                  <ShieldCheck size={16} className="text-brand" />
                  Secure private consultation room ready
                </div>
              </div>
            </div>

            <div className="surface-card rounded-3xl border border-subtle p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Quick actions</p>
              <div className="mt-4 space-y-3">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center justify-between rounded-2xl border border-subtle bg-surface-muted px-4 py-3 transition hover:border-brand/50"
                  >
                    <div>
                      <p className="font-medium text-primary">{action.label}</p>
                      <p className="mt-1 text-sm text-muted">{action.description}</p>
                    </div>
                    <ArrowRight size={16} className="text-brand" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="surface-card rounded-3xl border border-subtle p-6">
              <div className="flex items-center gap-2">
                <MessageSquareText size={18} className="text-brand" />
                <h2 className="font-display text-xl font-semibold text-primary">Recent activity</h2>
              </div>
              <div className="mt-4 space-y-3">
                {activityItems.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-subtle bg-surface-muted p-4">
                    <p className="font-medium text-primary">{item.title}</p>
                    <p className="mt-1 text-sm text-secondary">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-card rounded-3xl border border-subtle p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Care focus</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-primary">Keep momentum this week</h2>
              <ul className="mt-4 space-y-3 text-sm text-secondary">
                <li>• Complete your mobility check-in before your next consultation.</li>
                <li>• Review your home exercises and keep your pain log updated.</li>
                <li>• Reach out if you need a reminder or a reschedule.</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
