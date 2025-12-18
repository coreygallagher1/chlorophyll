from datetime import date

from pydantic import BaseModel


class RouteStop(BaseModel):
    property_id: int
    address: str | None = None
    eta: str | None = None


class Route(BaseModel):
    crew_id: int
    date: date
    stops: list[RouteStop]


class RouteRequest(BaseModel):
    date: date
    crew_ids: list[int]


class DailyRoutePlan(BaseModel):
    date: date
    routes: list[Route]


