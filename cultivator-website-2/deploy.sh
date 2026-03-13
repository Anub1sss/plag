#!/usr/bin/env bash
set -euo pipefail

echo "=== Деплой kultivator-web ==="

# Определяем окружение
if [ -n "${CODESPACES:-}" ]; then
  echo "Среда: GitHub Codespaces"
else
  echo "Среда: VPS / локальная"
  APP_DIR="${APP_DIR:-/var/www/kultivator-web}"
  cd "$APP_DIR"
  echo "[*] Обновление кода..."
  git pull origin main
fi

echo "[1/4] Установка зависимостей..."
npm ci --omit=dev

echo "[2/4] Сборка проекта..."
npm run prod:build

echo "[3/4] Создание папки логов..."
mkdir -p logs

echo "[4/4] Перезапуск PM2..."
pm2 reload ecosystem.config.cjs --env production
pm2 save --force

echo ""
echo "=== Деплой завершён ==="
pm2 status
