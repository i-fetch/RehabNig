"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-6 z-50 flex justify-center px-4 sm:px-6">
      <nav className="w-full max-w-7xl rounded-[1.75rem] border border-subtle bg-surface-raised/95 px-4 py-4 shadow-brand backdrop-blur-2xl sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-primary shadow-lg">
            R
          </div>

          <div>
            <h1 className="font-display text-lg font-bold text-primary">Rehab Nigeria</h1>
            <p className="text-xs text-muted">Rehabilitation Center</p>
          </div>
        </Link>

          <div className="hidden items-center gap-10 text-sm font-medium text-secondary lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <Link href="/login" className="text-sm font-medium text-secondary transition hover:text-brand">
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-primary shadow-lg transition hover:scale-105"
            >
              Book Consultation
            </Link>
          </div>

          <button
            type="button"
            className="rounded-xl p-2 lg:hidden"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-6 w-6 text-secondary" /> : <Menu className="h-6 w-6 text-secondary" />}
          </button>
        </div>

        {open && (
          <div className="mt-4 flex flex-col gap-3 border-t border-subtle pt-4 lg:hidden">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-secondary" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" className="text-sm font-medium text-secondary" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link href="/register" className="rounded-full bg-brand px-4 py-3 text-center text-sm font-semibold text-primary" onClick={() => setOpen(false)}>
              Book Consultation
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}