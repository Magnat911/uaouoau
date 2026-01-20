# LiveKit AI Receptionist - Vanilla JS

Простой Vanilla JS проект для вызова AI-агента **Sage-1242** через LiveKit.

## 🚀 Быстрый старт

### 1. Установи зависимости

```bash
npm install
```

### 2. Создай `.env.local`

```bash
cp .env.example .env.local
```

Заполни значения из https://livekit.cloud (Settings → API Keys)

### 3. Запусти сервер

```bash
npm start
```

Открой http://localhost:3000 и нажми кнопку! 🎉

## 📁 Структура

```
index.html          ← Фронтенд (Vanilla JS + CDN скрипт)
server.js           ← Backend для генерации токенов
package.json        ← Зависимости
.env.example        ← Переменные окружения
```

## 🔧 Как работает

1. Ты нажимаешь кнопку
2. Frontend отправляет запрос на `/api/token`
3. Backend генерирует JWT токен (используя ключи из env)
4. Frontend получает токен и подключается к LiveKit
5. Микрофон включён → агент слышит
6. Аудио агента воспроизводится

## 📝 Переменные окружения

| Переменная | Откуда |
|-----------|--------|
| `LIVEKIT_API_KEY` | livekit.cloud → Settings → API Keys |
| `LIVEKIT_API_SECRET` | livekit.cloud → Settings → API Keys |
| `NEXT_PUBLIC_LIVEKIT_URL` | livekit.cloud → Settings (WebSocket URL) |

## 🚀 Деплой на Vercel

1. Запушь на GitHub
2. На Vercel выбери Node.js (не Next.js!)
3. Build command: (оставь пусто)
4. Start command: `npm start`
5. Добавь Environment Variables
6. Deploy!

## 📚 Ссылки

- [LiveKit Docs](https://docs.livekit.io)
- [LiveKit JS SDK](https://github.com/livekit/client-sdk-js)
