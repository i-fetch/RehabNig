type Props = {
  params: Promise<{ id: string }>;
};

export default async function CoordinatorConsultationPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="page-shell px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="surface-card rounded-3xl p-8">
          <h1 className="font-display text-2xl font-semibold text-primary">Consultation {id}</h1>
          <p className="mt-3 text-secondary">Start sessions, write notes, and track follow-ups here.</p>
        </section>
      </div>
    </main>
  );
}
