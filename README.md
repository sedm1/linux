# Nuxt 3 Chat (Nuxt UI v3)

Минимальный чат-клиент без БД и без аутентификации в UI:
- список моделей берется с `LM_MODELS_ENDPOINT` (по умолчанию `/V1/models`);
- сообщения отправляются в `GIGACHAT_ENDPOINT` (по умолчанию `/api/chat`);
- токены хранятся только на сервере Nuxt, клиент их не видит.

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

Лучше передавать переменные окружения через Docker (`env_file` / `-e`) и не хранить токен в репозитории.
Минимально нужны:
- `GIGACHAT_BASE_URL`
- `GIGACHAT_TOKEN`
- `LM_BASE_URL`
- `LM_TOKEN`
- при необходимости кастомные `GIGACHAT_ENDPOINT` и `LM_MODELS_ENDPOINT`
