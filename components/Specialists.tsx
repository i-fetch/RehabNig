"use client";

import { motion } from "framer-motion";

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    role: "Senior Physiotherapist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Michael Adams",
    role: "Neurological Specialist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80",
  },
  {
    name: "Dr. Grace Wilson",
    role: "Occupational Therapist",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",
  },
];

export default function Specialists() {
  return (
    <section className="bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-subtle bg-surface-muted px-5 py-2 text-sm font-semibold text-brand">
            OUR TEAM
          </span>

          <h2 className="mt-6 font-display text-5xl font-bold text-primary">Meet Our Specialists</h2>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.name}
              whileHover={{ y: -10 }}
              className="overflow-hidden rounded-[36px] border border-subtle bg-surface-raised shadow-brand"
            >
              <img src={doctor.image} className="h-96 w-full object-cover" alt={doctor.name} />

              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary">{doctor.name}</h3>
                <p className="mt-2 text-brand">{doctor.role}</p>

                <button className="mt-8 w-full rounded-full bg-brand py-4 font-semibold text-primary">
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}