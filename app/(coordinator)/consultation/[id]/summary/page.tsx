type Props = {
  params: Promise<{ id: string }>;
};

export default async function CoordinatorConsultationSummaryPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="page-shell px-6 py-10 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <section className="surface-card rounded-3xl p-8">
          <h1 className="font-display text-2xl font-semibold text-primary">Summary for consultation {id}</h1>
          <p className="mt-3 text-secondary">A read-only summary view for patients will be built here.</p>
        </section>
      </div>
    </main>
  );
}
