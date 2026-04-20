# Nuxt 3 Chat (Nuxt UI v3)

Минимальный чат-клиент на Nuxt UI v3 без БД и без аутентификации в UI.

- используется только GigaChat;
- сообщения отправляются в `GIGACHAT_ENDPOINT` (по умолчанию `/api/chat`);
- модель фиксирована через `GIGACHAT_MODEL` (по умолчанию `GigaChat`);
- токены и upstream-маршрутизация остаются на стороне вашего Nginx.

## Локальный запуск

1. Скопируй `.env.example` в `.env` и заполни значения.
2. Установи зависимости:

```bash
npm install
```

3. Запусти:

```bash
npm run dev
```

## Docker

```bash
docker compose up --build -d
```

Приложение будет доступно на `http://localhost:3000`.
