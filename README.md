# Technovation Ventures frontend

The existing website now runs on Nuxt 4 and Vue 3. The original styles, imagery, content, responsive layouts, and animations are retained.

## Development

Use Node.js 22.12 or newer (Node 22 LTS recommended).

```sh
npm install
npm run dev
```

Open http://localhost:8443.

```sh
npm run typecheck
npm run build
npm run preview
```

For static hosting, run `npm run generate` and deploy `.output/public`. For Node hosting, run `node .output/server/index.mjs` after `npm run build`. `dist/` and the existing ZIP/TAR archives are legacy React builds; they are not the new deployment output.

## Structure

- `nuxt.config.ts`: Nuxt, Tailwind, metadata, and rendering configuration.
- `app/pages/`: Nuxt file-based routes; `app/app.vue` renders the active page.
- `src/`: native Vue components authored in TSX, page data, animation composables, and the original CSS. TSX preserves the existing markup; there is no React runtime or compatibility layer.
- `public/`: unchanged branding, photographs, project images, and partner assets.
- `tests/frontend.spec.ts`: route, menu, motion, project explorer, and Code Centre regression checks.

Routes: `/`, `/about`, `/projects`, `/portfolio`, `/products`, and `/code-centre`. `/history` redirects to `/about#history` (or retains a supplied anchor). Products keeps the existing project-page layout and product-section scroll. Unknown URLs retain the previous home-page fallback.

The frontend remains client-rendered (`ssr: false`) to preserve the existing browser-based animations and storage behavior. Code Centre drafts still use session storage; locally saved posts still use local storage with the same keys. Backend APIs, shared publishing, authentication, and database persistence are intentionally deferred to the next stage. Nuxt's server runtime is available when that work begins.

## Browser checks

Start the app, then run `npx playwright test`. Tests use `/usr/bin/google-chrome` by default; set `CHROME_PATH` for a different Chrome/Chromium executable. Set `TEST_BASE_URL` to test another running instance.

## Code Centre backend (SQLite + admin publishing)

The Code Centre now reads published posts from the Nuxt server API instead of browser `localStorage`. Public visitors do not need accounts. Publishing is restricted to authenticated admins at `/admin/login`.

### Important deployment note

The backend requires a running Nitro/Node server; `npm run generate` alone is not enough for admin/API functionality. Build with `npm run build` and run the generated server according to your host's Nuxt/Nitro instructions.

SQLite also needs persistent disk storage in production. Do not deploy this database to an ephemeral/serverless filesystem unless the host explicitly provides persistent storage for the SQLite file. PostgreSQL can be substituted later if the hosting platform requires it.

# technovation-website
