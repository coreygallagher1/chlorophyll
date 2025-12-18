"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPlant } from "../../lib/api";
import type { PlantTaxonCreate } from "../../types/plant";

export default function NewPlantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PlantTaxonCreate>({
    botanical_name: "",
    common_name: "",
    cultivar: "",
    is_minnesota_native: false,
    notes: "",
    plant_type: "",
    lifecycle: "",
    foliage_type: "",
    usda_zone_min: "",
    usda_zone_max: "",
    light_requirements: "",
    mature_height_ft: null,
    mature_width_ft: null,
    gdd_prune_min: null,
    gdd_plant_min: null,
    gdd_fertilize_min: null,
    gdd_spray_min: null,
    gdd_divide_min: null,
    gdd_transplant_min: null,
    gdd_harvest_min: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Clean up empty strings to null
      const cleanedData: PlantTaxonCreate = {
        botanical_name: formData.botanical_name,
        common_name: formData.common_name || null,
        cultivar: formData.cultivar || null,
        is_minnesota_native: formData.is_minnesota_native,
        notes: formData.notes || null,
        plant_type: formData.plant_type || null,
        lifecycle: formData.lifecycle || null,
        foliage_type: formData.foliage_type || null,
        usda_zone_min: formData.usda_zone_min || null,
        usda_zone_max: formData.usda_zone_max || null,
        light_requirements: formData.light_requirements || null,
        mature_height_ft: formData.mature_height_ft || null,
        mature_width_ft: formData.mature_width_ft || null,
        gdd_prune_min: formData.gdd_prune_min || null,
        gdd_plant_min: formData.gdd_plant_min || null,
        gdd_fertilize_min: formData.gdd_fertilize_min || null,
        gdd_spray_min: formData.gdd_spray_min || null,
        gdd_divide_min: formData.gdd_divide_min || null,
        gdd_transplant_min: formData.gdd_transplant_min || null,
        gdd_harvest_min: formData.gdd_harvest_min || null,
      };

      const plant = await createPlant(cleanedData);
      router.push(`/plants/${plant.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create plant");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold text-chlorophyll-emerald-800">New Plant</h1>
        <p className="mt-2 text-sm text-chlorophyll-emerald-600">
          Add a new plant to your taxonomy catalog
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border-2 border-chlorophyll-light-200 bg-white p-8 shadow-sm"
      >
        {error && (
          <div className="mb-6 rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-chlorophyll-emerald-700">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="botanical_name"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Botanical Name *
                </label>
                <input
                  type="text"
                  id="botanical_name"
                  required
                  value={formData.botanical_name}
                  onChange={(e) => setFormData({ ...formData, botanical_name: e.target.value })}
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                  placeholder="e.g., Acer saccharum"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="common_name"
                    className="block text-sm font-medium text-chlorophyll-emerald-700"
                  >
                    Common Name
                  </label>
                  <input
                    type="text"
                    id="common_name"
                    value={formData.common_name || ""}
                    onChange={(e) => setFormData({ ...formData, common_name: e.target.value })}
                    className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                    placeholder="e.g., Sugar maple"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cultivar"
                    className="block text-sm font-medium text-chlorophyll-emerald-700"
                  >
                    Cultivar
                  </label>
                  <input
                    type="text"
                    id="cultivar"
                    value={formData.cultivar || ""}
                    onChange={(e) => setFormData({ ...formData, cultivar: e.target.value })}
                    className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                    placeholder="e.g., Autumn Blaze"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_minnesota_native"
                  checked={formData.is_minnesota_native}
                  onChange={(e) =>
                    setFormData({ ...formData, is_minnesota_native: e.target.checked })
                  }
                  className="h-4 w-4 rounded border-chlorophyll-light-200 text-chlorophyll-emerald-400 focus:ring-chlorophyll-emerald-400"
                />
                <label
                  htmlFor="is_minnesota_native"
                  className="text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Minnesota Native
                </label>
              </div>
            </div>
          </div>

          {/* Classification */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-chlorophyll-emerald-700">
              Classification
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="plant_type"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Plant Type
                </label>
                <select
                  id="plant_type"
                  value={formData.plant_type || ""}
                  onChange={(e) => setFormData({ ...formData, plant_type: e.target.value })}
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 focus:border-chlorophyll-emerald-400 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="tree">Tree</option>
                  <option value="shrub">Shrub</option>
                  <option value="perennial">Perennial</option>
                  <option value="annual">Annual</option>
                  <option value="biennial">Biennial</option>
                  <option value="vine">Vine</option>
                  <option value="grass">Grass</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="lifecycle"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Lifecycle
                </label>
                <select
                  id="lifecycle"
                  value={formData.lifecycle || ""}
                  onChange={(e) => setFormData({ ...formData, lifecycle: e.target.value })}
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 focus:border-chlorophyll-emerald-400 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="annual">Annual</option>
                  <option value="biennial">Biennial</option>
                  <option value="perennial">Perennial</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="foliage_type"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Foliage Type
                </label>
                <select
                  id="foliage_type"
                  value={formData.foliage_type || ""}
                  onChange={(e) => setFormData({ ...formData, foliage_type: e.target.value })}
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 focus:border-chlorophyll-emerald-400 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="deciduous">Deciduous</option>
                  <option value="evergreen">Evergreen</option>
                  <option value="semi-evergreen">Semi-evergreen</option>
                </select>
              </div>
            </div>
          </div>

          {/* Hardiness & Light */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-chlorophyll-emerald-700">
              Hardiness & Light
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label
                  htmlFor="usda_zone_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  USDA Zone Min
                </label>
                <input
                  type="text"
                  id="usda_zone_min"
                  value={formData.usda_zone_min || ""}
                  onChange={(e) => setFormData({ ...formData, usda_zone_min: e.target.value })}
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                  placeholder="e.g., 3"
                />
              </div>

              <div>
                <label
                  htmlFor="usda_zone_max"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  USDA Zone Max
                </label>
                <input
                  type="text"
                  id="usda_zone_max"
                  value={formData.usda_zone_max || ""}
                  onChange={(e) => setFormData({ ...formData, usda_zone_max: e.target.value })}
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                  placeholder="e.g., 8"
                />
              </div>

              <div>
                <label
                  htmlFor="light_requirements"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Light Requirements
                </label>
                <select
                  id="light_requirements"
                  value={formData.light_requirements || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, light_requirements: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 focus:border-chlorophyll-emerald-400 focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option value="full_sun">Full Sun</option>
                  <option value="partial_sun">Partial Sun</option>
                  <option value="partial_shade">Partial Shade</option>
                  <option value="full_shade">Full Shade</option>
                </select>
              </div>
            </div>
          </div>

          {/* Mature Size */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-chlorophyll-emerald-700">
              Mature Size (feet)
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="mature_height_ft"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Mature Height (ft)
                </label>
                <input
                  type="number"
                  id="mature_height_ft"
                  step="0.1"
                  value={formData.mature_height_ft || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mature_height_ft: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="mature_width_ft"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Mature Width (ft)
                </label>
                <input
                  type="number"
                  id="mature_width_ft"
                  step="0.1"
                  value={formData.mature_width_ft || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mature_width_ft: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* GDD Thresholds */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-chlorophyll-emerald-700">
              Growing Degree Day (GDD) Thresholds
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label
                  htmlFor="gdd_plant_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Plant (GDD)
                </label>
                <input
                  type="number"
                  id="gdd_plant_min"
                  step="0.1"
                  value={formData.gdd_plant_min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gdd_plant_min: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="gdd_prune_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Prune (GDD)
                </label>
                <input
                  type="number"
                  id="gdd_prune_min"
                  step="0.1"
                  value={formData.gdd_prune_min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gdd_prune_min: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="gdd_fertilize_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Fertilize (GDD)
                </label>
                <input
                  type="number"
                  id="gdd_fertilize_min"
                  step="0.1"
                  value={formData.gdd_fertilize_min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gdd_fertilize_min: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="gdd_spray_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Spray (GDD)
                </label>
                <input
                  type="number"
                  id="gdd_spray_min"
                  step="0.1"
                  value={formData.gdd_spray_min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gdd_spray_min: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="gdd_divide_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Divide (GDD)
                </label>
                <input
                  type="number"
                  id="gdd_divide_min"
                  step="0.1"
                  value={formData.gdd_divide_min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gdd_divide_min: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="gdd_transplant_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Transplant (GDD)
                </label>
                <input
                  type="number"
                  id="gdd_transplant_min"
                  step="0.1"
                  value={formData.gdd_transplant_min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gdd_transplant_min: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="gdd_harvest_min"
                  className="block text-sm font-medium text-chlorophyll-emerald-700"
                >
                  Harvest (GDD)
                </label>
                <input
                  type="number"
                  id="gdd_harvest_min"
                  step="0.1"
                  value={formData.gdd_harvest_min || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gdd_harvest_min: e.target.value ? parseFloat(e.target.value) : null,
                    })
                  }
                  className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-chlorophyll-emerald-700">
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
              placeholder="Additional notes about this plant..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-chlorophyll-emerald-400 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-chlorophyll-emerald-500 hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Plant"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border-2 border-chlorophyll-emerald-300 px-6 py-3 text-sm font-semibold text-chlorophyll-emerald-600 transition-all hover:border-chlorophyll-emerald-400 hover:bg-chlorophyll-emerald-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

