import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty } from "../../lib/api";
import type { Property } from "../../types/property";

interface PropertyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { id } = await params;
  const propertyId = parseInt(id, 10);

  if (isNaN(propertyId)) {
    notFound();
  }

  let property: Property | null = null;
  let error: string | null = null;

  try {
    property = await getProperty(propertyId);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load property";
  }

  if (error || !property) {
    return (
      <div className="flex flex-col gap-6">
        <Link
          href="/properties"
          className="text-sm font-medium text-chlorophyll-emerald-600 hover:text-chlorophyll-emerald-700"
        >
          ← Back to Properties
        </Link>
        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error || "Property not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/properties"
        className="text-sm font-medium text-chlorophyll-emerald-600 hover:text-chlorophyll-emerald-700"
      >
        ← Back to Properties
      </Link>

      {/* Property details */}
      <div className="rounded-xl border-2 border-chlorophyll-light-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-chlorophyll-emerald-800">{property.name}</h1>
            <p className="mt-1 text-sm text-chlorophyll-emerald-600">Property ID: {property.id}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Location */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-chlorophyll-emerald-700">
              Location
            </h2>
            <div className="space-y-2 text-sm text-chlorophyll-emerald-600">
              {property.city && property.state && (
                <p>
                  {property.city}, {property.state}
                </p>
              )}
              {property.postal_code && <p>{property.postal_code}</p>}
              {property.usda_zone && (
                <p>
                  <span className="font-medium">USDA Zone:</span> {property.usda_zone}
                </p>
              )}
            </div>
          </div>

          {/* Additional info */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-chlorophyll-emerald-700">
              Details
            </h2>
            <div className="space-y-2 text-sm text-chlorophyll-emerald-600">
              <p>
                <span className="font-medium">Client ID:</span> {property.client_id}
              </p>
              {property.created_at && (
                <p>
                  <span className="font-medium">Created:</span>{" "}
                  {new Date(property.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Soil profile */}
        {property.soil_profile && (
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-chlorophyll-emerald-700">
              Soil Profile
            </h2>
            <p className="text-sm text-chlorophyll-emerald-600">{property.soil_profile}</p>
          </div>
        )}
      </div>
    </div>
  );
}

