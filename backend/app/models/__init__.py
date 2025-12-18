"""Import all models so Alembic can detect them."""
from app.models.living_asset import LivingAsset
from app.models.plant import PlantTaxon
from app.models.property import Property
from app.models.weather import WeatherReading
from app.models.work_order import WorkOrder

__all__ = ["LivingAsset", "PlantTaxon", "Property", "WeatherReading", "WorkOrder"]

