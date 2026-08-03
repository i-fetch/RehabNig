import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-surface-raised text-primary">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <h2 className="font-display text-3xl font-bold">
              Rehab Nigeria
            </h2>

            <p className="mt-5 leading-8 text-secondary">
              Helping patients recover through compassionate,
              evidence-based rehabilitation care.
            </p>

            <div className="mt-8 flex gap-4 text-brand">
              <FaFacebook size={20} />
              <FaInstagram size={20} />
              <FaLinkedin size={20} />
            </div>
          </div>



        </div>

        <div>
          <h3 className="font-semibold mb-5">Company</h3>

          <div className="space-y-3 text-slate-400">
            <Link href="/">Home</Link><br />
            <Link href="/about">About</Link><br />
            <Link href="/services">Services</Link><br />
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-5">Services</h3>

          <div className="space-y-3 text-slate-400">
            <p>Neurological Rehab</p>
            <p>Orthopedic Rehab</p>
            <p>Sports Recovery</p>
            <p>Home Care</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-5 text-secondary">

            <div className="flex gap-3">
              <Phone size={18} />
              +234 XXX XXX XXXX
            </div>

            <div className="flex gap-3">
              <Mail size={18} />
              info@RehabNigeria.com
            </div>

            <div className="flex gap-3">
              <MapPin size={18} />
              Lagos, Nigeria
            </div>

          </div>
        </div>

      </div>

      <div className="mt-20 border-t border-subtle pt-8 text-center text-muted">
        © {new Date().getFullYear()} Rehab Nigeria. All rights reserved.
      </div>

     


    </footer >
  );
}
