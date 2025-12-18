from celery import shared_task


@shared_task(name="phenology.scan_gdd_triggers")
def scan_gdd_triggers(region: str = "Twin Cities") -> dict:
    """
    Placeholder Celery task; later this will:
    - Pull latest NWS data
    - Compute cumulative GDD
    - Create or update work orders as thresholds are met
    """
    return {"region": region, "created_work_orders": 0}


