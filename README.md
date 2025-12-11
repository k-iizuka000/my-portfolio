This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3030](http://localhost:3030) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# my-portfolio

## Docker開発環境

### セットアップ

```bash
docker compose up
```

### よく使うコマンド

| 操作 | コマンド |
|------|---------|
| 開発サーバー起動 | `docker compose up` |
| バックグラウンド起動 | `docker compose up -d` |
| 停止 | `docker compose down` |
| 再ビルド＆起動 | `docker compose up --build` |
| ビルド | `docker compose exec app npm run build` |
| Lint | `docker compose exec app npm run lint` |
| パッケージ追加 | `docker compose exec app npm install <pkg>` |
| シェル接続 | `docker compose exec app sh` |
| キャッシュクリア | `docker compose down -v` |
