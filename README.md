# Better Resume

A modern Farsi (RTL) resume/portfolio website with a .NET API backend and React frontend.

## Tech Stack

- **Backend:** .NET 10 Web API, EF Core, SQL Server, JWT Auth
- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS v4, Zustand

## Getting Started

### Prerequisites

- .NET 10 SDK
- Node.js 18+
- SQL Server LocalDB (included with Visual Studio) or SQL Server Express

### Backend

```bash
cd backend
dotnet run
```

API runs at `http://localhost:5122`. Swagger UI: `http://localhost:5122/swagger`

Default admin credentials:
- Username: `admin`
- Password: `password123`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Project Structure

```
backend/
  Models/          # EF Core entities
  Data/            # DbContext & migrations
  Controllers/     # Public & admin API endpoints
  Services/        # JWT, auth, data seeder
frontend/
  src/
    api/           # Axios client & API services
    components/    # Reusable UI components
    pages/         # Public resume & admin panel
    stores/        # Zustand state (auth, theme)
```

## Features

- Public resume page (no auth) with glassmorphism bento-grid layout
- RTL Persian UI with Vazirmatn font
- Light/dark theme toggle
- Admin panel at `/admin` with JWT authentication
- CRUD for all resume sections + avatar upload
