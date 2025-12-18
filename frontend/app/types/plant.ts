export interface PlantTaxon {
  id: number;
  botanical_name: string;
  common_name: string | null;
  cultivar: string | null;
  is_minnesota_native: boolean;
  notes: string | null;
  plant_type: string | null;
  lifecycle: string | null;
  foliage_type: string | null;
  usda_zone_min: string | null;
  usda_zone_max: string | null;
  light_requirements: string | null;
  mature_height_ft: number | null;
  mature_width_ft: number | null;
  gdd_prune_min: number | null;
  gdd_plant_min: number | null;
  gdd_fertilize_min: number | null;
  gdd_spray_min: number | null;
  gdd_divide_min: number | null;
  gdd_transplant_min: number | null;
  gdd_harvest_min: number | null;
  created_at: string;
  updated_at: string | null;
}

export interface PlantTaxonCreate {
  botanical_name: string;
  common_name?: string | null;
  cultivar?: string | null;
  is_minnesota_native?: boolean;
  notes?: string | null;
  plant_type?: string | null;
  lifecycle?: string | null;
  foliage_type?: string | null;
  usda_zone_min?: string | null;
  usda_zone_max?: string | null;
  light_requirements?: string | null;
  mature_height_ft?: number | null;
  mature_width_ft?: number | null;
  gdd_prune_min?: number | null;
  gdd_plant_min?: number | null;
  gdd_fertilize_min?: number | null;
  gdd_spray_min?: number | null;
  gdd_divide_min?: number | null;
  gdd_transplant_min?: number | null;
  gdd_harvest_min?: number | null;
}

