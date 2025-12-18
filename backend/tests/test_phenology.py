"""Tests for phenology endpoints."""
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_get_gdd_status(client: AsyncClient) -> None:
    """Test getting GDD status."""
    response = await client.get("/api/v1/phenology/gdd/status")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, dict)
    assert "as_of" in data
    assert "station_id" in data
    assert "cumulative_gdd_base_50f" in data
    assert isinstance(data["cumulative_gdd_base_50f"], (int, float))


@pytest.mark.asyncio
async def test_scan_work_triggers(client: AsyncClient) -> None:
    """Test scanning work triggers."""
    scan_data = {
        "region": "Twin Cities",
        "dry_run": True,
    }
    
    response = await client.post("/api/v1/phenology/work-triggers/scan", json=scan_data)
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, dict)
    assert "region" in data
    assert "created_work_orders" in data
    assert "scanned_assets" in data

