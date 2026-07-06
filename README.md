# Portfolio Project

A full-stack portfolio built with React, Tailwind CSS, and a Node.js backend.

## Project structure

- `client/`: React + Vite frontend with Tailwind CSS
- `server/`: Node.js + Express backend API

## Setup

1. Install client dependencies:
   ```bash
   cd client
   npm install
   ```
2. Install server dependencies:
   ```bash
   cd ../server
   npm install
   ```

## Run locally

- Start the backend:
  ```bash
  npm run dev
  ```
- Start the frontend:
  ```bash
  cd ../client
  npm run dev
  ```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## API endpoints

- `GET /api/about` — about section content
- `GET /api/skills` — list of skills
- `GET /api/projects` — project listings
- `POST /api/contact` — contact form submission endpoint

## Deployment

This project includes a `vercel.json` configuration for deployment to Vercel.

From the repository root:

```bash
npx vercel --prod
```

Vercel will build the frontend from `client/` and route API calls to `server/index.js`.

## Features

- Responsive portfolio landing page
- About section with graduation and skills summary
- Skills section with technology badges
- Projects section powered by the Node.js backend
- Contact form using Express API
- Tailwind CSS styling
- Vercel deployment configuration
