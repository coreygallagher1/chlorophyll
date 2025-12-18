from datetime import datetime

from fastapi import APIRouter

from app.core.config import settings
from app.schemas.system import SystemInfoRead

router = APIRouter()


@router.get("/info", response_model=SystemInfoRead, tags=["system"])
async def get_system_info() -> SystemInfoRead:
    """
    Get system information including version, environment, and status.
    
    This is a simple endpoint to demonstrate the API structure.
    """
    return SystemInfoRead(
        api_version="0.1.0",
        environment=settings.environment,
        timestamp=datetime.now(),
        status="operational",
        message="Chlorophyll API is running smoothly! 🌱"
    )

