<!--
 @since 2024.12.01, 07:56
 @changed 2025.05.30, 15:24
-->

# Team Tree. A simple hierarchical data editor

[**Team Tree App**](https://team-tree-app.vercel.app) is a small fullstack Next.js Vercel-hosted application aimed for editing hierarchical data with a nice pack of basic features, could serve as a starting point for a following Next.js project.

At the moment, the data model is limited to working with only one string field, but it can be easily expanded.

The application was created by order of my friends, who needed quick access to hierarchical data in their work process.

![Application banner](public/static/opengraph-image.jpg 'Application banner')

## Build info (auto-generated)

- Project info: v.0.0.12 / 2025.05.30 15:13:21 +0300

## Resources

- Vercel deployment: https://team-tree-app.vercel.app/
- Repository: https://github.com/lilliputten/team-tree-app/
- Project notes: https://lilliputten.com/projects/2025/team-tree-app/

## Workspace

Core resources:

- The entry point (nextjs app): [src/app/page.tsx](src/app/page.tsx).
- Data editor page: [src/app/[locale]/data/DataPage.tsx](src/app/[locale]/data/DataPage.tsx).
- Prisma database schema: [prisma/schema.prisma](prisma/schema.prisma).
- Prisma provider switcher: [prisma-switch.mjs](prisma-switch.mjs)
- IIS config file: [web.config](web.config)
- IIS entry point: [iisnode-nextjs-entry.js](iisnode-nextjs-entry.js)

## Installation

Just run `pnpm install --frozen-lockfile` to install all the dependencies.

Set up local [environent variables](#environent-variables) (not required).

## Environent variables

The application environent variables could be provided by the environment (from github actions or vercel environment setup) or be set in the local `.env` file (see a template in [.env.SAMPLE](.env.SAMPLE));

- `NEXTAUTH_URL`: Public application url (provided by tunnelling service or a real one) for next-auth.
- `NEXT_PUBLIC_APP_URL`: Public application url (provided by tunnelling service or a real one) for associated telegram bot.
- `BOT_TOKEN`: The telegram bot token.
- `BOT_USERNAME`: The telegram bot name.
- `USER_REQUIRED`: Is user required to access the data? If set off the 'anonymous mode' is allowed.
- `DATABASE_URL`: Prisma database url (sqlite for a local development, and postgres for vercel production).
- `AUTH_SECRET`: Basic secret for security-related subsystems.
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `GITHUB_OAUTH_TOKEN`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `YANDEX_CLIENT_ID`, `YANDEX_CLIENT_SECRET`: Supported auth providers credentials.

## Telegram bot

There is associated telegram bot exists. Currently it only helps authorize via telegram account and provides some basic information on your data usage in the application.

## Local development

Run local development server via a command:

```bash
pnpm dev
```

-- It will start server app locally, on port 3000.

## Maintenance tools

Run prettier and all the linters:

```bash
pnpm check-all
```

Run tests:

```bash
pnpm test
```

See [NextJS original readme file](README.nextjs.md).

## IIS Deployment support

It's possible to host the application on IIS server

See project files:

- IIS config file: [web.config](web.config)
- IIS entry point: [iisnode-nextjs-entry.js](iisnode-nextjs-entry.js)

See also [IIS iisnode extension readme](README.iisnode.md).

## Prisma ORM & models

See data schema in [prisma/schema.prisma](prisma/schema.prisma)

Automatical prisma provider switcher (switches the provider to postgres on vercel deploy): [prisma-switch.mjs](prisma-switch.mjs)

## See also

- [Changelog](CHANGELOG.md)
