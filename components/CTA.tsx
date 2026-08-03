import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-surface py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[40px] bg-brand p-16 text-primary shadow-brand">
          <div className="max-w-3xl">
            <h2 className="font-display text-5xl font-bold">
              Ready To Begin Your Recovery Journey?
            </h2>

            <p className="mt-6 text-xl leading-9 text-[rgba(255,255,255,0.88)]">
              Our rehabilitation specialists are ready to help you regain
              confidence, mobility and independence.
            </p>

            <Link
              href="/register"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-surface-raised px-8 py-4 font-semibold text-brand shadow-lg transition hover:scale-105"
            >
              Book Consultation
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}