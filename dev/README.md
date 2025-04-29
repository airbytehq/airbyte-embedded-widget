This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, create a .env file:

```env
NEXT_PUBLIC_CLIENT_ID=
NEXT_PUBLIC_CLIENT_SECRET=
NEXT_PUBLIC_WORKSPACE_ID=
NEXT_PUBLIC_BASE_URL=
```

You can optionally include `NEXT_PUBLIC_ALLOWED_ORIGIN` if you would like to override the allowed origin returned from the Airbyte server (for example, if you are running a locally served version of the webapp)

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
