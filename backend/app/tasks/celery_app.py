from celery import Celery

from app.core.config import settings


celery_app = Celery(
    "chlorophyll",
    broker=settings.broker_url,
    backend=settings.result_backend,
)

celery_app.conf.update(
    task_default_queue="default",
    task_routes={
        "app.tasks.phenology.*": {"queue": "phenology"},
    },
)


@celery_app.task
def demo_task(message: str) -> str:
    return f\"Echo from Celery: {message}\"


