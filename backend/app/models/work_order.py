from datetime import UTC, date, datetime

from sqlalchemy import Boolean, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


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

