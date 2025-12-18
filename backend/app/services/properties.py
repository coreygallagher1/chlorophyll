from datetime import datetime
from typing import Any

from app.schemas.properties import (
    LivingAssetCreate,
    LivingAssetRead,
    PlantTaxonRead,
    PropertyCreate,
    PropertyRead,
)


class PropertyService:
    """
    Property & Horticulture Service.

    For now, this is an in-memory / placeholder implementation. Later we will
    inject an AsyncSession and implement real persistence.
    """

    async def create_property(self, data: PropertyCreate) -> PropertyRead:
        return PropertyRead(
            id=1,
            created_at=datetime.now(),
            **data.model_dump(),
        )

    async def get_property(self, property_id: int) -> PropertyRead:
        # Placeholder response; replace with DB query
        return PropertyRead(
            id=property_id,
            name="Demo Property",
            client_id=123,
            city="Saint Paul",
            state="MN",
            postal_code="55101",
            usda_zone="4b",
            soil_profile=None,
            sun_exposure_map=None,
            created_at=datetime.now(),
        )

    async def add_living_asset(
        self,
        property_id: int,
        data: LivingAssetCreate,
    ) -> LivingAssetRead:
        return LivingAssetRead(
            id=1,
            property_id=property_id,
            created_at=datetime.now(),
            **data.model_dump(),
        )

    async def search_taxonomy(self, query: str) -> list[PlantTaxonRead]:
        # Very lightweight fake search result for scaffolding
        sample: dict[str, Any] = {
            "id": 1,
            "botanical_name": "Hydrangea arborescens",
            "common_name": "Smooth hydrangea",
            "cultivar": "Annabelle",
            "is_minnesota_native": True,
        }
        if query:
            return [PlantTaxonRead(**sample)]
        return []


