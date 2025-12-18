"""Tests for system endpoints."""
from datetime import datetime

import pytest
from fastapi.testclient import TestClient


def test_health_check(client: TestClient) -> None:
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert "environment" in data


def test_system_info(client: TestClient) -> None:
    """Test the system info endpoint."""
    response = client.get("/api/v1/system/info")
    assert response.status_code == 200
    
    data = response.json()
    
    # Check all required fields are present
    assert "api_version" in data
    assert "environment" in data
    assert "timestamp" in data
    assert "status" in data
    assert "message" in data
    
    # Check field values
    assert data["api_version"] == "0.1.0"
    assert data["status"] == "operational"
    assert data["environment"] == "local"
    assert "Chlorophyll" in data["message"]
    
    # Verify timestamp is valid ISO format
    timestamp = datetime.fromisoformat(data["timestamp"].replace("Z", "+00:00"))
    assert isinstance(timestamp, datetime)

