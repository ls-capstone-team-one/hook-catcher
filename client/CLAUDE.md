# Request Bin

React + TypeScript front-end built with Vite. The backend is built by a separate team and exposes a RESTful API. This project is inspired by [request-baskets](https://github.com/darklynx/request-baskets).

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint

## Conventions

- **Fetch**: Use the native `fetch` API, not Axios
- **Routing**: React Router v7 declarative mode with `BrowserRouter`
- **Path alias**: `@/` maps to `src/`
- **Project structure**: Feature-based layout under `src/features/[feature-name]/` with `components/`, `hooks/`, `api/`, and `types.ts` per feature
- **Components**: Use shadcn/ui — add components via `npx shadcn@latest add <component>`. Do not install raw Radix packages directly.
- **Formatting**: Prettier (config in `.prettierrc`). Do not add formatting rules to ESLint.
- **Linting**: ESLint with Airbnb Extended config (flat config in `eslint.config.js`)
- **Testing**: Not yet set up
- **Charter**: Full project decisions and rationale are in `docs/project-charter.md`
