# COPILOT BUILD SCRIPT — Rehabilitation Consultation Platform (MVP)

> Paste this whole file into Copilot Chat, or save it as `.github/copilot-instructions.md` in your repo so Copilot auto-loads this context on every suggestion. Build it phase by phase, in the order below — don't ask for everything in one shot.

---

## 0. PROJECT BRIEF (give this to Copilot first, verbatim)

You are building the MVP of a **Rehabilitation Consultation Platform** — a telehealth-style booking system connecting patients with care coordinators for rehabilitation consultations (chat, voice, video, or in-person).

**Tech stack (non-negotiable):**

- MongoDB + Mongoose
- NextAuth v4 (credentials provider, JWT session strategy)
- Tailwind CSS — dark-first design system using semantic CSS tokens (`bg-surface`, `text-primary`, `border-subtle`, etc. — no raw hex in components)
- Paystack for payment (₦10,000 flat consultation fee)
- Nodemailer or Resend for email OTP
- Socket.io (or Pusher) for live chat + real-time notifications
- Twilio/Agora or Daily.co for voice/video consultation rooms (MVP can stub this behind an interface — build the UI and booking flow first, wire the real provider last)

**Two user roles:** `patient` and `care_coordinator` (add `admin` as a third role stub for later). Role lives on the User model and gates route access via middleware.

**Design direction:** dark, clinical-calm aesthetic — think fintech-grade trust signals (like a NairaPay/Web3GlobalVault dashboard) but softened for a health context. Avoid clinical-cold whites; use deep navy/charcoal surfaces with a single calm accent color (teal or soft blue) for primary actions.

---

## 1. FOLDER STRUCTURE — ask Copilot to scaffold this first

```
rehab-platform/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                  # Landing page
│   │   ├── about/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   └── contact/page.tsx
│   ├── (auth)/
│   │   ├── register/page.tsx
│   │   ├── verify-otp/page.tsx
│   │   └── login/page.tsx
│   ├── (patient)/
│   │   ├── dashboard/page.tsx
│   │   ├── assessment/page.tsx
│   │   ├── book/page.tsx                      # consultation type + date/time
│   │   ├── book/pay/page.tsx                  # Paystack checkout
│   │   ├── consultations/page.tsx             # history
│   │   ├── consultations/[id]/page.tsx        # summary + live room
│   │   ├── payments/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── settings/page.tsx
│   ├── (coordinator)/
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/today/page.tsx
│   │   ├── appointments/upcoming/page.tsx
│   │   ├── patients/page.tsx
│   │   ├── patients/[id]/assessment/page.tsx
│   │   ├── consultation/[id]/page.tsx         # start/run session + notes
│   │   ├── consultation/[id]/summary/page.tsx
│   │   ├── follow-ups/page.tsx
│   │   └── profile/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── auth/register/route.ts
│       ├── auth/verify-otp/route.ts
│       ├── assessments/route.ts
│       ├── bookings/route.ts
│       ├── bookings/[id]/route.ts
│       ├── payments/initiate/route.ts
│       ├── payments/verify/route.ts           # Paystack webhook + callback
│       ├── consultations/[id]/route.ts
│       ├── consultations/[id]/notes/route.ts
│       ├── consultations/[id]/summary/route.ts
│       └── notifications/route.ts
├── models/
│   ├── User.ts
│   ├── Assessment.ts
│   ├── Booking.ts
│   ├── Consultation.ts
│   ├── Payment.ts
│   └── Notification.ts
├── lib/
│   ├── db.ts                 # mongoose connect singleton
│   ├── auth.ts               # NextAuth config
│   ├── paystack.ts
│   ├── mailer.ts
│   └── socket.ts
├── components/
│   ├── ui/                   # buttons, cards, inputs — shared design system
│   ├── patient/
│   ├── coordinator/
│   └── shared/
└── middleware.ts             # role-based route protection
```

Ask Copilot: *"Scaffold this exact folder structure with empty placeholder files and TypeScript types, using Next.js 14 App Router conventions."*

---

## 2. DATABASE SCHEMA — feed this to Copilot for the Mongoose models

```
User
  - name, email, phone, passwordHash
  - role: 'patient' | 'care_coordinator' | 'admin'
  - emailVerified: boolean
  - otpCode, otpExpiresAt
  - createdAt

Assessment
  - patientId (ref User)
  - condition, painLevel, mobilityNotes, injuryDate
  - status: 'pending' | 'reviewed'
  - createdAt

Booking
  - patientId (ref User)
  - coordinatorId (ref User, nullable until assigned)
  - consultationType: 'chat' | 'voice' | 'video' | 'physical'
  - scheduledDate, scheduledTime
  - status: 'pending_payment' | 'scheduled' | 'completed' | 'cancelled'
  - fee: number (default 10000)

Payment
  - bookingId (ref Booking)
  - patientId (ref User)
  - amount, currency: 'NGN'
  - reference (Paystack ref)
  - status: 'pending' | 'success' | 'failed'
  - paidAt

Consultation
  - bookingId (ref Booking)
  - patientId, coordinatorId
  - type: 'chat' | 'voice' | 'video' | 'physical'
  - notes: string
  - summary: string
  - followUpDate
  - status: 'in_progress' | 'completed'

Notification
  - userId (ref User)
  - title, message
  - type: 'booking' | 'payment' | 'reminder' | 'system'
  - read: boolean
  - createdAt
```

