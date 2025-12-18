"""Tests for properties endpoints."""
import pytest
from fastapi.testclient import TestClient


def test_create_property(client: TestClient) -> None:
    """Test creating a property."""
    property_data = {
        "name": "Test Garden",
        "client_id": 1,
        "city": "Saint Paul",
        "state": "MN",
        "postal_code": "55101",
        "usda_zone": "4b",
    }
    
    response = client.post("/api/v1/properties/", json=property_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["name"] == property_data["name"]
    assert data["client_id"] == property_data["client_id"]
    assert data["city"] == property_data["city"]
    assert data["state"] == property_data["state"]
    assert "id" in data


def test_get_property(client: TestClient) -> None:
    """Test getting a property by ID."""
    response = client.get("/api/v1/properties/1")
    assert response.status_code == 200
    
    data = response.json()
    assert data["id"] == 1
    assert "name" in data
    assert "client_id" in data
    assert "created_at" in data


def test_search_taxonomy(client: TestClient) -> None:
    """Test searching plant taxonomy."""
    response = client.get("/api/v1/properties/taxonomy/search?q=hydrangea")
    assert response.status_code == 200
    
    data = response.json()
    assert isinstance(data, list)
    if len(data) > 0:
        plant = data[0]
        assert "id" in plant
        assert "botanical_name" in plant
        assert "common_name" in plant


def test_add_living_asset(client: TestClient) -> None:
    """Test adding a living asset to a property."""
    asset_data = {
        "plant_taxon_id": 1,
        "location_note": "Front yard, near entrance",
        "health_status": "healthy",
    }
    
    response = client.post("/api/v1/properties/1/assets", json=asset_data)
    assert response.status_code == 200
    
    data = response.json()
    assert data["property_id"] == 1
    assert data["plant_taxon_id"] == asset_data["plant_taxon_id"]
    assert "id" in data

