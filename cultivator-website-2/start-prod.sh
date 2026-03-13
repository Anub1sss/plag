#!/usr/bin/env bash
set -euo pipefail

echo "=== Запуск production-сервера ==="

echo "[1/4] Сборка проекта..."
npm run prod:build

echo "[2/4] Создание папки логов..."
mkdir -p logs

echo "[3/4] Запуск PM2 (сервер + keep-alive)..."
pm2 start ecosystem.config.cjs --env production

echo "[4/4] Сохранение PM2-конфига..."
pm2 save --force

echo ""
echo "=== Сервер запущен ==="
pm2 status
echo ""
echo "Порт 3000 открыт. Если вы в Codespaces — ссылка появится во вкладке Ports."
