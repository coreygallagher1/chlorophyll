from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.properties import (
    LivingAssetCreate,
    LivingAssetRead,
    PlantTaxonRead,
    PropertyCreate,
    PropertyRead,
)
from app.services.properties import PropertyService


router = APIRouter()


def get_service(db: Annotated[AsyncSession, Depends(get_db)]) -> PropertyService:
    return PropertyService(db)


ServiceDep = Annotated[PropertyService, Depends(get_service)]


@router.post("/", response_model=PropertyRead)
async def create_property(data: PropertyCreate, service: ServiceDep) -> PropertyRead:
    return await service.create_property(data)


@router.get("/{property_id}", response_model=PropertyRead)
async def get_property(property_id: int, service: ServiceDep) -> PropertyRead:
    return await service.get_property(property_id)


@router.post("/{property_id}/assets", response_model=LivingAssetRead)
async def add_living_asset(
    property_id: int, data: LivingAssetCreate, service: ServiceDep
) -> LivingAssetRead:
    return await service.add_living_asset(property_id, data)


@router.get("/taxonomy/search", response_model=list[PlantTaxonRead])
async def search_taxonomy(q: str, service: ServiceDep) -> list[PlantTaxonRead]:
    return await service.search_taxonomy(q)


