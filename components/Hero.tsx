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
    <section className="relative overflow-hidden bg-surface px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-35 top-10 h-105 w-105 rounded-full bg-(--brand)/10 blur-[140px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-0 sm:gap-16 lg:grid-cols-2 lg:px-6">
        <motion.div
          variants={container}
          initial={false}
          animate="show"
        >
          <motion.div
            variants={item}
            initial={false}
            className="mb-6 inline-flex items-center rounded-full border border-subtle bg-surface-muted px-4 py-2 text-sm font-medium text-secondary"
          >
            <Activity className="mr-2 h-4 w-4 text-brand" />
            Movement-First Rehabilitation
          </motion.div>

          <motion.h1
            variants={item}
            initial={false}
            className="font-display text-4xl font-bold leading-tight text-primary sm:text-5xl lg:text-7xl"
          >
            Move Again.
            <br />
            <span className="bg-linear-to-r from-(--brand) to-sky-400 bg-clip-text text-transparent">
              Live Fully.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            initial={false}
            className="mt-6 max-w-xl text-base leading-7 text-secondary sm:mt-8 sm:text-lg sm:leading-8"
          >
            Personalized rehabilitation programs designed to restore mobility,
            independence and quality of life through compassionate,
            evidence-based care.
          </motion.p>

          <motion.div variants={item} initial={false} className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="/register"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-primary shadow-brand transition hover:scale-105 sm:w-auto sm:px-8 sm:py-4"
            >
              Book Consultation
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#services"
              className="flex w-full items-center justify-center rounded-full border border-subtle bg-surface-raised px-6 py-3 font-semibold text-secondary transition hover:bg-surface-muted sm:w-auto sm:px-8 sm:py-4"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Vitals strip — replaces the stat-card grid */}
          <motion.div
            variants={item}
            initial={false}
            className="mt-10 flex flex-col overflow-hidden rounded-2xl border border-subtle bg-surface-raised sm:mt-14 sm:flex-row sm:divide-x sm:divide-(--border-subtle)"
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
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-xl rounded-3xl border border-subtle bg-surface-raised p-4 shadow-brand sm:p-8"
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
            className="mt-6 h-32 w-full overflow-visible sm:h-40"
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

          <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-wider text-muted sm:text-[10px]">
            <span>Heel Strike</span>
            <span>Mid-Stance</span>
            <span>Toe-Off</span>
            <span>Swing</span>
          </div>

          {/* Real patient reference, grounding the chart */}
          <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-subtle bg-surface-muted p-4 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=200&q=80"
                alt=""
                loading="eager"
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