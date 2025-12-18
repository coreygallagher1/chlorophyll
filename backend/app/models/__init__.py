"""Import all models so Alembic can detect them."""
from app.models.operations import WeatherReading, WorkOrder
from app.models.property import LivingAsset, PlantTaxon, Property

__all__ = ["LivingAsset", "PlantTaxon", "Property", "WeatherReading", "WorkOrder"]

