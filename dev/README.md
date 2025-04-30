This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, create a .env file:

```bash
NEXT_PUBLIC_CLIENT_ID= # An Application Client Id from Airbyte
NEXT_PUBLIC_CLIENT_SECRET= # An Application Client Secret from Airbyte
NEXT_PUBLIC_WORKSPACE_ID= # A workspace id from your Airbyte instance, used to fetch embedded token
NEXT_PUBLIC_AIRBYTE_PUBLIC_API_URL= # Public API entrypoint IE: https://api.cloud.airbyte.com or https://local.airbyte.dev/api/public
```

You can optionally include `NEXT_PUBLIC_ALLOWED_ORIGIN` if you would like to override the allowed origin returned from the Airbyte server (for example, if you are running a locally served version of the webapp)

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3003](http://localhost:3003) in your browser to see the result.
