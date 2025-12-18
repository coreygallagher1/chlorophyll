export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-chlorophyll-200">
          Chlorophyll
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          A horticultural ERP for managing living assets, driven by Growing Degree
          Days and real-world plant phenology instead of static calendars.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-medium text-slate-100">
            Botanical Brain
          </h2>
          <p className="mt-1 text-xs text-slate-300">
            Central phenological engine that syncs weather, computes GDD, and
            triggers pruning and planting work orders automatically.
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-medium text-slate-100">
            Field Logistics
          </h2>
          <p className="mt-1 text-xs text-slate-300">
            Route optimization and offline-first field sync to keep 30 crew
            members in sync across the Twin Cities.
          </p>
        </div>
      </section>
    </main>
  );
}


