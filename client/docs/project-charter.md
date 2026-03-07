## Project Intent
Practice Front-end development by building the front-end of a "RequestBasket" app.  This project is inspired by the one created by darklynx (https://github.com/darklynx/request-baskets).  The backend is being built by another team, with a RESTful API.

## Dependencies
Runtime dependencies:
  - React
  - ReactRouter
  - Zod: Use if possible, but don't use it if it becomes too cumbersome to learn it along with everything else
  
  Not a dependency:
  - Fetch (use the built-in API, not Axios)

Avoiding these dependencies for now:
- React Hook Form: Simpler, more declarative forms with schema validation by Zod
- A data-fetching solution such as TanStack Query or useSWR: definitely the more robust option, but skipping for now because we don't have that skillset yet

Development dependencies:
  - Vite
  - TypeScript
  - Husky pre-commit hooks to enforce:
	  - testing
	  - linting
	  - formatting
  - ESLint for linting TS, React, imports, general code quality.  These plugins are installed by Vite when creating a React + TS project:
	  - `@typescript-eslint/eslint-plugin` 
	  - `eslint-plugin-react-hooks`
  - Prettier (VSCode plugin) for formatting
  - shadcn-ui (component library built on RadixUI)
### React Router
We're using v7 "Declarative Mode", including the `BrowserRouter` provider.: https://reactrouter.com/start/declarative/installation

## Testing
TBD if automated testing will be implemented at this stage.  May stick with manual testing for now.

## Project Layout
Generally inspired by modern best practices as defined by [Bulletproof React](https://github.com/alan2207/bulletproof-react), with some simplifications that are more inline with the tutorials on FullStackOpen.com/en
```
project-root/
│
├── src/
│    ├── assets/                 # Subfolders for CSS, images, etc
│    ├── vite-env.d.ts           # Augment ImportMetaEnv for typed env vars
│    ├── main.tsx                # ReactDOM.createRoot, BrowserRouter wraps <App />
│    │
│    ├── app/
│    │   ├── App.tsx             # Top-level component, wraps providers + router
│    │   └── routes.tsx          # ReactRouter route definitions
│    │
│    ├── config/
│    │   └── env.ts              # Import .env vars, make available to App [1]
│    │
│    ├── components/
│    │   └── ui/                 # shadcn/ui generated components (Button, Input, etc.)
│    │
│    ├── features/
│    │   └── [feature-name]/     # One folder per feature (e.g., auth, projects)
│    │       ├── components/     # Feature-scoped components
│    │       ├── hooks/          # Feature-scoped hooks (useLogin, useProjects, etc.)
│    │       ├── api/            # Fetch wrappers per endpoint (get-projects.ts, etc.)
│    │       └── types.ts        # Feature-specific types (+ Zod schemas later)
│    │
│    ├── hooks/                  # Shared custom hooks (useDebounce, useLocalStorage, etc.)
│    │
│    ├── lib/
│    │   ├── api-client.ts       # Thin fetch wrapper (base URL, headers, error handl) [2]
│    │   └── utils.ts            # cn() helper from shadcn, other shared utilities [3]
│    │
│    └── types/                  # Shared/global types (User, ApiError, etc.)
│    
├── .env                        # Shared env (all environments)
├── .env.development            # Dev env (e.g., VITE_API_URL=http://localhost:8000/api)
├── .env.production             # Prod-specific env
├── .gitignore
├── .husky/                     # Git hooks
├── .prettierrc                 # Prettier (formatting) config
├── eslint.config.js            # ESLint flat config (Vite template default)
├── index.html                  
├── package.json
├── tsconfig.json               
├── tsconfig.app.json           # TS configs for the React App, incl. the @/ path alias
├── tsconfig.node.json          # TS configs for Vite (app build tooling)
├── vite.config.ts              # Includes @/ resolve alias
├── components.json             # shadcn/ui config (created by npx shadcn@latest init)
├── tailwind.config.ts          # Tailwind config (shadcn sets this up)
└── postcss.config.js           # Required by Tailwind
```
Notes on the above filetree:
- `[1]` [Bulletproof React - src/config/env.ts](https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/config/env.ts)
- `[2]`  "When your application interacts with either RESTful or GraphQL APIs, it is beneficial to use a single instance of the API client that has been pre-configured and can be reused throughout the application. " [Bulletproof React "API Layer"](https://github.com/alan2207/bulletproof-react/blob/master/docs/api-layer.md)
- `[3]` Short version: the `cn` helper inside `src/lib/utils`  is required for proper functioning of shadcn components.  Long version: the `cn` helper is described in a couple of locations:  [shadcn 'cn helper' in the "Installation manual"](https://ui.shadcn.com/docs/installation/manual), [shadcn CLI Reference](https://ui.shadcn.com/docs/cli#init).  It combines the `tailwind-merge` library ([github](https://github.com/dcastil/tailwind-merge/?tab=readme-ov-file)) and the `clsx` library ([github](https://github.com/lukeed/clsx?tab=readme-ov-file#tailwind-support)) to enable conflict resolution for CSS class strings, and conditionally applying classes to a given component.



## Scaffolding Sequence (tentative, per Claude)
==Written by Claude, QC'ed by steven, have not actually used yet==
### **Step 1** — Create the Vite project

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
```

This gives you React, TypeScript, ESLint (with `@typescript-eslint` and `eslint-plugin-react-hooks` preconfigured), and a dev server.

Docs: https://vite.dev/guide/#scaffolding-your-first-vite-project

### **Step 2** — Configure path aliases

Edit `tsconfig.json` and `tsconfig.app.json` to add the `@/` alias, then update `vite.config.ts` with a matching `resolve.alias`. This is required before shadcn init.

The shadcn Vite installation guide walks through exactly which lines to add to each file, including both tsconfig files and `vite.config.ts`.

Docs: https://ui.shadcn.com/docs/installation/vite (Steps 2 and 3 — "Edit tsconfig" and "Update vite.config.ts")

### **Step 3** — Configure ESLint with "Airbnb Extended"

```bash
npx create-airbnb-x-config
```

Docs: https://github.com/eslint-config/airbnb-extended

### **Step 4** — Install Tailwind CSS + shadcn/ui

```bash
npm install tailwindcss @tailwindcss/vite
npx shadcn@latest init
```

The `shadcn init` command will set up `components.json`, create `src/lib/utils.ts` (the `cn()` helper), configure your CSS with Tailwind imports, and install `clsx` and `tailwind-merge` as dependencies.

Docs: https://ui.shadcn.com/docs/installation/vite (Steps 4 and 5 — "Install Tailwind" and "Run shadcn init")

### **Step 5** — Set up Prettier + eslint-config-prettier

```bash
npm install --save-dev prettier eslint-config-prettier
```

Create a `.prettierrc` in the project root:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

Then add `eslint-config-prettier` to your ESLint config so that ESLint's formatting rules don't conflict with Prettier. In the Vite-generated `eslint.config.js`, you'd extend it with the prettier config.

This is a pretty minimal config.  Some teams simply use the prettier defaults.

Docs:
- Prettier installation: https://prettier.io/docs/install
- eslint-config-prettier (disables conflicting ESLint rules): https://github.com/prettier/eslint-config-prettier

### **Step 6** — Set up Husky + lint-staged

```bash
npm install --save-dev husky lint-staged
npx husky init
```

`husky init` creates a `.husky/` directory and a `pre-commit` hook file. Edit `.husky/pre-commit` to run lint-staged:

```bash
npx lint-staged
```

Add lint-staged config to `package.json`:

```json
{
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```

This runs ESLint and Prettier on staged files before every commit.

Docs:
- Husky: https://typicode.github.io/husky/get-started.html
- lint-staged: https://github.com/lint-staged/lint-staged

### **Step 7** — Install React Router and Zod

```bash
npm install react-router zod
```

Docs:

- React Router declarative mode: https://reactrouter.com/start/declarative/installation
- Zod: https://zod.dev/

### **Step 8** — Create the folder structure and base files

This is the manual part — create the directories and starter files:

- `src/app/App.tsx`, `src/app/routes.tsx`
- `src/config/env.ts`
- `src/lib/api-client.ts`
- `src/features/`, `src/hooks/`, `src/types/`
- `.env`, `.env.development`, `.env.production`, `.env.example`
- Wire up `BrowserRouter` in `main.tsx`

One note: Step 2 (path aliases) is listed separately from Step 4 (shadcn init) because the shadcn Vite guide explicitly requires the aliases to be configured before running `shadcn init`. If you skip it, the init will fail or misconfigure the import paths.