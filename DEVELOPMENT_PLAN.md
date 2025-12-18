# Chlorophyll Development Plan

## Current State Assessment

### ✅ What's Done
- **Infrastructure**: Docker Compose (Postgres, Redis), project structure
- **Backend API**: FastAPI routes scaffolded (properties, phenology, logistics, fiscal)
- **Database Models**: SQLAlchemy models defined (Property, LivingAsset, PlantTaxon, WeatherReading, WorkOrder)
- **Frontend**: Landing page with branding
- **Testing**: Basic test suite (8 tests passing)
- **Configuration**: Environment setup, settings management

### ⚠️ What's Placeholder
- **Services**: All services return mock data (no DB persistence)
- **Database**: Models exist but no migrations, no actual tables
- **Frontend**: Only landing page (no app features)
- **Authentication**: None implemented
- **Weather/GDD**: No real integration yet

---

## Development Phases

### 🎯 Phase 1: Foundation (Weeks 1-2)
**Goal**: Get real data persistence working

#### 1.1 Database Setup & Migrations
- [ ] Set up Alembic migrations
- [ ] Create initial migration from existing models
- [ ] Run migrations to create tables
- [ ] Add seed data (sample properties, plant taxonomy)
- **Why First**: Everything else depends on real data storage

#### 1.2 Connect Services to Database
- [ ] Update `PropertyService` to use real DB queries
- [ ] Implement CRUD operations with SQLAlchemy
- [ ] Add proper error handling (404s, validation)
- [ ] Update tests to use test database
- **Why Next**: Makes the API actually functional

#### 1.3 Basic Frontend - Property Management
- [ ] Create `/properties` page (list view)
- [ ] Create `/properties/[id]` page (detail view)
- [ ] Add form to create new property
- [ ] Connect to backend API
- **Why**: First real user-facing feature, validates full stack

**Deliverable**: Can create, view, and manage properties through the UI

---

### 🌱 Phase 2: Living Assets (Weeks 3-4)
**Goal**: Track plants on properties

#### 2.1 Living Assets Backend
- [ ] Implement full CRUD for living assets
- [ ] Add relationship queries (assets by property)
- [ ] Add plant taxonomy search/selection
- [ ] Add health status tracking

#### 2.2 Living Assets Frontend
- [ ] Property detail page shows living assets
- [ ] Add/remove assets from property
- [ ] Plant taxonomy search/autocomplete
- [ ] Health status indicators

**Deliverable**: Can track individual plants on each property

---

### 🌡️ Phase 3: Phenology Engine (Weeks 5-6)
**Goal**: Real GDD tracking and weather integration

#### 3.1 Weather Data Integration
- [ ] Integrate with National Weather Service API
- [ ] Store daily weather readings
- [ ] Calculate GDD (Growing Degree Days)
- [ ] Celery task to sync weather daily

#### 3.2 GDD Dashboard
- [ ] Backend endpoint for current GDD status
- [ ] Frontend dashboard showing GDD accumulation
- [ ] Historical GDD charts
- [ ] Regional comparisons

#### 3.3 Work Order Generation
- [ ] Logic to check GDD thresholds vs plant requirements
- [ ] Generate work orders when thresholds met
- [ ] Work order model/API endpoints
- [ ] Frontend work order list

**Deliverable**: System automatically generates work orders based on phenology

---

### 🚚 Phase 4: Field Operations (Weeks 7-8)
**Goal**: Route optimization and field crew management

#### 4.1 Route Optimization Backend
- [ ] Implement route optimization algorithm
- [ ] Daily route planning endpoint
- [ ] Multi-property route generation
- [ ] Travel time calculations

#### 4.2 Field Crew Interface
- [ ] Mobile-friendly route view
- [ ] Work order checklist
- [ ] Photo upload for work completion
- [ ] Offline capability (PWA)

**Deliverable**: Crews can efficiently navigate and complete work

---

### 💰 Phase 5: Fiscal & Billing (Weeks 9-10)
**Goal**: Minnesota tax compliance and invoicing

