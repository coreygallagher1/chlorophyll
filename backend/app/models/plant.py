from datetime import UTC, datetime

from sqlalchemy import DateTime, Float, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class PlantTaxon(Base):
    """
    Canonical plant taxonomy used by designers and the phenological engine.
    """

    __tablename__ = "plant_taxonomy"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    botanical_name: Mapped[str] = mapped_column(String(255), index=True)
    common_name: Mapped[str | None] = mapped_column(String(255))
    cultivar: Mapped[str | None] = mapped_column(String(255))
    is_minnesota_native: Mapped[bool] = mapped_column(default=False)
    notes: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC).replace(tzinfo=None))
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=lambda: datetime.now(UTC).replace(tzinfo=None), onupdate=lambda: datetime.now(UTC).replace(tzinfo=None))
    deleted_at: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)

    # Plant classification
    plant_type: Mapped[str | None] = mapped_column(String(64))  # tree, shrub, perennial, annual, biennial, vine, grass, etc.
    lifecycle: Mapped[str | None] = mapped_column(String(32))  # annual, biennial, perennial
    foliage_type: Mapped[str | None] = mapped_column(String(32))  # deciduous, evergreen, semi-evergreen

    # USDA hardiness zones (e.g., "3", "4", "5" or ranges like "3-8")
    usda_zone_min: Mapped[str | None] = mapped_column(String(8))  # minimum zone (e.g., "3")
    usda_zone_max: Mapped[str | None] = mapped_column(String(8))  # maximum zone (e.g., "8")

    # Light requirements
    light_requirements: Mapped[str | None] = mapped_column(String(32))  # full_sun, partial_sun, partial_shade, full_shade

    # Mature size (in feet)
    mature_height_ft: Mapped[float | None] = mapped_column(Float)
    mature_width_ft: Mapped[float | None] = mapped_column(Float)

    # GDD thresholds for common operations
    gdd_prune_min: Mapped[float | None] = mapped_column(Float)
    gdd_plant_min: Mapped[float | None] = mapped_column(Float)
    gdd_fertilize_min: Mapped[float | None] = mapped_column(Float)
    gdd_spray_min: Mapped[float | None] = mapped_column(Float)  # pest control/pre-emergent
    gdd_divide_min: Mapped[float | None] = mapped_column(Float)  # divide perennials
    gdd_transplant_min: Mapped[float | None] = mapped_column(Float)
    gdd_harvest_min: Mapped[float | None] = mapped_column(Float)  # for edibles

