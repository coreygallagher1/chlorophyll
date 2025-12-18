from datetime import date

from pydantic import BaseModel


class GDDStatusRead(BaseModel):
    as_of: date
    station_id: str
    cumulative_gdd_base_50f: float


class PhenologyScanRequest(BaseModel):
    region: str = "Twin Cities"
    dry_run: bool = True


class PhenologyScanResult(BaseModel):
    region: str
    created_work_orders: int
    scanned_assets: int


