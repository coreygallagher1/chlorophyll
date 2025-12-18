from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.plant import (
    PlantTaxonCreate,
    PlantTaxonRead,
    PlantTaxonUpdate,
    PlantTaxonDelete,
)
from app.services.plant import PlantService


router = APIRouter()

def get_service(db: Annotated[AsyncSession, Depends(get_db)]) -> PlantService:
    return PlantService(db)

ServiceDep = Annotated[PlantService, Depends(get_service)]

@router.get("/", response_model=list[PlantTaxonRead])
async def list_plants(service: ServiceDep) -> list[PlantTaxonRead]:
    """List all plants."""
    return await service.list_plants()

@router.post("/", response_model=PlantTaxonRead)
async def create_plant(plant: PlantTaxonCreate, service: ServiceDep) -> PlantTaxonRead:
    return await service.create_plant(plant)

@router.get("/search", response_model=list[PlantTaxonRead])
async def search_plants(query: str, service: ServiceDep) -> list[PlantTaxonRead]:
    """Search for plants by botanical name, common name, or cultivar."""
    return await service.search_plants(query)

@router.get("/{plant_id}", response_model=PlantTaxonRead)
async def get_plant(plant_id: int, service: ServiceDep) -> PlantTaxonRead:
    """Get a plant by ID."""
    return await service.get_plant(plant_id)

@router.put("/{plant_id}", response_model=PlantTaxonRead)
async def update_plant(plant_id: int, plant: PlantTaxonUpdate, service: ServiceDep) -> PlantTaxonRead:
    """Update a plant by ID."""
    return await service.update_plant(plant_id, plant)

@router.delete("/{plant_id}", response_model=PlantTaxonDelete)
async def delete_plant(plant_id: int, service: ServiceDep) -> PlantTaxonDelete:
    """Delete a plant by ID."""
    return await service.delete_plant(plant_id)

    