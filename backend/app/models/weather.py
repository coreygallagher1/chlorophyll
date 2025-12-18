from datetime import date

from sqlalchemy import Date, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

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

