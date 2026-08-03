"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book my first consultation?",
    answer:
      "Create an account, complete the assessment form, choose your preferred specialist and select an available appointment.",
  },
  {
    question: "Do you offer virtual consultations?",
    answer:
      "Yes. We provide secure video consultations alongside in-person appointments.",
  },
  {
    question: "Can I reschedule an appointment?",
    answer:
      "Absolutely. You can reschedule from your dashboard up to 24 hours before your appointment.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Insurance support depends on your provider. Contact our team for assistance.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-surface py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="rounded-full border border-subtle bg-surface-muted px-5 py-2 text-sm font-semibold text-brand">
            FAQ
          </span>

          <h2 className="mt-6 font-display text-5xl font-bold text-primary">Frequently Asked Questions</h2>
        </div>

        <div className="mt-20 space-y-5">
          {faqs.map((faq, index) => (
            <div key={faq.question} className="overflow-hidden rounded-3xl border border-subtle bg-surface-raised">
              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="flex w-full items-center justify-between p-7"
              >
                <span className="text-lg font-semibold text-primary">{faq.question}</span>
                <ChevronDown className={`transition ${open === index ? "rotate-180" : ""}`} />
              </button>

              {open === index && <div className="px-7 pb-7 leading-8 text-secondary">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}