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
