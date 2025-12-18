from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.living_asset import LivingAsset
from app.models.plant import PlantTaxon
from app.models.property import Property
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

    Handles CRUD operations for properties and living assets.
    """

    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def list_properties(self) -> list[PropertyRead]:
        """List all properties."""
        result = await self.db.execute(select(Property))
        properties = result.scalars().all()
        return [PropertyRead.model_validate(prop) for prop in properties]

    async def create_property(self, data: PropertyCreate) -> PropertyRead:
        """Create a new property."""
        property_obj = Property(**data.model_dump())
        self.db.add(property_obj)
        await self.db.commit()
        await self.db.refresh(property_obj)
        return PropertyRead.model_validate(property_obj)

    async def get_property(self, property_id: int) -> PropertyRead:
        """Get a property by ID. Raises 404 if not found."""
        result = await self.db.execute(
            select(Property).where(Property.id == property_id)
        )
        property_obj = result.scalar_one_or_none()
        if property_obj is None:
            from fastapi import HTTPException

            raise HTTPException(status_code=404, detail=f"Property {property_id} not found")
        return PropertyRead.model_validate(property_obj)

    async def add_living_asset(
        self,
        property_id: int,
        data: LivingAssetCreate,
    ) -> LivingAssetRead:
        """Add a living asset to a property."""
        # Verify property exists
        await self.get_property(property_id)

        # Verify plant taxon exists
        result = await self.db.execute(
            select(PlantTaxon).where(PlantTaxon.id == data.plant_taxon_id)
        )
        taxon = result.scalar_one_or_none()
        if taxon is None:
            from fastapi import HTTPException

            raise HTTPException(
                status_code=404, detail=f"Plant taxon {data.plant_taxon_id} not found"
            )

        asset = LivingAsset(property_id=property_id, **data.model_dump())
        self.db.add(asset)
        await self.db.commit()
        await self.db.refresh(asset)
        return LivingAssetRead.model_validate(asset)

    async def search_taxonomy(self, query: str) -> list[PlantTaxonRead]:
        """Search plant taxonomy by botanical name, common name, or cultivar."""
        if not query or not query.strip():
            return []

        search_term = f"%{query.strip().lower()}%"
        result = await self.db.execute(
            select(PlantTaxon).where(
                (PlantTaxon.botanical_name.ilike(search_term))
                | (PlantTaxon.common_name.ilike(search_term))
                | (PlantTaxon.cultivar.ilike(search_term))
            )
        )
        taxa = result.scalars().all()
        return [PlantTaxonRead.model_validate(taxon) for taxon in taxa]


