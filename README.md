# NEXTsocial

Simple NEXT.js web app with social-media functionalities.
Can be used as a base for a bigger application pretty easily.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

You will need a Postgres database and Google OAuth API keys.

First, fill .env file with your variables like so, using .env-example file:

```bash
NEXTAUTH_SECRET=nextauth_secret
GOOGLE_CLIENT_ID=client_id
GOOGLE_CLIENT_SECRET=client_secret
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
SHADOW_DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASESHADOW
```

Then, install dependencies and migrate schema to your database

```bash
npm i
npx prisma migrate dev
```

To run the web app use

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
