"""Seed initial data into the database."""
import asyncio

from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

from app.core.config import settings


async def seed_data() -> None:
    """Seed initial plant taxonomy data."""
    engine = create_async_engine(str(settings.database_url), echo=False)

    async with engine.begin() as conn:
        # Insert sample plant taxonomy
        await conn.execute(
            text("""
                INSERT INTO plant_taxonomy (botanical_name, common_name, cultivar, is_minnesota_native, gdd_prune_min, gdd_plant_min)
                VALUES
                    ('Hydrangea arborescens', 'Smooth hydrangea', 'Annabelle', true, 50.0, 200.0),
                    ('Acer saccharum', 'Sugar maple', NULL, true, 100.0, 300.0),
                    ('Quercus macrocarpa', 'Bur oak', NULL, true, 150.0, 400.0),
                    ('Echinacea purpurea', 'Purple coneflower', NULL, true, NULL, 250.0),
                    ('Asclepias tuberosa', 'Butterfly weed', NULL, true, NULL, 300.0)
                ON CONFLICT DO NOTHING;
            """)
        )
        print("✅ Seeded plant taxonomy data")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed_data())

