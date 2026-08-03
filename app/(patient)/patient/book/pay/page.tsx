"use client";

import Link from "next/link";
import { useState } from "react";
import { CreditCard, ShieldCheck } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";

export default function PatientPayPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handlePayment() {
    setLoading(true);
    setMessage(null);

    const response = await fetch("/api/payments/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: "booking-demo", patientId: "patient-demo" }),
    });

    const data = await response.json();
    setLoading(false);
    setMessage(data.success ? `Payment initiated. ${data.checkoutUrl}` : data.error || "Payment could not be started.");
  }

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Payment</p>
            <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Secure consultation checkout</h1>
            <p className="mt-3 text-secondary">The flat fee is ₦10,000. This screen now kicks off a payment record that can be verified through the payment API.</p>
          </section>

          <section className="surface-card rounded-3xl border border-subtle p-6">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-brand" />
              <h2 className="font-display text-xl font-semibold text-primary">Paystack checkout</h2>
            </div>
            <div className="mt-5 rounded-2xl border border-subtle bg-surface-muted p-4">
              <div className="flex items-center gap-2 text-sm text-secondary">
                <ShieldCheck size={16} className="text-brand" />
                Your payment is secured and linked to your consultation booking.
              </div>
              <button onClick={handlePayment} disabled={loading} className="mt-4 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary disabled:opacity-70">
                {loading ? "Preparing payment..." : "Start payment"}
              </button>
              {message && <p className="mt-4 text-sm text-secondary">{message}</p>}
            </div>
            <Link href="/patient/book" className="mt-4 inline-flex text-sm font-medium text-brand">Back to booking</Link>
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
