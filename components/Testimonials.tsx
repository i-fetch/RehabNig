"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    name: "John D.",
    review:
      "The therapists helped me regain my confidence after surgery. Excellent care from start to finish.",
  },
  {
    name: "Grace A.",
    review:
      "Professional staff, modern facilities and amazing support throughout my recovery.",
  },
  {
    name: "Michael O.",
    review:
      "The best rehabilitation center I've ever visited. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface-muted py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-subtle bg-surface-raised px-5 py-2 text-sm font-semibold text-brand">
            TESTIMONIALS
          </span>

          <h2 className="mt-6 font-display text-5xl font-bold text-primary">What Our Patients Say</h2>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-[36px] border border-subtle bg-surface-raised p-8 shadow-brand">
              <div className="mb-6 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star key={n} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="leading-8 text-secondary">"{review.review}"</p>
              <h4 className="mt-8 font-bold text-primary">{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}