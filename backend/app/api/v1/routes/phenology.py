from fastapi import APIRouter

from app.schemas.phenology import (
    GDDStatusRead,
    PhenologyScanRequest,
    PhenologyScanResult,
)
from app.services.phenology import PhenologyService


router = APIRouter()
service = PhenologyService()


@router.get("/gdd/status", response_model=GDDStatusRead)
async def get_gdd_status() -> GDDStatusRead:
    """
    Current Growing Degree Days snapshot for the Twin Cities region.
    """
    return await service.get_gdd_status()


@router.post("/work-triggers/scan", response_model=PhenologyScanResult)
async def scan_work_triggers(payload: PhenologyScanRequest) -> PhenologyScanResult:
    """
    Manually trigger a phenology scan to generate work orders based on GDD thresholds.
    """
    return await service.scan_work_triggers(payload)