Ask Copilot: *"Generate Mongoose schemas + TypeScript interfaces for the models above, with indexes on `email`, `patientId`, `coordinatorId`, and `scheduledDate`."*

---

## 3. BUILD ORDER (give Copilot one phase at a time — don't skip ahead)

### Phase 1 — Auth & Onboarding
1. `User` model + `lib/db.ts` connection singleton
2. Register → hash password (bcrypt) → generate 6-digit OTP → email via `lib/mailer.ts`
3. Verify OTP page → sets `emailVerified: true`
4. NextAuth credentials provider, JWT session, `role` embedded in token
5. `middleware.ts` — redirect unauthenticated users; gate `/dashboard/*` routes by role

### Phase 2 — Marketing / Landing
6. Landing page with hero, "How It Works" 3-step visual, About, Contact form (POST to a simple `/api/contact` that emails you)

### Phase 3 — Patient Core Flow
7. Patient dashboard (upcoming booking, quick actions, notification bell)
8. Assessment form → saves to `Assessment` model
9. Booking flow: consultation type selector → calendar/time-slot picker (build a simple available-slots endpoint returning next 14 days, 9am–5pm, 1-hour blocks, minus already-booked slots)
10. Paystack checkout: `/api/payments/initiate` creates a Paystack transaction for ₦10,000, redirects to Paystack; `/api/payments/verify` handles the callback + webhook, marks `Payment.status = success`, `Booking.status = scheduled`, creates a `Notification`
11. Consultation history, payment history, notifications list, profile/settings pages

### Phase 4 — Care Coordinator Flow
12. Coordinator dashboard: today's appointments, upcoming list, assigned patients
13. Patient assessment view (read-only, coordinator perspective)
14. "Start Consultation" — routes into the matching session type (chat/voice/video/physical) with a notes panel alongside
15. Consultation notes → summary generation (coordinator writes summary, patient sees a read-only version)
16. Follow-up reminder scheduling (simple date field + notification trigger)

### Phase 5 — Real-time layer
17. Socket.io server for live chat (persist messages to a lightweight `Message` sub-collection or embedded array on `Consultation`)
18. Notification bell — real-time push on booking/payment/reminder events

### Phase 6 — Polish
19. Loading states, empty states, error boundaries
20. Responsive pass (mobile-first, since a lot of Nigerian users will be on phone browsers)
21. Seed script with demo patient + coordinator accounts for demoing

---

## 4. DESIGN SYSTEM PROMPT (paste separately when building components)

"Build a dark-mode-first Tailwind design system for a rehabilitation telehealth platform. Use CSS custom properties for all colors (never raw hex in JSX). Palette: deep charcoal/navy surfaces (`--surface-base`, `--surface-raised`), a single calm accent (teal `#2DD4BF` or soft blue `#38BDF8`) for primary actions, muted text tiers (`--text-primary`, `--text-muted`). Rounded-xl cards, soft shadows, generous whitespace — should feel closer to a premium fintech dashboard than a sterile hospital portal. Include a reusable `<StatusBadge>` for booking/payment states and a `<ConsultationTypeIcon>` set (chat bubble, phone, video camera, pin)."

---

## 5. THINGS TO TELL COPILOT EXPLICITLY (easy to forget otherwise)

- Fee is a **flat ₦10,000**, hardcode as a constant in `lib/constants.ts`, not per-consultation-type.
- Paystack amounts are in **kobo** — multiply by 100 before sending.
- OTP should expire in 10 minutes; resend should be rate-limited (1 per 60s).
- Booking slots must lock atomically (use a Mongo transaction or unique compound index on `coordinatorId + scheduledDate + scheduledTime`) to prevent double-booking.
- Coordinator assignment can be manual (admin assigns) or simple round-robin for MVP — don't over-engineer matching logic yet.
- All timestamps stored in UTC, displayed in `Africa/Lagos`.

---

## 6. HOW TO USE THIS SCRIPT

1. Create the repo, `npx create-next-app@latest --typescript --tailwind --app`
2. Save this file as `.github/copilot-instructions.md` (Copilot auto-reads it as repo-wide context)
3. Open Copilot Chat and run Phase 1 → review → commit → Phase 2 → repeat
4. Don't let Copilot generate Phases out of order — booking/payment logic depends on auth and models existing first