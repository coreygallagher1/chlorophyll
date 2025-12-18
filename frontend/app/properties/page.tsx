import Link from "next/link";
import { getProperties } from "../lib/api";
import type { Property } from "../types/property";

export default async function PropertiesPage() {
  let properties: Property[] = [];
  let error: string | null = null;

  try {
    properties = await getProperties();
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load properties";
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-chlorophyll-emerald-800">Properties</h1>
          <p className="mt-2 text-sm text-chlorophyll-emerald-600">
            Manage your property portfolio and living assets
          </p>
        </div>
        <Link
          href="/properties/new"
          className="inline-flex items-center justify-center rounded-lg bg-chlorophyll-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-chlorophyll-emerald-500 hover:shadow-lg"
        >
          + New Property
        </Link>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      {/* Properties list */}
      {!error && (
        <>
          {properties.length === 0 ? (
            <div className="rounded-xl border-2 border-chlorophyll-light-200 bg-white p-12 text-center shadow-sm">
              <p className="text-chlorophyll-emerald-600">No properties yet.</p>
              <Link
                href="/properties/new"
                className="mt-4 inline-block text-sm font-semibold text-chlorophyll-emerald-400 hover:text-chlorophyll-emerald-500"
              >
                Create your first property →
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="group rounded-xl border-2 border-chlorophyll-light-200 bg-white p-6 shadow-sm transition-all hover:border-chlorophyll-light hover:shadow-md"
                >
                  <h2 className="mb-2 text-lg font-semibold text-chlorophyll-emerald-800 group-hover:text-chlorophyll-emerald-700">
                    {property.name}
                  </h2>
                  <div className="space-y-1 text-sm text-chlorophyll-emerald-600">
                    {property.city && property.state && (
                      <p>
                        {property.city}, {property.state}
                      </p>
                    )}
                    {property.postal_code && <p>{property.postal_code}</p>}
                    {property.usda_zone && (
                      <p className="text-xs text-chlorophyll-emerald-500">Zone {property.usda_zone}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

