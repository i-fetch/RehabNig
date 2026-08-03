"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", otp: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchParams) return;
    const email = searchParams.get("email");
    if (email) {
      setForm((current) => ({ ...current, email }));
    }
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error || "Invalid code.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/login"), 1200);
  }

  return (
    <div className="page-shell flex items-center justify-center px-6 py-10">
      <div className="form-card w-full max-w-xl rounded-[2rem] p-10">
        <h1 className="text-3xl font-semibold text-white">Verify your account</h1>
        <p className="mt-3 text-slate-400">Enter the code we sent to your email address.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-slate-300">Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/80"
              placeholder="jane@example.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-300">OTP code</label>
            <input
              value={form.otp}
              onChange={(event) => setForm({ ...form, otp: event.target.value })}
              className="mt-2 w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400/80"
              placeholder="123456"
              required
            />
          </div>

          {error && <p className="text-sm text-rose-300">{error}</p>}
          {success && <p className="text-sm text-emerald-300">Email verified! Redirecting to login...</p>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
