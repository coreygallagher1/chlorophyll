from datetime import datetime

from pydantic import BaseModel


class SystemInfoRead(BaseModel):
    """System information response."""
    api_version: str
    environment: str
    timestamp: datetime
    status: str
    message: str

