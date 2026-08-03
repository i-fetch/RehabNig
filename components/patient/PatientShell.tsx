"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function PatientShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-primary">
      <nav className="border-b border-subtle bg-surface-raised/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/patient/dashboard" className="font-display text-lg font-semibold text-primary">
              Rehab Connect
            </Link>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-2xl border border-subtle bg-surface px-3 py-2 text-secondary lg:hidden"
              aria-expanded={menuOpen}
              aria-label="Toggle patient navigation"
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className={`flex flex-col gap-3 text-sm text-secondary lg:flex-row lg:items-center ${menuOpen ? "block" : "hidden"}`}>
            <Link href="/patient/dashboard" onClick={() => setMenuOpen(false)} className="transition hover:text-brand">
              Dashboard
            </Link>
            <Link href="/patient/book" onClick={() => setMenuOpen(false)} className="transition hover:text-brand">
              Book
            </Link>
            <Link href="/patient/consultations" onClick={() => setMenuOpen(false)} className="transition hover:text-brand">
              Consultations
            </Link>
            <Link href="/patient/notifications" onClick={() => setMenuOpen(false)} className="transition hover:text-brand">
              Notifications
            </Link>
            <Link href="/patient/settings" onClick={() => setMenuOpen(false)} className="transition hover:text-brand">
              Settings
            </Link>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
