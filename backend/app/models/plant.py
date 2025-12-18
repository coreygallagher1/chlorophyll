from sqlalchemy import Float, Integer, String, Text
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

    # GDD thresholds for common operations
    gdd_prune_min: Mapped[float | None] = mapped_column(Float)
    gdd_plant_min: Mapped[float | None] = mapped_column(Float)

