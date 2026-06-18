# Restaurant Profit Optimization System

A full-stack analytics platform that turns raw restaurant sales data into actionable profit decisions. The system ingests transaction-level sales data, computes 27 KPIs and 10 analytical views in PostgreSQL, serves them through a Spring Boot REST API, and presents them through both a React dashboard and a Power BI report — including a rule-based engine that recommends a concrete action (raise price, promote, review supplier cost, or discontinue) for every menu item.

---

## Why this exists

Restaurant owners usually know their *revenue* but not their *margin*. A best-seller can still be a money-loser if its ingredient cost has crept up, and a high-margin item can go unnoticed if it never gets promoted. This project closes that gap: every menu item is scored against the full dataset's averages, and the system tells you which of four levers to pull, and why.

## What it does

- **Computes 27 KPIs** directly in SQL — total revenue, profit, margin, top/bottom performers, breakdowns by restaurant type, meal type, promotion status, weather, special events, and monthly trend lines.
- **Exposes 10 PostgreSQL views** that pre-aggregate the dataset, so the application layer stays thin and every query is fast.
- **Serves a REST API** (Spring Boot + JPA) over those views, with no business logic duplicated between the database and the backend.
- **Runs a rule-based recommendation engine** that compares each menu item's revenue, profit, margin, volume, and cost variance against dataset-wide averages and assigns one of four actions.
- **Renders a React dashboard** with KPI cards, sortable/searchable menu performance tables, and Recharts visualizations.
- **Ships a Power BI report** for stakeholders who want to explore the same data outside the web app.

## Architecture

```
┌─────────────────┐      ┌──────────────────────┐      ┌─────────────────────┐
│  PostgreSQL      │      │  Spring Boot API      │      │  React (Vite)        │
│                  │      │                       │      │                      │
│  sales table     │◄────►│  Controller           │◄────►│  Dashboard            │
│  27 KPI queries  │      │  Service              │      │  Menu Performance     │
│  10 views        │      │  Repository (JPA)     │      │  Recommendations      │
│                  │      │  DTO mapping          │      │  (Recharts + Axios)   │
└─────────────────┘      └──────────────────────┘      └─────────────────────┘
                                                                  ▲
                                                                  │
                                                          ┌───────┴────────┐
                                                          │   Power BI      │
                                                          │   (.pbix)       │
                                                          └─────────────────┘
```

The backend never recomputes aggregates that the database can already provide. Each PostgreSQL view (`dashboard_summary_v`, `menu_performance_v`, `recommendation_base_v`, etc.) is mapped directly to a read-only JPA entity, so the Controller → Service → Repository → DTO chain stays a thin pass-through rather than a place where logic gets duplicated.

## Tech stack

| Layer | Technology |
|---|---|
| Database | PostgreSQL (raw table + 10 analytical views) |
| Backend | Java 17, Spring Boot 4, Spring Data JPA, Lombok |
| Frontend | React 19, Vite, React Router, Axios, Recharts |
| BI / Reporting | Power BI |
| Data | 10,000-row synthetic restaurant sales dataset |

## The dataset

`archive/restaurant_sales_data.csv` contains 10,000 transaction-level rows, one per menu item sold on a given day, with the following fields:

`date`, `restaurant_id`, `restaurant_type`, `menu_item_name`, `meal_type`, `key_ingredients_tags`, `typical_ingredient_cost`, `observed_market_price`, `actual_selling_price`, `quantity_sold`, `has_promotion`, `special_event`, `weather_condition`

This is rich enough to analyze not just *what* sold, but *why* — promotions, weather, and special events are all first-class fields, which is what makes KPIs 17–23 (promotion/weather/event impact) possible.

## KPIs and views

All 27 KPIs and 10 views live in [`sql/restraunt_project.sql`](sql/restraunt_project.sql). Highlights:

| # | KPI | # | KPI |
|---|---|---|---|
| 1 | Total revenue | 15 | Profit by meal type |
| 2 | Total profit | 16 | Quantity sold by meal type |
| 3 | Profit margin (%) | 17 | Revenue with vs. without promotion |
| 4 | Total quantity sold | 18 | Profit with vs. without promotion |
| 5 | Average selling price | 19 | Quantity sold with vs. without promotion |
| 6 | Revenue by menu item | 20 | Revenue by weather condition |
| 7 | Profit by menu item | 21 | Profit by weather condition |
| 8 | Top 10 revenue items | 22 | Revenue during special events |
| 9 | Top 10 profit items | 23 | Profit during special events |
| 10 | Lowest margin items | 24 | Average cost variance |
| 11 | Revenue by restaurant type | 25 | Highest cost variance items |
| 12 | Profit by restaurant type | 26 | Monthly revenue trend |
| 13 | Margin by restaurant type | 27 | Monthly profit trend |
| 14 | Revenue by meal type | | |

