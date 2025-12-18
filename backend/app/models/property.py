from datetime import UTC, datetime

from sqlalchemy import DateTime, Integer, String, Text
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


