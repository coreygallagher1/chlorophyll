from datetime import date

from app.schemas.phenology import (
    GDDStatusRead,
    PhenologyScanRequest,
    PhenologyScanResult,
)


class PhenologyService:
    """
    Phenological Engine / Botanical Brain.

    Later this will:
    - Ingest NWS data and compute daily GDD
    - Scan living assets and generate work orders when thresholds are met
    - Monitor frost risk for sensitive plantings
    """

    async def get_gdd_status(self) -> GDDStatusRead:
        # Placeholder: constant demo payload
        return GDDStatusRead(
            as_of=date.today(),
            station_id="KMSP",
            cumulative_gdd_base_50f=350.0,
        )

    async def scan_work_triggers(self, payload: PhenologyScanRequest) -> PhenologyScanResult:
        # Later this will enqueue a Celery task and return a job handle
        return PhenologyScanResult(
            region=payload.region,
            created_work_orders=42,
            scanned_assets=1200,
        )


