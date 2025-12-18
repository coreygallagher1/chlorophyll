"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProperty } from "../../lib/api";
import type { PropertyCreate } from "../../types/property";

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PropertyCreate>({
    name: "",
    client_id: 1,
    city: "",
    state: "MN",
    postal_code: "",
    usda_zone: "",
    soil_profile: "",
    sun_exposure_map: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Clean up empty strings to null
      const cleanedData: PropertyCreate = {
        name: formData.name,
        client_id: formData.client_id,
        city: formData.city || null,
        state: formData.state || null,
        postal_code: formData.postal_code || null,
        usda_zone: formData.usda_zone || null,
        soil_profile: formData.soil_profile || null,
        sun_exposure_map: formData.sun_exposure_map || null,
      };

      const property = await createProperty(cleanedData);
      router.push(`/properties/${property.id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create property");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-semibold text-chlorophyll-emerald-800">New Property</h1>
        <p className="mt-2 text-sm text-chlorophyll-emerald-600">
          Add a new property to your portfolio
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-xl border-2 border-chlorophyll-light-200 bg-white p-8 shadow-sm">
        {error && (
          <div className="mb-6 rounded-lg border-2 border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-chlorophyll-emerald-700">
              Property Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
            />
          </div>

          {/* Client ID */}
          <div>
            <label htmlFor="client_id" className="block text-sm font-medium text-chlorophyll-emerald-700">
              Client ID *
            </label>
            <input
              type="number"
              id="client_id"
              required
              min="1"
              value={formData.client_id}
              onChange={(e) => setFormData({ ...formData, client_id: parseInt(e.target.value, 10) })}
              className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-chlorophyll-emerald-700">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.city || ""}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
              />
            </div>

            {/* State */}
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-chlorophyll-emerald-700">
                State
              </label>
              <input
                type="text"
                id="state"
                value={formData.state || ""}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Postal Code */}
            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium text-chlorophyll-emerald-700">
                Postal Code
              </label>
              <input
                type="text"
                id="postal_code"
                value={formData.postal_code || ""}
                onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
              />
            </div>

            {/* USDA Zone */}
            <div>
              <label htmlFor="usda_zone" className="block text-sm font-medium text-chlorophyll-emerald-700">
                USDA Zone
              </label>
              <input
                type="text"
                id="usda_zone"
                placeholder="e.g., 4b"
                value={formData.usda_zone || ""}
                onChange={(e) => setFormData({ ...formData, usda_zone: e.target.value })}
                className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Soil Profile */}
          <div>
            <label htmlFor="soil_profile" className="block text-sm font-medium text-chlorophyll-emerald-700">
              Soil Profile
            </label>
            <textarea
              id="soil_profile"
              rows={3}
              value={formData.soil_profile || ""}
              onChange={(e) => setFormData({ ...formData, soil_profile: e.target.value })}
              className="mt-1 w-full rounded-lg border-2 border-chlorophyll-light-200 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-chlorophyll-emerald-400 focus:border-chlorophyll-emerald-400 focus:outline-none"
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
            {loading ? "Creating..." : "Create Property"}
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

