from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PlantTaxonBase(BaseModel):
    botanical_name: str
    common_name: str | None = None
    cultivar: str | None = None
    is_minnesota_native: bool
    notes: str | None = None

    # Plant classification
    plant_type: str | None = None  # tree, shrub, perennial, annual, biennial, vine, grass, etc.
    lifecycle: str | None = None  # annual, biennial, perennial
    foliage_type: str | None = None  # deciduous, evergreen, semi-evergreen

    # USDA hardiness zones
    usda_zone_min: str | None = None  # minimum zone (e.g., "3")
    usda_zone_max: str | None = None  # maximum zone (e.g., "8")

    # Light requirements
    light_requirements: str | None = None  # full_sun, partial_sun, partial_shade, full_shade

    # Mature size (in feet)
    mature_height_ft: float | None = None
    mature_width_ft: float | None = None

    # GDD thresholds for common operations
    gdd_prune_min: float | None = None
    gdd_plant_min: float | None = None
    gdd_fertilize_min: float | None = None
    gdd_spray_min: float | None = None  # pest control/pre-emergent
    gdd_divide_min: float | None = None  # divide perennials
    gdd_transplant_min: float | None = None
    gdd_harvest_min: float | None = None  # for edibles

class PlantTaxonCreate(PlantTaxonBase):
    pass


class PlantTaxonRead(PlantTaxonBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime | None = None


class PlantTaxonUpdate(PlantTaxonBase):
    pass


class PlantTaxonDelete(BaseModel):
    """Response model for deleted plant."""
    id: int
    message: str = "Plant deleted successfully"