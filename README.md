# Portfolio Project

A full-stack portfolio built with React, Tailwind CSS, and an ASP.NET Core backend.

## Project structure

- `client/`: React + Vite frontend with Tailwind CSS
- `server/`: ASP.NET Core (C#) minimal API backend

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [.NET SDK](https://dotnet.microsoft.com/download) 8.0+

## Setup

1. Install client dependencies:
   ```bash
   cd client
   npm install
   ```
2. Restore server dependencies:
   ```bash
   cd ../server
   dotnet restore
   ```

## Run locally

- Start the backend (runs on `http://localhost:5080`):
  ```bash
  cd server
  dotnet run
  ```
- Start the frontend:
  ```bash
  cd client
  npm run dev
  ```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`. API requests to `/api/*` are proxied to the ASP.NET Core backend during development.

## API endpoints

- `GET /api/about` — about section content
- `GET /api/skills` — list of skills
- `GET /api/projects` — project listings
- `GET /api/projects/{id}` — a single project
- `POST /api/contact` — contact form submission endpoint

## Deployment

Vercel does not run ASP.NET Core apps directly, so the frontend and backend are deployed separately:

- **Client**: deployed to Vercel as a static site using the included `vercel.json` (builds `client/` to `client/dist`).
- **API**: deployed to [Render](https://render.com) as a Docker web service, built from `server/Dockerfile`.

### API on Render

1. New "Web Service" → connect the `vncvrmd/portfolio` GitHub repo.
2. Root directory: `server`. Environment: Docker (uses `server/Dockerfile`).
3. Instance type: Free.
4. Add an environment variable `AllowedOrigins` set to the deployed Vercel client URL (comma-separate multiple origins if needed).
5. Render provides the container a `PORT` env var automatically — the app already binds to it.

Render's free tier spins down after 15 minutes of inactivity, so the first request after idling can take ~30 seconds while it wakes up.

### Client on Vercel

1. Import the `vncvrmd/portfolio` GitHub repo into Vercel (uses the root `vercel.json`, which builds `client/`).
2. Add an environment variable `VITE_API_BASE_URL` set to the deployed Render API's base URL (e.g. `https://portfolio-api.onrender.com`).
3. Redeploy after setting the variable so the client build picks it up.

## Features

- Responsive portfolio landing page
- About section with graduation and skills summary
- Skills section with technology badges
- Projects section powered by the ASP.NET Core backend
- Contact form using a minimal API endpoint
- Tailwind CSS styling
- Vercel deployment configuration for the client
