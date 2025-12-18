from datetime import datetime

from pydantic import BaseModel, ConfigDict

class LivingAssetBase(BaseModel):
    plant_taxon_id: int
    location_note: str | None = None
    health_status: str | None = None

class LivingAssetCreate(LivingAssetBase):
    pass
