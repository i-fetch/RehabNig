"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  HeartHandshake,
  ShieldCheck,
  Star,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface pt-40 pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-120px] top-0 h-96 w-96 rounded-full bg-[color:var(--brand)]/20 blur-[120px]" />
        <div className="absolute right-[-120px] top-40 h-[420px] w-[420px] rounded-full bg-[color:var(--brand)]/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[color:var(--brand)]/15 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-subtle bg-surface-muted px-4 py-2 text-sm font-medium text-secondary">
            <HeartHandshake className="mr-2 h-4 w-4 text-brand" />
            Trusted Rehabilitation Specialists
          </div>

          <h1 className="font-display text-5xl font-bold leading-tight text-primary lg:text-7xl">
            Helping You
            <br />
            Recover With
            <span className="bg-gradient-to-r from-[color:var(--brand)] to-sky-400 bg-clip-text text-transparent">
              {" "}
              Confidence
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-secondary">
            Personalized rehabilitation programs designed to restore mobility,
            independence and quality of life through compassionate,
            evidence-based care.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-full bg-brand px-8 py-4 font-semibold text-primary shadow-brand transition hover:scale-105"
            >
              Book Consultation
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#services"
              className="rounded-full border border-subtle bg-surface-raised px-8 py-4 font-semibold text-secondary transition hover:bg-surface-muted"
            >
              Explore Services
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8">
            {[
              ["5000+", "Patients"],
              ["98%", "Recovery Rate"],
              ["20+", "Specialists"],
            ].map(([number, label]) => (
              <div key={label}>
                <h2 className="text-3xl font-bold text-primary">{number}</h2>
                <p className="mt-1 text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="overflow-hidden rounded-[40px] border border-subtle bg-surface-raised shadow-brand">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
              alt="Rehabilitation"
              className="h-[650px] w-full object-cover"
            />
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -left-8 top-10 w-64 rounded-3xl border border-subtle bg-surface-raised p-5 shadow-brand"
          >
            <div className="flex items-center gap-3">
              <Calendar className="text-brand" />
              <div>
                <p className="font-semibold text-primary">Consultation Booked</p>
                <span className="text-sm text-muted">Monday • 10:30 AM</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute -right-8 bottom-24 w-64 rounded-3xl border border-subtle bg-surface-raised p-5 shadow-brand"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">Recovery Progress</span>
              <ShieldCheck className="text-emerald-400" />
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full w-[82%] rounded-full bg-brand" />
            </div>

            <p className="mt-2 text-sm text-muted">82% Completed</p>
          </motion.div>

          <div className="absolute left-10 bottom-8 rounded-2xl border border-subtle bg-surface-raised px-5 py-3 shadow-brand">
            <div className="flex items-center gap-2">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
              <span className="font-semibold text-primary">4.9/5 Patient Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}