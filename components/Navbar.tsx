"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-6 z-50 flex justify-center px-6">
      <nav className="flex w-full max-w-7xl items-center justify-between rounded-full border border-subtle bg-surface-raised px-6 py-4 shadow-brand backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-lg font-bold text-primary shadow-lg">
            R
          </div>

          <div>
            <h1 className="font-display text-lg font-bold text-primary">Rehab Nigeria</h1>
            <p className="text-xs text-muted">Rehabilitation Center</p>
          </div>
        </Link>

        <div className="hidden items-center gap-10 text-sm font-medium text-secondary lg:flex">
          <Link href="/">Home</Link>
          <Link href="#services">Services</Link>
          <Link href="#about">About</Link>
          <Link href="#team">Team</Link>
          <Link href="#contact">Contact</Link>
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

        <button className="rounded-xl p-2 lg:hidden">
          <Menu className="h-6 w-6 text-secondary" />
        </button>
      </nav>
    </header>
  );
}