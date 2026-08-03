"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";

export default function PatientPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayments() {
      const response = await fetch("/api/payments");
      const data = await response.json();
      if (data.payments) {
        setPayments(data.payments);
      }
      setLoading(false);
    }

    void loadPayments();
  }, []);

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Payment history</p>
                <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Review your consultation payments</h1>
                <p className="mt-3 max-w-2xl text-secondary">Track payment status for your booked rehabilitation sessions.</p>
              </div>
              <Link href="/patient/book" className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary">
                Book another session
              </Link>
            </div>
          </section>

          <section className="surface-card rounded-3xl border border-subtle p-6">
            {loading ? (
              <p className="text-sm text-secondary">Loading payment history...</p>
            ) : payments.length > 0 ? (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div key={payment._id?.toString() || payment.reference} className="rounded-3xl border border-subtle bg-surface-muted p-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-primary">₦{payment.amount?.toLocaleString()}</p>
                        <p className="mt-1 text-sm text-secondary">Reference: {payment.reference}</p>
                      </div>
                      <div className="rounded-full bg-brand/15 px-3 py-1 text-sm font-medium text-brand">{payment.status}</div>
                    </div>
                    <div className="mt-4 text-sm text-secondary">
                      Paid at: {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : "Pending confirmation"}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-subtle bg-surface-muted p-6 text-sm text-secondary">
                <p>No payments have been recorded yet.</p>
                <p className="mt-3">Start a booking and complete checkout to see your payment history.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
