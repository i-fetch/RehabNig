import Link from "next/link";
import { Activity, ArrowRight, CalendarDays, CreditCard, MessageSquareText, ShieldCheck } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";

const overviewCards = [
  {
    title: "Next consultation",
    value: "Wednesday · 10:00 AM",
    detail: "Video session with Amina Yusuf",
    icon: CalendarDays,
  },
  {
    title: "Assessment status",
    value: "Completed",
    detail: "Mobility and pain review submitted",
    icon: Activity,
  },
  {
    title: "Payment",
    value: "₦10,000 paid",
    detail: "Receipt available in payments history",
    icon: CreditCard,
  },
];

const quickActions = [
  { label: "Book a consultation", href: "/patient/book", description: "Choose a slot and complete checkout" },
  { label: "Review assessments", href: "/patient/assessments", description: "Track your progress and notes" },
  { label: "View consultations", href: "/patient/consultations", description: "See past sessions and summaries" },
];

const activityItems = [
  { title: "Consultation reminder", detail: "Your video session is scheduled for tomorrow at 10:00 AM." },
  { title: "Assessment updated", detail: "Your recovery notes were shared with your care coordinator." },
  { title: "Payment confirmed", detail: "Your consultation fee was received successfully." },
];

export default function PatientDashboardPage() {
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
