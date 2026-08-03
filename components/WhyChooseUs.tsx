"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  HeartHandshake,
  Clock3,
  Stethoscope,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Licensed Specialists",
    description:
      "Experienced rehabilitation professionals committed to exceptional patient care.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Treatment",
    description:
      "Every recovery plan is tailored specifically to your medical condition and goals.",
  },
  {
    icon: Clock3,
    title: "Flexible Scheduling",
    description:
      "Book appointments that fit your schedule with online and in-person consultations.",
  },
  {
    icon: Stethoscope,
    title: "Modern Facilities",
    description:
      "Advanced rehabilitation equipment combined with evidence-based treatment methods.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-surface py-32">
      <div className="absolute left-0 top-0 h-125 w-125 rounded-full bg-(--brand)/15 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-125 w-125 rounded-full bg-(--brand)/10 blur-[140px]" />

      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="rounded-full border border-subtle bg-surface-muted px-5 py-2 text-sm font-semibold text-brand">
            WHY CHOOSE US
          </span>

          <h2 className="mt-8 font-display text-5xl font-bold leading-tight text-primary">
            Recovery Backed By
            <br />
            Compassion &
            <span className="text-brand"> Clinical Excellence.</span>
          </h2>

          <p className="mt-8 text-lg leading-8 text-secondary">
            We combine experienced specialists, modern facilities and
            individualized rehabilitation programs to help every patient regain
            confidence and independence.
          </p>

          <div className="mt-12 rounded-[36px] bg-brand p-10 text-primary shadow-brand">
            <h3 className="text-4xl font-bold">98%</h3>
            <p className="mt-3 text-[rgba(255,255,255,0.85)]">Patient Satisfaction Rate</p>

            <div className="mt-8 h-3 rounded-full bg-surface-muted">
              <div className="h-full w-[98%] rounded-full bg-surface-raised" />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="flex gap-6 rounded-[30px] border border-subtle bg-surface-raised p-8 shadow-brand transition"
              >
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-brand text-primary shadow-lg">
                  <Icon size={34} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-primary">{item.title}</h3>
                  <p className="mt-4 leading-8 text-secondary">{item.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}