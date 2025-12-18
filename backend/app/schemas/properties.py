from datetime import datetime

from pydantic import BaseModel, ConfigDict


class PropertyBase(BaseModel):
    name: str
    client_id: int
    city: str | None = None
    state: str | None = "MN"
    postal_code: str | None = None
    usda_zone: str | None = None
    soil_profile: str | None = None
    sun_exposure_map: str | None = None


class PropertyCreate(PropertyBase):
    pass


class PropertyRead(PropertyBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime


class PlantTaxonRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    botanical_name: str
    common_name: str | None = None
    cultivar: str | None = None
    is_minnesota_native: bool


class LivingAssetBase(BaseModel):
    plant_taxon_id: int
    location_note: str | None = None
    health_status: str | None = None


class LivingAssetCreate(LivingAssetBase):
    pass


class LivingAssetRead(LivingAssetBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    property_id: int
    created_at: datetime


