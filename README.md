# hook-catcher

# HookCatcher Backend

Express + TypeScript backend for HookCatcher, a RequestBin-style webhook capture tool.

### Prerequisites

- Node.js (v18 or later)
- npm

### Setup

1. Clone the repo and install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000` (or whatever `PORT` is set to in `.env`). Nodemon will watch for file changes and restart automatically.

### Available Scripts

| Script          | Description                             |
| --------------- | --------------------------------------- |
| `npm run dev`   | Start dev server with nodemon + ts-node |
| `npm run build` | Compile TypeScript to `dist/`           |
| `npm start`     | Run the compiled JS from `dist/`        |

### Database Setup

[in development]

### Backend Structure

```
src/
├── index.ts          # Server entry point (listen)
├── app.ts            # Express app config and middleware
├── handlers/         # Route handlers (controllers)
├── services/         # Business logic
├── db_connections/   # Database queries (PostgreSQL + MongoDB)
```

**Handler → Service → Repo(db_connections)** — handlers receive HTTP requests and delegate to services, services contain business logic and delegate to repos, repos talk to the databases.
