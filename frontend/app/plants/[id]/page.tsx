import Link from "next/link";
import { notFound } from "next/navigation";
import { getPlant } from "../../lib/api";
import type { PlantTaxon } from "../../types/plant";

interface PlantDetailPageProps {
  params: Promise<{ id: string }>;
}

function formatField(label: string, value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "N/A";
  return String(value);
}

function formatZoneRange(min: string | null, max: string | null): string {
  if (!min && !max) return "N/A";
  if (min && max) return `${min} - ${max}`;
  return min || max || "N/A";
}

export default async function PlantDetailPage({ params }: PlantDetailPageProps) {
  const { id } = await params;
  const plantId = parseInt(id, 10);

  if (isNaN(plantId)) {
    notFound();
  }

  let plant: PlantTaxon | null = null;
  let error: string | null = null;

  try {
    plant = await getPlant(plantId);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load plant";
  }

  if (error || !plant) {
    return (
      <div className="flex flex-col gap-6">
        <Link
          href="/plants"
          className="text-sm font-medium text-chlorophyll-emerald-600 hover:text-chlorophyll-emerald-700"
        >
          ← Back to Plants
        </Link>
        <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {error || "Plant not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/plants"
        className="text-sm font-medium text-chlorophyll-emerald-600 hover:text-chlorophyll-emerald-700"
      >
        ← Back to Plants
      </Link>

      {/* Plant details */}
      <div className="rounded-xl border-2 border-chlorophyll-light-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-chlorophyll-emerald-800">
              {plant.botanical_name}
            </h1>
            {plant.common_name && (
              <p className="mt-1 text-lg text-chlorophyll-emerald-600">{plant.common_name}</p>
            )}
            {plant.cultivar && (
              <p className="mt-1 text-sm italic text-chlorophyll-emerald-500">
                Cultivar: {plant.cultivar}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {plant.is_minnesota_native && (
                <span className="rounded-full bg-chlorophyll-emerald-100 px-3 py-1 text-xs font-medium text-chlorophyll-emerald-700">
                  Minnesota Native
                </span>
              )}
              {plant.plant_type && (
                <span className="rounded-full bg-chlorophyll-light-100 px-3 py-1 text-xs font-medium text-chlorophyll-emerald-700">
                  {plant.plant_type}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Classification */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-chlorophyll-emerald-700">
              Classification
            </h2>
            <div className="space-y-2 text-sm text-chlorophyll-emerald-600">
              <p>
                <span className="font-medium">Lifecycle:</span> {formatField("", plant.lifecycle)}
              </p>
              <p>
                <span className="font-medium">Foliage:</span> {formatField("", plant.foliage_type)}
              </p>
              <p>
                <span className="font-medium">Light:</span>{" "}
                {formatField("", plant.light_requirements)}
              </p>
            </div>
          </div>

          {/* Hardiness & Size */}
          <div>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-chlorophyll-emerald-700">
              Hardiness & Size
            </h2>
            <div className="space-y-2 text-sm text-chlorophyll-emerald-600">
              <p>
                <span className="font-medium">USDA Zones:</span>{" "}
                {formatZoneRange(plant.usda_zone_min, plant.usda_zone_max)}
              </p>
              {plant.mature_height_ft && (
                <p>
                  <span className="font-medium">Mature Height:</span> {plant.mature_height_ft} ft
                </p>
              )}
              {plant.mature_width_ft && (
                <p>
                  <span className="font-medium">Mature Width:</span> {plant.mature_width_ft} ft
                </p>
              )}
            </div>
          </div>
        </div>

        {/* GDD Thresholds */}
        <div className="mt-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-chlorophyll-emerald-700">
            Growing Degree Day (GDD) Thresholds
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plant.gdd_plant_min !== null && (
              <div className="rounded-lg bg-chlorophyll-light-50 p-3">
                <p className="text-xs font-medium text-chlorophyll-emerald-700">Plant</p>
                <p className="text-sm text-chlorophyll-emerald-600">{plant.gdd_plant_min} GDD</p>
              </div>
            )}
            {plant.gdd_prune_min !== null && (
              <div className="rounded-lg bg-chlorophyll-light-50 p-3">
                <p className="text-xs font-medium text-chlorophyll-emerald-700">Prune</p>
                <p className="text-sm text-chlorophyll-emerald-600">{plant.gdd_prune_min} GDD</p>
              </div>
            )}
            {plant.gdd_fertilize_min !== null && (
              <div className="rounded-lg bg-chlorophyll-light-50 p-3">
                <p className="text-xs font-medium text-chlorophyll-emerald-700">Fertilize</p>
                <p className="text-sm text-chlorophyll-emerald-600">{plant.gdd_fertilize_min} GDD</p>
              </div>
            )}
            {plant.gdd_spray_min !== null && (
              <div className="rounded-lg bg-chlorophyll-light-50 p-3">
                <p className="text-xs font-medium text-chlorophyll-emerald-700">Spray</p>
                <p className="text-sm text-chlorophyll-emerald-600">{plant.gdd_spray_min} GDD</p>
              </div>
            )}
            {plant.gdd_divide_min !== null && (
              <div className="rounded-lg bg-chlorophyll-light-50 p-3">
                <p className="text-xs font-medium text-chlorophyll-emerald-700">Divide</p>
                <p className="text-sm text-chlorophyll-emerald-600">{plant.gdd_divide_min} GDD</p>
              </div>
            )}
            {plant.gdd_transplant_min !== null && (
              <div className="rounded-lg bg-chlorophyll-light-50 p-3">
                <p className="text-xs font-medium text-chlorophyll-emerald-700">Transplant</p>
                <p className="text-sm text-chlorophyll-emerald-600">{plant.gdd_transplant_min} GDD</p>
              </div>
            )}
            {plant.gdd_harvest_min !== null && (
              <div className="rounded-lg bg-chlorophyll-light-50 p-3">
                <p className="text-xs font-medium text-chlorophyll-emerald-700">Harvest</p>
                <p className="text-sm text-chlorophyll-emerald-600">{plant.gdd_harvest_min} GDD</p>
              </div>
            )}
          </div>
          {!plant.gdd_plant_min &&
            !plant.gdd_prune_min &&
            !plant.gdd_fertilize_min &&
            !plant.gdd_spray_min &&
            !plant.gdd_divide_min &&
            !plant.gdd_transplant_min &&
            !plant.gdd_harvest_min && (
              <p className="text-sm text-chlorophyll-emerald-500">No GDD thresholds configured</p>
            )}
        </div>

        {/* Notes */}
        {plant.notes && (
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-chlorophyll-emerald-700">
              Notes
            </h2>
            <p className="text-sm text-chlorophyll-emerald-600">{plant.notes}</p>
          </div>
        )}

        {/* Metadata */}
        <div className="mt-6 border-t border-chlorophyll-light-200 pt-4">
          <div className="text-xs text-chlorophyll-emerald-500">
            <p>Plant ID: {plant.id}</p>
            {plant.created_at && (
              <p>Created: {new Date(plant.created_at).toLocaleDateString()}</p>
            )}
            {plant.updated_at && (
              <p>Updated: {new Date(plant.updated_at).toLocaleDateString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

