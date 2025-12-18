## Chlorophyll Backend

FastAPI + SQLAlchemy + Celery backend for the Chlorophyll horticultural ERP.

### Layout

- `app/core`: configuration, logging, and shared utilities  
- `app/api`: FastAPI routers for each bounded context (properties, phenology, logistics, fiscal)  
- `app/models`: SQLAlchemy models and metadata  
- `app/services`: domain services / \"Botanical Brain\" logic  
- `app/db`: database session and base class  
- `app/tasks`: Celery configuration and task modules  

### Running locally

1. Create a virtualenv and install dependencies:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # on Windows: .venv\\Scripts\\activate
pip install -e .
```

Or with `uv`/`pip` directly:

```bash
pip install -r requirements.txt
```

2. Set environment variables (or create an `.env` file):

- `DATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/chlorophyll`
- `REDIS_URL=redis://localhost:6379/0`

3. Run the API:

```bash
uvicorn app.main:app --reload
```

4. Run Celery workers:

```bash
celery -A app.tasks.celery_app worker -l info
```


