"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Activity } from "lucide-react";

const GAIT_X = [0, 50, 100, 150, 200, 250, 300, 350, 400];
const GAIT_Y = [60, 10, 60, 110, 60, 10, 60, 110, 60];
const GAIT_TIMES = GAIT_X.map((_, i) => i / (GAIT_X.length - 1));

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface pt-40 pb-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-35 top-10 h-105 w-105 rounded-full bg-(--brand)/10 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={item}
            className="mb-6 inline-flex items-center rounded-full border border-subtle bg-surface-muted px-4 py-2 text-sm font-medium text-secondary"
          >
            <Activity className="mr-2 h-4 w-4 text-brand" />
            Movement-First Rehabilitation
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl font-bold leading-tight text-primary lg:text-7xl"
          >
            Move Again.
            <br />
            <span className="bg-linear-to-r from-(--brand) to-sky-400 bg-clip-text text-transparent">
              Live Fully.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-lg leading-8 text-secondary"
          >
            Personalized rehabilitation programs designed to restore mobility,
            independence and quality of life through compassionate,
            evidence-based care.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
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
          </motion.div>

          {/* Vitals strip — replaces the stat-card grid */}
          <motion.div
            variants={item}
            className="mt-14 flex divide-x divide-(--border-subtle) rounded-2xl border border-subtle bg-surface-raised"
          >
            {[
              ["5,000+", "Patients"],
              ["98%", "Recovery Rate"],
              ["20+", "Specialists"],
            ].map(([number, label]) => (
              <div key={label} className="flex-1 px-6 py-5">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {label}
                </p>
                <p className="mt-1 text-2xl font-bold text-primary">
                  {number}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Signature element: live gait-cycle analysis panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-4xl border border-subtle bg-surface-raised p-8 shadow-brand"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Gait Cycle Analysis
            </p>
            <span className="flex items-center gap-2 font-mono text-xs text-brand">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-2 w-2 rounded-full bg-brand"
              />
              Live
            </span>
          </div>

          <svg
            viewBox="0 0 400 120"
            className="mt-6 w-full overflow-visible"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,60 C25,10 75,10 100,60 C125,110 175,110 200,60 C225,10 275,10 300,60 C325,110 375,110 400,60"
              fill="none"
              stroke="var(--brand)"
              strokeWidth={3}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.4 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            <motion.circle
              r={6}
              fill="var(--brand)"
              className="drop-shadow-[0_0_8px_var(--brand)]"
              animate={{ cx: GAIT_X, cy: GAIT_Y }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: 1.8,
                times: GAIT_TIMES,
              }}
            />
          </svg>

          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
            <span>Heel Strike</span>
            <span>Mid-Stance</span>
            <span>Toe-Off</span>
            <span>Swing</span>
          </div>

          {/* Real patient reference, grounding the chart */}
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-subtle bg-surface-muted p-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80"
                alt=""
                className="h-full w-full object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-(--brand)/40 mix-blend-color" />
            </div>
            <div>
              <p className="font-semibold text-primary">Full mobility restored</p>
              <p className="text-sm text-muted">
                Patient case · Week 6 of program (anonymized)
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}