The 10 views (`dashboard_summary_v`, `menu_performance_v`, `restaurant_type_analysis_v`, `meal_type_analysis_v`, `promotion_analysis_v`, `weather_analysis_v`, `event_analysis_v`, `cost_variance_v`, `monthly_trends_v`, `recommendation_base_v`) sit on top of the same KPI logic, packaged so the backend can query a single object instead of re-deriving aggregates.

## The recommendation engine

`RecommendationService` pulls every row from `recommendation_base_v`, computes dataset-wide averages for revenue, profit, margin, quantity sold, and cost variance, then evaluates each menu item against four prioritized rules:

| Priority | Condition | Recommendation |
|---|---|---|
| 1 | Revenue above average, margin below average | **Increase price** — selling well, but profit is being left on the table |
| 2 | Profit above average, quantity sold below average | **Promote item** — already profitable, just needs visibility |
| 3 | Cost variance above average | **Review supplier costs** — ingredient cost is drifting from the typical price |
| 4 | Revenue and profit both below average | **Consider removing item** — underperforming on every axis |

Each recommendation ships with a plain-language reason, which is what the `/recommendations` endpoint and the Recommendations page in the frontend display.

## Results from the sample dataset

Numbers from the included 10,000-row dataset, as shown in the Power BI report:

- **Total revenue:** ₹32.71M
- **Total profit:** ₹8.40M
- **Profit margin:** 25.67%
- **Units sold:** ~3M
- **Top performer:** Kaya Toast Set, by both revenue and margin contribution

## API reference

| Method | Endpoint | Returns |
|---|---|---|
| `GET` | `/dashboard/summary` | Total revenue, profit, margin, quantity sold, average selling price |
| `GET` | `/menu/performance` | Revenue, profit, margin, and quantity sold per menu item |
| `GET` | `/recommendations` | Menu item, recommended action, and the reason behind it |

All responses are JSON; no request body or query parameters are required for any endpoint.

## Project structure

```
Restaurant Profit Optimization System/
├── archive/
│   └── restaurant_sales_data.csv        # source dataset (10,000 rows)
├── sql/
│   └── restraunt_project.sql            # schema, 27 KPIs, 10 views
├── backend/
│   └── demo/demo/                       # Spring Boot application
│       └── src/main/java/com/example/demo/
│           ├── controller/              # REST endpoints
│           ├── service/                 # business logic (incl. recommendation rules)
│           ├── repository/              # Spring Data JPA repositories
│           ├── entity/                  # JPA entities mapped to SQL views
│           ├── dto/                     # API response shapes
│           └── config/                  # CORS configuration
├── frontend/
│   └── restaurant-frontend/             # React + Vite application
│       └── src/
│           ├── pages/                   # Dashboard, MenuPerformance, Recommendations
│           ├── components/              # Navbar
│           └── services/                # Axios API client
├── Power Bi/
│   └── Power Bi dashboard.pbix          # standalone BI report
└── Screenshots/                         # dashboard screenshots
```

## Getting started

### Prerequisites

- PostgreSQL 13+
- Java 17 (JDK)
- Maven (or use the included `mvnw` wrapper)
- Node.js 18+ and npm

### 1. Set up the database

```bash
createdb restaurant_project
psql -d restaurant_project -f sql/restraunt_project.sql
```

This creates the `sales` table, computes all 27 KPI queries (for review/validation), and creates the 10 views the backend relies on. Load `archive/restaurant_sales_data.csv` into the `sales` table using `\copy` or your tool of choice before running queries that depend on data.

### 2. Configure and run the backend

The backend reads its database connection from `backend/demo/demo/src/main/resources/application.properties`. **Do not commit real credentials** — replace the values with your own, or better, externalize them:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/restaurant_project
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver
server.port=8080
```

Then run:

```bash
cd backend/demo/demo
./mvnw spring-boot:run
```

The API starts on `http://localhost:8080`.

### 3. Run the frontend

```bash
cd frontend/restaurant-frontend
npm install
npm run dev
```

The app starts on `http://localhost:5173` and is pre-configured (via `CorsConfig.java`) to talk to the backend at `http://localhost:8080`.

### 4. Open the Power BI report (optional)

Open `Power Bi/Power Bi dashboard.pbix` in Power BI Desktop and point it at the same PostgreSQL database, or refresh it against the included CSV.


## Possible extensions

- Authentication on the API so the dashboard isn't open to anyone with the URL
- Pagination on `/menu/performance` once the dataset grows beyond a few hundred items
- A scheduled job to refresh the PostgreSQL views automatically as new sales data lands
- Export recommendations to CSV/PDF for sharing outside the dashboard

## Author

**Avin Mehla**
B.E. Computer Science (AIML), Chandigarh University
[GitHub](https://github.com/avinMehla) · [LinkedIn](https://www.linkedin.com/in/avin-mehla-022945313)
