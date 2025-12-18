from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import HTTPException
from app.models.plant import PlantTaxon
from app.schemas.plant import (
    PlantTaxonCreate,
    PlantTaxonRead,
    PlantTaxonUpdate,
    PlantTaxonDelete
)

class PlantService:
    """
    Plant Service.

    Handles CRUD operations for plant taxonomy.
    """

    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def list_plants(self) -> list[PlantTaxonRead]:
        """List all plants."""
        result = await self.db.execute(select(PlantTaxon))
        plants = result.scalars().all()
        return [PlantTaxonRead.model_validate(plant) for plant in plants]

    async def create_plant(self, plant: PlantTaxonCreate) -> PlantTaxonRead:
        """Create a new plant."""
        plant_obj = PlantTaxon(**plant.model_dump())
        self.db.add(plant_obj)
        await self.db.commit()
        await self.db.refresh(plant_obj)
        return PlantTaxonRead.model_validate(plant_obj)

    async def get_plant(self, plant_id: int) -> PlantTaxonRead:
        """Get a plant by ID."""
        result = await self.db.execute(select(PlantTaxon).where(PlantTaxon.id == plant_id))
        plant_obj = result.scalar_one_or_none()
        if plant_obj is None:
            raise HTTPException(status_code=404, detail="Plant not found")
        return PlantTaxonRead.model_validate(plant_obj)

    async def update_plant(self, plant_id: int, plant: PlantTaxonUpdate) -> PlantTaxonRead:
        """Update a plant."""
        result = await self.db.execute(select(PlantTaxon).where(PlantTaxon.id == plant_id))
        plant_obj = result.scalar_one_or_none()
        if plant_obj is None:
            raise HTTPException(status_code=404, detail="Plant not found")
        update_data = plant.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(plant_obj, field, value)
        # updated_at will be set automatically by onupdate
        await self.db.commit()
        await self.db.refresh(plant_obj)
        return PlantTaxonRead.model_validate(plant_obj)

    async def delete_plant(self, plant_id: int) -> PlantTaxonDelete:
        """Delete a plant."""
        result = await self.db.execute(select(PlantTaxon).where(PlantTaxon.id == plant_id))
        plant_obj = result.scalar_one_or_none()
        if plant_obj is None:
            raise HTTPException(status_code=404, detail="Plant not found")
        self.db.delete(plant_obj)
        await self.db.commit()
        return PlantTaxonDelete(id=plant_id, message="Plant deleted successfully")

    async def search_plants(self, query: str) -> list[PlantTaxonRead]:
        """Search for plants by botanical name, common name, or cultivar."""
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
        plants = result.scalars().all()
        return [PlantTaxonRead.model_validate(plant) for plant in plants]

    