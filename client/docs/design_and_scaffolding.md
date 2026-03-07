## Project Intent
Practice Front-end development by building the front-end of a "RequestBasket" app.  This project is inspired by the one created by darklynx (https://github.com/darklynx/request-baskets).  The backend is being built by another team, with a RESTful API.

## Dependencies
Runtime dependencies:
  - React v19
  - ReactRouter v7
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
  - Prettier (VSCode plugin and dev dependency for use by commit hooks) for formatting
  - shadcn-ui (component library built on RadixUI)

### React Router
We're using v7 "Declarative Mode", including the `BrowserRouter` provider.: https://reactrouter.com/start/declarative/installation.  Declarative mode is the simplest.  There might be an advantage to using 'Data' mode, but since this is a learning project, let's stick with the simple setup (more info on different modes: https://reactrouter.com/start/modes).  

### ShadCN Theme
It's hard to go wrong, but here's a nice soothing green: https://ui.shadcn.com/create?preset=a1VO1nE

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
```
Notes on the above filetree:
- `[1]` [Bulletproof React - src/config/env.ts](https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/config/env.ts)
- `[2]`  "When your application interacts with either RESTful or GraphQL APIs, it is beneficial to use a single instance of the API client that has been pre-configured and can be reused throughout the application. " [Bulletproof React "API Layer"](https://github.com/alan2207/bulletproof-react/blob/master/docs/api-layer.md)
- `[3]` Short version: the `cn` helper inside `src/lib/utils`  is required for proper functioning of shadcn components.  Long version: the `cn` helper is described in a couple of locations:  [shadcn 'cn helper' in the "Installation manual"](https://ui.shadcn.com/docs/installation/manual), [shadcn CLI Reference](https://ui.shadcn.com/docs/cli#init).  It combines the `tailwind-merge` library ([github](https://github.com/dcastil/tailwind-merge/?tab=readme-ov-file)) and the `clsx` library ([github](https://github.com/lukeed/clsx?tab=readme-ov-file#tailwind-support)) to enable conflict resolution for CSS class strings, and conditionally applying classes to a given component.

## My Scaffolding plan / log

### Setup Vite, React, TS, ShadCN, Tailwind using the ShadCN CLI
Setup ReactRouter using the shadcn CLI
```bash
$ npx shadcn@latest init --preset a1VO1nE --template vite
```



If your filesystem is polluted with [AppleDouble](https://en.wikipedia.org/wiki/AppleSingle_and_AppleDouble_formats) files (files prefixed with `._`), delete them:
```bash
find . -name '._*'  # preview what you're about to delete

# Then use the -delete flag to actually trash em
# find . -name '._*' -delete
```


Configure path aliases in `tsconfig.json`.  As of 2026, `npx shadcn init` (executed in the above step) automatically creates an alias for `~/*`, which can be renamed if you are careful to fix any project references, including in `components.json`.
```json title:tsconfig.json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```


> [!NOTE] This might be necessary for some projects
> Give Vite the ability to resolve imports using TS path mapping 
> ```
> npm install --save-dev vite-tsconfig-paths
> ```
> (more info: https://github.com/aleclarson/vite-tsconfig-paths)


Make sure everything installed correctly
```bash
npm run dev  # verify in your browser
```

Paths still not resolving properly?  Try deleting the `.vite` directory (clearing the Vite cache) and restarting the dev server.

Related: [[TS, VIte Path Aliases]],  [[bulletproof react]]

### Install ReactRouter and other runtime dependencies
```bash
npm i react-router zod
```
No need to configure ReactRouter right now, you can do it later. Docs: https://reactrouter.com/start/declarative/installation

### Install and configure Prettier
Install [Prettier](https://prettier.io/docs/install#set-up-your-editor).  The commented out lines in the below code block are recommended by the Prettier Docs, but ShadCN installer seems to do a better job with those configs.
```bash
npm install --save-dev --save-exact prettier
# node --eval "fs.writeFileSync('.prettierrc','{}\n')"
# node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```
Prettier recommends the `--save-exact` flag:
> If you forget to install Prettier first, npx will temporarily download the latest version. That’s not a good idea when using Prettier, because we change how code is formatted in each release! It’s important to have a locked down version of Prettier in your package.json.

### Install and configure ESLint using "airbnb-extended"
[airbnb-extended](https://github.com/eslint-config/airbnb-extended) provides an ESLint flat-file config (modern as of 2026) that includes support for TypeScript.

Run the automated setup, and make sure you tell the CLI that you're using Prettier!
```bash
npx create-airbnb-x-config
```
More info: 
- Basics: https://eslint-airbnb-extended.nishargshah.dev/config/installation
- Detailed guide: https://eslint-airbnb-extended.nishargshah.dev/cli/guide

For this project, I did:
```bash fold
$ npx create-airbnb-x-config
✔ Config? … Legacy / Extended
✔ Are you using typescript? … No / Yes
✔ Are you using prettier? … No / Yes
✔ Are you using? › React/React Router/Remix
✔ Do you want to add strict configs? … No / Yes
✔ Should I create an eslint.config.mjs file for you? … No / Yes
✔ Do you want to skip the package installation? … No / Yes

Installing packages using npm, please wait...

added 162 packages, and audited 748 packages in 26s

255 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

Installation Completed

Executed Command:
npm install -D eslint @eslint/compat @eslint/js eslint-config-airbnb-extended prettier eslint-plugin-prettier eslint-config-prettier

Created Config:
https://github.com/eslint-config/airbnb-extended/tree/master/apps/build-templates/templates/react/prettier/ts/default/eslint.config.mjs
```

### Install and configure husky with lint-staged
```bash
npm install -D husky lint-staged
npx husky init
```

```bash title:.husky/pre-commit
npx lint-staged
```

```json title:package.json
{
  // ...
  
  "lint-staged": {
    "src/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```
More info:
- Husky: https://typicode.github.io/husky/get-started.html
- lint-staged: https://github.com/lint-staged/lint-staged
### Create folders & files

- [ ] `src/app/routes.tsx`   (tbd, not sure about this one)
- [ ] `src/config/env.ts`
- [ ] `src/lib/api-client.ts`
- `src/features/`, `src/hooks/`, `src/types/`
- [ ] `.env`, `.env.development`, `.env.production`, `.env.example`













