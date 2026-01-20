# LiveKit AI Receptionist

Минимальный проект для вызова AI-агента **Sage-1242** через LiveKit.

## 🚀 Быстрый старт

### 1. Установка

```bash
pnpm install
```

### 2. Переменные окружения

Создай `.env.local`:

```env
LIVEKIT_API_KEY=твой_ключ_из_livekit
LIVEKIT_API_SECRET=твой_секрет_из_livekit
NEXT_PUBLIC_LIVEKIT_URL=wss://твой-проект.livekit.cloud
```

### 3. Запуск

```bash
pnpm dev
```

Открой http://localhost:3000 и нажми кнопку! 🎉

## 📖 Как получить ключи

1. https://livekit.cloud
2. Settings → API Keys
3. Скопируй Key и Secret
4. Там же найди WebSocket URL

## 🔧 Структура

```
/app
  page.tsx              ← UI + логика подключения
  layout.tsx            ← HTML шаблон
  /api/token
    route.ts            ← Backend для генерации токенов
```

## 📝 Переменные окружения

| Переменная | Обязательна | Где |
|-----------|-----------|-----|
| `LIVEKIT_API_KEY` | ✅ | livekit.cloud → API Keys |
| `LIVEKIT_API_SECRET` | ✅ | livekit.cloud → API Keys |
| `NEXT_PUBLIC_LIVEKIT_URL` | ✅ | livekit.cloud → Settings |

## 🚀 Деплой на Vercel

1. Запушь на GitHub
2. На Vercel добавь три Environment Variables
3. Redeploy

Готово! 🎉
