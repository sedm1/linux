# Nuxt 3 Chat (Nuxt UI v3)

Минимальный чат-клиент без БД и без аутентификации в UI:
- список моделей берется с `LM_MODELS_ENDPOINT` (по умолчанию `/V1/models`);
- сообщения отправляются в `GIGACHAT_ENDPOINT` (по умолчанию `/api/chat`);
- токены и upstream-маршрутизация полностью остаются на стороне твоего Nginx.

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

## Рекомендация для Debian-сервера

Сконфигурируй Nginx так, чтобы:
- `/api/chat` проксировался в GigaChat;
- `/V1/models` проксировался в сервис моделей.

Если endpoint отличаются, задай их через env:
- `GIGACHAT_ENDPOINT`
- `LM_MODELS_ENDPOINT`
