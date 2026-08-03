"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { PatientShell } from "@/components/patient/PatientShell";

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      const response = await fetch("/api/notifications");
      const data = await response.json();
      if (data.notifications) {
        setNotifications(data.notifications);
      }
      setLoading(false);
    }

    void loadNotifications();
  }, []);

  return (
    <PatientShell>
      <main className="page-shell px-6 py-10 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="surface-card rounded-3xl border border-subtle p-8">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-brand" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">Notifications</p>
                <h1 className="mt-2 font-display text-2xl font-semibold text-primary">Stay updated on your care plan</h1>
              </div>
            </div>
          </section>

          <section className="surface-card rounded-3xl border border-subtle p-6">
            {loading ? (
              <p className="text-sm text-secondary">Loading notifications...</p>
            ) : notifications.length > 0 ? (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification._id?.toString() || notification.createdAt} className="rounded-3xl border border-subtle bg-surface-muted p-5">
                    <p className="font-semibold text-primary">{notification.title}</p>
                    <p className="mt-2 text-sm text-secondary">{notification.message}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted">{notification.type}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-subtle bg-surface-muted p-6 text-sm text-secondary">
                <p>No notifications yet.</p>
                <p className="mt-3">You’ll see booking, payment, and reminder alerts here.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </PatientShell>
  );
}
