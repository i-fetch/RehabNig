"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CreditCard, ShieldCheck, XCircle } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";

function PatientPayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    async function loadBooking() {
      if (!bookingId) {
        setError("Missing booking reference.");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/bookings/${bookingId}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to load booking.");
        setLoading(false);
        return;
      }

      setBooking(data.booking);
      setLoading(false);
    }

    void loadBooking();
  }, [bookingId]);

  async function handlePayment() {
    if (!booking) {
      setError("Booking not loaded yet.");
      return;
    }

    if (booking.status !== "pending_payment") {
      setError("This booking cannot be paid for because its status has changed.");
      return;
    }

    setPaymentLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/payments/initiate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: booking._id, patientId: booking.patientId }),
    });

    const data = await response.json();
    setPaymentLoading(false);

    if (!response.ok) {
      setError(data.error || "Payment could not be started.");
      return;
    }

    setReference(data.payment?.reference || null);
    setCheckoutUrl(data.checkoutUrl || null);
    setMessage("Payment session ready. Confirm your payment to complete the booking.");
  }

  async function handleConfirmPayment() {
    if (!reference) {
      setError("No payment reference available.");
      return;
    }

    setPaymentLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference, status: "success" }),
    });

    const data = await response.json();
    setPaymentLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to confirm payment.");
      return;
    }

    setMessage("Payment confirmed. Your booking is now scheduled.");
    setTimeout(() => router.replace("/patient/consultations"), 1200);
  }

  async function handleCancelBooking() {
    if (!bookingId) {
      setError("Booking reference missing.");
      return;
    }

    setPaymentLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "cancel" }),
    });

    const data = await response.json();
    setPaymentLoading(false);

    if (!response.ok) {
      setError(data.error || "Unable to cancel booking.");
      return;
    }

    router.replace("/patient/book");
  }

  return (
    <main className="page-shell px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="surface-card rounded-3xl border border-subtle p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Payment</p>
          <h1 className="mt-3 font-display text-2xl font-semibold text-primary">Secure consultation checkout</h1>
          <p className="mt-3 text-secondary">The flat fee is ₦10,000. This screen now guides you through payment for your booking.</p>
        </section>

        <section className="surface-card rounded-3xl border border-subtle p-6">
          <div className="flex items-center gap-2">
            <CreditCard size={18} className="text-brand" />
            <h2 className="font-display text-xl font-semibold text-primary">Booking summary</h2>
          </div>

          {loading ? (
            <p className="mt-5 text-sm text-secondary">Loading booking details...</p>
          ) : error ? (
            <p className="mt-5 text-sm text-rose-300">{error}</p>
          ) : booking ? (
            <div className="mt-5 space-y-5">
              <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
                <p className="text-sm text-secondary">Type</p>
                <p className="mt-2 font-semibold text-primary">{booking.consultationType}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
                  <p className="text-sm text-secondary">Date</p>
                  <p className="mt-2 font-semibold text-primary">{new Date(booking.scheduledDate).toLocaleDateString()}</p>
                </div>
                <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
                  <p className="text-sm text-secondary">Time</p>
                  <p className="mt-2 font-semibold text-primary">{booking.scheduledTime}</p>
                </div>
                <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
                  <p className="text-sm text-secondary">Fee</p>
                  <p className="mt-2 font-semibold text-primary">₦{booking.fee?.toLocaleString()}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
                <p className="text-sm text-secondary">Status</p>
                <p className="mt-2 font-semibold text-primary">{booking.status}</p>
              </div>

              <div className="rounded-3xl border border-subtle bg-surface-muted p-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">Payment actions</p>
                    <p className="mt-2 text-sm text-secondary">Complete payment now or cancel the booking and choose another time.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCancelBooking}
                    disabled={paymentLoading}
                    className="rounded-full border border-rose-400 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-300 disabled:opacity-70"
                  >
                    Cancel booking
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePayment}
                  disabled={paymentLoading || booking.status !== "pending_payment"}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary disabled:opacity-70"
                >
                  {paymentLoading ? "Processing..." : "Start payment"}
                </button>
                {checkoutUrl && (
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center rounded-full border border-subtle bg-surface-muted px-5 py-3 text-sm font-semibold text-primary"
                  >
                    Open payment session
                  </a>
                )}
              </div>

              {reference && (
                <div className="rounded-3xl border border-subtle bg-surface-muted p-4 text-sm text-secondary">
                  <p>Payment reference: {reference}</p>
                  <p className="mt-2">If you completed the payment externally, use confirm to mark it as paid.</p>
                  <button
                    type="button"
                    onClick={handleConfirmPayment}
                    disabled={paymentLoading}
                    className="mt-3 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-primary disabled:opacity-70"
                  >
                    Confirm payment
                  </button>
                </div>
              )}

              {message && <p className="text-sm text-emerald-300">{message}</p>}
            </div>
          ) : null}
        </section>

        <Link href="/patient/book" className="inline-flex text-sm font-medium text-brand">
          Back to booking
        </Link>
      </div>
    </main>
  );
}

export default function PatientPayPage() {
  return (
    <PatientShell>
      <Suspense fallback={null}>
        <PatientPayContent />
      </Suspense>
    </PatientShell>
  );
}