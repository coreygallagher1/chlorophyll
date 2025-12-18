from fastapi import APIRouter

from app.schemas.logistics import DailyRoutePlan, RouteRequest
from app.services.logistics import LogisticsService


router = APIRouter()
service = LogisticsService()


@router.post("/routes/plan", response_model=DailyRoutePlan)
async def plan_routes(payload: RouteRequest) -> DailyRoutePlan:
    """
    Generate optimized field routes for a given day.
    """
    return await service.plan_routes(payload)


