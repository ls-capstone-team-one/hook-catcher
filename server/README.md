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

- PostgreSQL stores relational data about created bins and incoming requests stored in them.
- MongoDB stores the raw webhook request payloads as blobs.

Connection files for both databases are in `src/db_connections`, each in their corresponsing subdirectories.

#### Environment Variables

1. Create a `.env` file in the `server` root of the project (listed under `.gitignore` - never commit). `.env.example` can be used as a template. Connection modules use default values when the environment variables have not been set. To copy the development content directly from `.env.example` to `.env`:

   ```bash
      cp .env.example .env
   ```

#### Running databases locally

1. To install and run PostgreSQL:

   ```bash
   brew install postgresql
   brew services start postgresql
   ```

2. To install and run MongoDB:

   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

3. To ensure both databases are running:
   ```bash
   brew services list
   ```

Both `postgresql` and `mongodb-community` should be listed with a status of `started` after the above command is run.

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
