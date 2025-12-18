"""Tests for properties endpoints."""
import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_create_property(client: AsyncClient) -> None:
    """Test creating a property."""
    property_data = {
        "name": "Test Garden",
        "client_id": 1,
        "city": "Saint Paul",
        "state": "MN",
        "postal_code": "55101",
        "usda_zone": "4b",
    }
    
    response = await client.post("/api/v1/properties/", json=property_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["name"] == property_data["name"]
    assert data["client_id"] == property_data["client_id"]
    assert data["city"] == property_data["city"]
    assert data["state"] == property_data["state"]
    assert "id" in data


@pytest.mark.asyncio
async def test_get_property(client: AsyncClient) -> None:
    """Test getting a property by ID."""
    # First create a property
    property_data = {
        "name": "Test Property",
        "client_id": 1,
        "city": "Saint Paul",
        "state": "MN",
    }
    create_response = await client.post("/api/v1/properties/", json=property_data)
    property_id = create_response.json()["id"]
    
    # Now get it
    response = await client.get(f"/api/v1/properties/{property_id}")
    assert response.status_code == 200
    
    data = response.json()
    assert data["id"] == property_id
    assert "name" in data
    assert "client_id" in data
    assert "created_at" in data


@pytest.mark.asyncio
async def test_search_taxonomy(client: AsyncClient) -> None:
    """Test searching plant taxonomy."""
    response = await client.get("/api/v1/properties/taxonomy/search?q=hydrangea")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        plant = data[0]
        assert "id" in plant
        assert "botanical_name" in plant
        assert "common_name" in plant


@pytest.mark.asyncio
async def test_add_living_asset(client: AsyncClient) -> None:
    """Test adding a living asset to a property."""
    # First create a property
    property_data = {
        "name": "Test Property",
        "client_id": 1,
        "city": "Saint Paul",
        "state": "MN",
    }
    create_response = await client.post("/api/v1/properties/", json=property_data)
    property_id = create_response.json()["id"]
    
    # Now add an asset (using plant_taxon_id 1 from seed data)
    asset_data = {
        "plant_taxon_id": 1,
        "location_note": "Front yard, near entrance",
        "health_status": "healthy",
    }
    
    response = await client.post(f"/api/v1/properties/{property_id}/assets", json=asset_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["property_id"] == property_id
    assert data["plant_taxon_id"] == asset_data["plant_taxon_id"]
    assert "id" in data

