import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-16 py-12 md:gap-20 md:py-16">
      {/* Hero */}
      <section className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-chlorophyll-light-200/50">
            <Image
              src="/chlorophyll_logo.png"
              alt="Chlorophyll logo"
              width={48}
              height={48}
              priority
              className="object-contain"
            />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-chlorophyll-emerald-400">
              Botanical Intelligence ERP
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-chlorophyll-emerald-700 md:text-5xl">
              Chlorophyll
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:max-w-xl md:items-end">
          <p className="text-base leading-relaxed text-chlorophyll-emerald-600 md:text-right md:text-lg">
            A phenology-driven ERP for high-touch gardening firms. Chlorophyll turns living
            landscapes into managed, predictive assets using weather, Growing Degree Days
            (GDD), and plant development stages instead of static calendars.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-chlorophyll-light px-6 py-3 text-sm font-semibold text-chlorophyll-emerald-700 shadow-md shadow-chlorophyll-light/30 transition-all hover:bg-chlorophyll-light-200 hover:shadow-lg hover:shadow-chlorophyll-light/40"
            >
              Request a demo
            </a>
            <a
              href="#pillars"
              className="inline-flex items-center justify-center rounded-lg border-2 border-chlorophyll-emerald-300 bg-white px-6 py-3 text-sm font-semibold text-chlorophyll-emerald-600 transition-all hover:border-chlorophyll-emerald-400 hover:bg-chlorophyll-emerald-50"
            >
              Explore the platform
            </a>
          </div>
        </div>
      </section>

      {/* Pillars / Value props */}
      <section
        id="pillars"
        className="grid gap-6 md:grid-cols-3"
        aria-label="Core pillars of the Chlorophyll platform"
      >
        <div className="group rounded-xl border-2 border-chlorophyll-light-200 bg-white p-6 shadow-sm transition-all hover:border-chlorophyll-light hover:shadow-md">
          <h2 className="mb-3 text-base font-semibold text-chlorophyll-emerald-700">
            Living Asset Registry
          </h2>
          <p className="text-sm leading-relaxed text-chlorophyll-emerald-600">
            Property-first CRM where every plant is a tracked asset with its own history,
            health, and care requirements across seasons.
          </p>
        </div>

        <div className="group rounded-xl border-2 border-chlorophyll-light-200 bg-white p-6 shadow-sm transition-all hover:border-chlorophyll-light hover:shadow-md">
          <h2 className="mb-3 text-base font-semibold text-chlorophyll-emerald-700">
            Thermal &amp; Phenology Engine
          </h2>
          <p className="text-sm leading-relaxed text-chlorophyll-emerald-600">
            Automated work generation from local weather and GDD thresholds—so pruning, pest
            control, and applications happen at peak biological efficacy.
          </p>
        </div>

        <div className="group rounded-xl border-2 border-chlorophyll-light-200 bg-white p-6 shadow-sm transition-all hover:border-chlorophyll-light hover:shadow-md">
          <h2 className="mb-3 text-base font-semibold text-chlorophyll-emerald-700">
            Field, Fiscal &amp; Story
          </h2>
          <p className="text-sm leading-relaxed text-chlorophyll-emerald-600">
            Minnesota-aware logistics, compliance-aware billing, and client-facing garden
            journals that tell the story behind every visit.
          </p>
        </div>
      </section>

      {/* CTA footer */}
      <section
        id="contact"
        className="flex flex-col gap-6 rounded-xl border-2 border-chlorophyll-emerald-200 bg-gradient-to-br from-chlorophyll-emerald-50 via-white to-chlorophyll-light-50 p-8 shadow-lg md:flex-row md:items-center md:justify-between"
      >
        <p className="max-w-2xl text-sm leading-relaxed text-chlorophyll-emerald-700 md:text-base">
          Ready to pilot Chlorophyll with your crews? Start with a single property, wire it
          into live weather and phenology, and grow from there.
        </p>
        <a
          href="mailto:hello@chlorophyll.local?subject=Chlorophyll%20Pilot"
          className="shrink-0 rounded-lg bg-chlorophyll-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-chlorophyll-emerald-400/30 transition-all hover:bg-chlorophyll-emerald-500 hover:shadow-lg hover:shadow-chlorophyll-emerald-500/40"
        >
          Talk to us about a pilot
        </a>
      </section>
    </main>
  );
}


