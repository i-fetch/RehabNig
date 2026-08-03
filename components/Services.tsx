"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Bone,
  Activity,
  HeartPulse,
  Home,
  Users,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "Neurological Rehabilitation",
    description:
      "Recovery programs for stroke, brain injury, Parkinson's disease and neurological disorders.",
  },
  {
    icon: Bone,
    title: "Orthopedic Rehabilitation",
    description:
      "Restore mobility and strength after fractures, joint replacements and orthopedic surgery.",
  },
  {
    icon: Activity,
    title: "Sports Injury Recovery",
    description:
      "Helping athletes recover safely and return stronger than before.",
  },
  {
    icon: HeartPulse,
    title: "Pain Management",
    description:
      "Personalized therapy focused on reducing pain and improving daily function.",
  },
  {
    icon: Home,
    title: "Home Rehabilitation",
    description:
      "Professional rehabilitation services delivered in the comfort of your home.",
  },
  {
    icon: Users,
    title: "Occupational Therapy",
    description:
      "Helping patients regain independence for everyday activities and work.",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-subtle bg-surface-muted px-5 py-2 text-sm font-semibold text-brand">
            OUR SERVICES
          </span>

          <h2 className="mt-6 font-display text-5xl font-bold text-primary">
            Comprehensive Rehabilitation Care
          </h2>

          <p className="mt-6 text-lg leading-8 text-secondary">
            Our multidisciplinary team delivers evidence-based rehabilitation
            programs designed around every patient's unique recovery journey.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative overflow-hidden rounded-4xl border border-subtle bg-surface-raised p-8 shadow-brand transition-all"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(63,140,166,0.16),transparent_60%)] opacity-0 transition group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand text-primary shadow-lg">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-bold text-primary">{service.title}</h3>

                  <p className="mt-5 leading-8 text-secondary">{service.description}</p>

                  <button className="mt-8 flex items-center gap-2 font-semibold text-brand transition group-hover:gap-3">
                    Learn More
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}