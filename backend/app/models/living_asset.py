from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


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

    property: Mapped["Property"] = relationship(back_populates="living_assets")
    taxon: Mapped["PlantTaxon"] = relationship()

