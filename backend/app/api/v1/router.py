from fastapi import APIRouter

from app.api.v1.routes import phenology, properties, logistics, fiscal


api_router = APIRouter()

api_router.include_router(properties.router, prefix="/properties", tags=["properties"])
api_router.include_router(phenology.router, prefix="/phenology", tags=["phenology"])
api_router.include_router(logistics.router, prefix="/logistics", tags=["logistics"])
api_router.include_router(fiscal.router, prefix="/fiscal", tags=["fiscal"])


