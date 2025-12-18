## Chlorophyll Monorepo

Chlorophyll: Botanical Intelligence ERP  
Chlorophyll is a specialized Enterprise Resource Planning (ERP) system designed to bridge the gap between biological cycles and business operations. Specifically engineered for high-touch, professional gardening firms, Chlorophyll replaces generic, static service management tools with a biologically-aware platform that treats the garden as a living, evolving asset.

While traditional software schedules work based on rigid calendar dates, Chlorophyll utilizes **Phenological Intelligence**. By integrating real-time meteorological data and Growing Degree Days (GDD), the system aligns horticultural maintenance with the actual development stages of plants and pests. This ensures that every action—from pre-emergent application to precision pruning—is performed at the peak of biological efficacy.

**Core Mission**  
The goal of Chlorophyll is to empower gardening businesses to move from reactive maintenance to predictive stewardship. It serves as the digital **“Botanical Brain”** of the company, translating complex environmental variables into clear, actionable workflows for field crews and high-value insights for clients.

**Key Pillars**
- **The Living Asset Registry**: A property-first CRM where every plant is tracked as a unique asset with its own history, health status, and care requirements.
- **Thermal Accumulation Logic**: Automated task generation triggered by local weather data and GDD thresholds rather than the “best guess” of a calendar.
- **The Minnesota Pivot**: Specialized logic built for extreme seasonal transitions (USDA Zone 4), managing everything from “False Springs” to critical winterization protocols.
- **Fiscal Precision**: A built-in compliance engine that automatically navigates complex regional tax laws (such as the MN Sales Tax split between maintenance and capital improvements).
- **Garden Stewardship Portals**: Transforming standard invoicing into “Garden Journals”—visual, data-rich reports that document the growth, health, and value appreciation of the client's landscape.

Horticultural ERP for managing **living assets**, organized as a simple monorepo:

- `backend`: FastAPI + SQLAlchemy + Celery / Redis for the API and \"Botanical Brain\" logic
- `frontend`: Next.js (App Router) + Tailwind CSS for the web UI

### Backend (FastAPI)

- API surface grouped by bounded context under `app/api/v1`:
  - `properties`: Property & Horticulture Service (property registry, living assets, taxonomy)
  - `phenology`: Phenological engine (GDD tracking, work triggers, frost alerts)
  - `logistics`: Route optimizer and field sync orchestration
  - `fiscal`: Fiscal & compliance (MN tax engine, subscriptions, profitability)
- Logic core / services live under `app/services/*`
- SQLAlchemy models live under `app/models/*`
- Celery app and tasks are under `app/tasks/*`

Run locally:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -e .
uvicorn app.main:app --reload
```

### Frontend (Next.js)

- App Router under `frontend/app`
- Tailwind configured in `tailwind.config.ts` and `app/globals.css`
- Talks to the backend via `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:8000/api/v1`)

Run locally:

```bash
cd frontend
npm install
npm run dev
```


