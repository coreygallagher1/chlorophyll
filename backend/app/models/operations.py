from datetime import UTC, date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class WeatherReading(Base):
    __tablename__ = "weather_readings"

    id: Mapped[int] = mapped_column(primary_key=True)
    station_id: Mapped[str] = mapped_column(String(64), index=True)
    reading_date: Mapped[date] = mapped_column(Date, index=True)
    t_min_c: Mapped[float | None] = mapped_column(Float)
    t_max_c: Mapped[float | None] = mapped_column(Float)
    gdd_base_50f: Mapped[float | None] = mapped_column(Float)
    gdd_cumulative_50f: Mapped[float | None] = mapped_column(Float)


class WorkOrder(Base):
    __tablename__ = "work_orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    property_id: Mapped[int] = mapped_column(ForeignKey("properties.id"), index=True)
    living_asset_id: Mapped[int | None] = mapped_column(ForeignKey("living_assets.id"))

    kind: Mapped[str] = mapped_column(String(64))  # pruning, planting, inspection, etc.
    status: Mapped[str] = mapped_column(String(32), default="pending")
    scheduled_for: Mapped[date | None] = mapped_column(Date)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(UTC).replace(tzinfo=None)
    )

    triggered_by_gdd: Mapped[bool] = mapped_column(Boolean, default=False)
    trigger_threshold: Mapped[float | None] = mapped_column(Float)

    property: Mapped["Property"] = relationship()


