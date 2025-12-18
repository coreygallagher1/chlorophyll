export interface Property {
  id: number;
  name: string;
  client_id: number;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  usda_zone: string | null;
  soil_profile: string | null;
  sun_exposure_map: string | null;
  created_at: string;
}

export interface PropertyCreate {
  name: string;
  client_id: number;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  usda_zone?: string | null;
  soil_profile?: string | null;
  sun_exposure_map?: string | null;
}

