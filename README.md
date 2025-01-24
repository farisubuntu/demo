This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Use it as a template that supports:

- `nextjs` with `App Router` and `Route Handler` API endpoint.
- `Neon` as `postgresql` Provider.
- `tailwindcss` support
- `shadcn` components.
- `swr` as client fetcher library.

## Prepare db

- Create new project in [https://console.neon.tech](https://console.neon.tech) then copy `database` Connection parameters, then paste it inside a new `.env` file.

```sh
DIRECT_URL='postgresql://XXXXXXX...'
```

- Create 'users' table:

```sql
CREATE TABLE IF NOT EXISTS users (
 user_id serial primary key,
 name varchar(255),
 email varchar(255) not null unique
);
```

## Folder Structure

```bash
nextjs-neon-app/
├─ app/
│   ├── api/
│   │   ├─ users/
│   │   │   ├─ route.ts
│   │   │   └─ [id]/
│   │   │       └ route.ts
│   ├── page.tsx
├─ components/
│   ├── ui/
│   │   ├─ button.tsx
│   │   ├─ input.tsx
│   │   ├─ table.tsx
│   │   └─ card.tsx
├─ lib/
│   ├── db.ts
│   └── fetcher.ts
├─ .env
├─ tailwind.config.ts
├─ postcss.config.js
└─ package.json
```

This setup uses SWR for client-side data fetching, postgres for direct database interaction, and Neon as the hosted PostgreSQL provider. It also includes TailwindCSS and shadcn/ui for styling and components.