#### 5.1 Tax Engine
- [ ] MN sales tax logic (maintenance vs capital)
- [ ] Service categorization
- [ ] Tax calculation endpoints

#### 5.2 Invoicing
- [ ] Invoice generation
- [ ] PDF generation
- [ ] Client billing history
- [ ] Payment tracking

#### 5.3 Garden Journals
- [ ] Transform invoices into visual journals
- [ ] Before/after photos
- [ ] Growth tracking
- [ ] Client portal view

**Deliverable**: Automated, compliant billing with beautiful client reports

---

### 🔐 Phase 6: Authentication & Multi-tenancy (Weeks 11-12)
**Goal**: Secure, multi-user system

#### 6.1 Authentication
- [ ] User model and registration
- [ ] JWT authentication
- [ ] Login/logout endpoints
- [ ] Password reset

#### 6.2 Authorization
- [ ] Role-based access (admin, crew, client)
- [ ] Property ownership/permissions
- [ ] API route protection

#### 6.3 Frontend Auth
- [ ] Login page
- [ ] Protected routes
- [ ] User profile
- [ ] Session management

**Deliverable**: Secure, multi-user application

---

## Recommended Next Steps (Priority Order)

### 🚀 Immediate (This Week)
1. **Set up Alembic migrations** (2-3 hours)
   - Initialize Alembic
   - Create first migration from models
   - Run migration to create tables

2. **Connect PropertyService to database** (4-6 hours)
   - Inject database session
   - Implement real CRUD
   - Update tests

3. **Simple properties list page** (3-4 hours)
   - Frontend page fetching from API
   - Display properties in a table/cards
   - Basic styling

### 📅 Short Term (Next 2 Weeks)
4. **Property detail page** with living assets
5. **Add living asset functionality**
6. **Plant taxonomy search**

### 🎯 Medium Term (Next Month)
7. **Weather API integration**
8. **GDD calculation and storage**
9. **Work order generation logic**

---

## Technical Debt & Improvements

### High Priority
- [ ] Add database indexes for performance
- [ ] Add request validation/error handling
- [ ] Add logging/monitoring
- [ ] Add API rate limiting
- [ ] Improve test coverage (currently ~60%)

### Medium Priority
- [ ] Add API versioning strategy
- [ ] Add OpenAPI documentation improvements
- [ ] Add database connection pooling
- [ ] Add caching layer (Redis)
- [ ] Add background job monitoring

### Low Priority
- [ ] Add API pagination
- [ ] Add filtering/sorting
- [ ] Add export functionality (CSV, PDF)
- [ ] Add admin dashboard

---

## Success Metrics

### Phase 1 Success
- ✅ Can create property via API
- ✅ Can view property in database
- ✅ Can see properties in UI
- ✅ All tests passing

### Phase 2 Success
- ✅ Can add plants to properties
- ✅ Can search plant taxonomy
- ✅ Can track plant health

### Phase 3 Success
- ✅ Weather data syncing daily
- ✅ GDD calculated correctly
- ✅ Work orders auto-generated

---

## Questions to Answer

Before diving deep, consider:
1. **Who are the primary users?** (Field crews? Office staff? Clients?)
2. **What's the MVP?** (What's the minimum to get a pilot customer?)
3. **Data sources?** (Do you have existing property/client data?)
4. **Deployment target?** (Cloud? Self-hosted? Mobile app needed?)

---

## Resources Needed

### External APIs
- National Weather Service API (free)
- Mapping/routing (Google Maps API or OpenStreetMap)
- Payment processing (Stripe, Square, etc.)

### Data Sources
- Plant taxonomy database (USDA? Custom?)
- USDA zone data
- Historical weather data

---

## Notes

- **Start small**: Get one feature fully working end-to-end before adding more
- **Test as you go**: Don't let test coverage slip
- **User feedback**: Get real users testing early (even if it's just you)
- **Iterate**: The plan will change as you learn what works

