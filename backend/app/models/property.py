from datetime import UTC, datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Property(Base):
    __tablename__ = "properties"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    client_id: Mapped[int] = mapped_column(Integer, index=True)
    city: Mapped[str | None] = mapped_column(String(128))
    state: Mapped[str | None] = mapped_column(String(32), default="MN")
    postal_code: Mapped[str | None] = mapped_column(String(16))

    # Basic horticultural context
    usda_zone: Mapped[str | None] = mapped_column(String(8))
    soil_profile: Mapped[str | None] = mapped_column(Text)
    sun_exposure_map: Mapped[str | None] = mapped_column(Text)  # could be GeoJSON

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )

    living_assets: Mapped[list["LivingAsset"]] = relationship(
        back_populates="property", cascade="all, delete-orphan"
    )


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


class LivingAsset(Base):
    """
    A specific plant instance placed on a property.
    """

    __tablename__ = "living_assets"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id"), index=True)
    plant_taxon_id: Mapped[int] = mapped_column(ForeignKey("plant_taxonomy.id"))

    location_note: Mapped[str | None] = mapped_column(String(255))
    health_status: Mapped[str | None] = mapped_column(String(32))

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )

    property: Mapped[Property] = relationship(back_populates="living_assets")
    taxon: Mapped[PlantTaxon] = relationship()


