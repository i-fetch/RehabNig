"use client";

import { motion } from "framer-motion";
import {
  ClipboardCheck,
  CalendarCheck,
  HeartPulse,
  Activity,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Assessment",
    text: "Complete a comprehensive health assessment.",
  },
  {
    icon: CalendarCheck,
    title: "Consultation",
    text: "Meet one of our rehabilitation specialists.",
  },
  {
    icon: HeartPulse,
    title: "Treatment",
    text: "Receive your personalized recovery plan.",
  },
  {
    icon: Activity,
    title: "Recovery",
    text: "Track your progress with ongoing support.",
  },
];

export default function RecoveryJourney() {
  return (
    <section className="bg-surface-muted py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-subtle bg-surface-raised px-5 py-2 text-sm font-semibold text-brand">
            HOW IT WORKS
          </span>

          <h2 className="mt-6 font-display text-5xl font-bold text-primary">
            Your Recovery Journey
          </h2>

          <p className="mt-5 text-lg text-secondary">
            A simple four-step process designed around your recovery.
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                whileHover={{ y: -8 }}
                className="relative rounded-[32px] border border-subtle bg-surface-raised p-8 shadow-brand"
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-primary">
                  <Icon size={30} />
                </div>

                <span className="text-sm font-semibold text-brand">Step {i + 1}</span>

                <h3 className="mt-3 text-2xl font-bold text-primary">{step.title}</h3>

                <p className="mt-4 leading-7 text-secondary">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}