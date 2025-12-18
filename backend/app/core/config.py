from functools import lru_cache
from typing import Literal

from pydantic import AnyUrl, Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    environment: Literal["local", "dev", "staging", "prod"] = "local"

    api_prefix: str = "/api"

    database_url: AnyUrl = Field(
        "postgresql+asyncpg://postgres:postgres@localhost:5433/chlorophyll",
        alias="DATABASE_URL",
    )
    redis_url: AnyUrl = Field("redis://localhost:6379/0", alias="REDIS_URL")

    # Celery
    celery_broker_url: AnyUrl | None = None
    celery_result_backend: AnyUrl | None = None

    # Phenology / weather
    nws_base_url: str = "https://api.weather.gov"
    default_region: str = "Twin Cities"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "env_nested_delimiter": "__",
    }

    @property
    def broker_url(self) -> str:
        return (self.celery_broker_url or self.redis_url).__str__()

    @property
    def result_backend(self) -> str:
        return (self.celery_result_backend or self.redis_url).__str__()


@lru_cache
def get_settings() -> Settings:
    return Settings()  # type: ignore[arg-type]


settings = get_settings()


