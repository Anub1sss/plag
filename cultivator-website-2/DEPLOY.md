# Развертывание

## Вариант 1: GitHub Codespaces (основной)

### Автоматический запуск

При создании Codespace из этого репозитория всё запускается автоматически благодаря `.devcontainer/devcontainer.json`:

1. Устанавливаются зависимости и PM2
2. Выполняется production-сборка
3. Запускается PM2 (сервер + keep-alive)
4. Порт 3000 открывается публично

Ссылка на сайт появится во вкладке **Ports** в VS Code.

### Ручной запуск (если автозапуск не сработал)

```bash
bash start-prod.sh
```

### Обновление кода в Codespace

```bash
bash deploy.sh
```

### Полезные команды

| Команда | Описание |
|---------|----------|
| `pm2 status` | Статус процессов |
| `pm2 logs kultivator-web` | Логи сервера |
| `pm2 logs keep-alive` | Логи keep-alive |
| `pm2 monit` | Мониторинг CPU/RAM |
| `npm run prod:restart` | Перезапуск сервера |
| `npm run prod:stop` | Остановка |

### Настройки Codespace на GitHub

Для максимальной стабильности 24/7 настройте в GitHub:

1. **Settings -> Codespaces -> Default idle timeout** -> `240 minutes` (максимум)
2. **Settings -> Codespaces -> Default retention period** -> `30 days`

### Настройка внешнего keep-alive (обязательно!)

GitHub Codespaces засыпает при отсутствии **внешней** активности. Внутренний пинг localhost не помогает. Поэтому в репозитории есть GitHub Actions workflow, который каждые 25 минут пингует Codespace снаружи.

**Как настроить:**

1. Запустите Codespace и откройте вкладку **Ports**
2. Скопируйте публичный URL порта 3000 (вида `https://xxx-3000.app.github.dev`)
3. В репозитории на GitHub перейдите в **Settings -> Secrets and variables -> Actions -> Variables**
4. Нажмите **New repository variable**
5. Имя: `CODESPACE_URL`, значение: скопированный URL
6. Сохраните

Workflow `.github/workflows/keep-alive.yml` автоматически подхватит переменную и начнёт пинговать каждые 25 минут.

**Если URL изменился** (пересоздали Codespace) — просто обновите переменную `CODESPACE_URL` в настройках репозитория.

### Как работает keep-alive (двойная защита)

1. **Внешний пинг** — GitHub Actions workflow каждые 25 мин делает HTTP-запрос к публичному URL Codespace. Это генерирует реальную внешнюю активность.
2. **Внутренний пинг** — `keep-alive.sh` через PM2 каждые 2 мин пингует `localhost:3000` как дополнительная страховка и мониторинг здоровья сервера.

---

## Вариант 2: VPS (Ubuntu/Debian)

### Требования

- Ubuntu 20.04+ / Debian 11+
- Node.js 20+
- Nginx
- PM2 (`npm i -g pm2`)
- Certbot для SSL

### Установка

```bash
# Клонирование
sudo mkdir -p /var/www/kultivator-web
sudo chown $USER:$USER /var/www/kultivator-web
git clone <URL> /var/www/kultivator-web
cd /var/www/kultivator-web

# Переменные окружения
cp .env.local .env.production.local

# Сборка и запуск
npm ci --omit=dev
npm run prod:build
npm run prod:start

# Nginx
sudo cp nginx.conf /etc/nginx/sites-available/kultivator-web
sudo ln -s /etc/nginx/sites-available/kultivator-web /etc/nginx/sites-enabled/
# Замените YOUR_DOMAIN.com на свой домен в конфиге
sudo nano /etc/nginx/sites-available/kultivator-web
sudo nginx -t && sudo systemctl reload nginx

# SSL
sudo certbot --nginx -d YOUR_DOMAIN.com

# Автозапуск при перезагрузке
pm2 save
pm2 startup
```

### Обновление на VPS

```bash
bash deploy.sh
```

---

## Структура production-файлов

```
├── .devcontainer/
│   └── devcontainer.json    # Автозапуск в Codespaces
├── ecosystem.config.cjs     # Конфиг PM2 (сервер + keep-alive)
├── keep-alive.sh            # Пинг против засыпания
├── start-prod.sh            # Скрипт первого запуска
├── deploy.sh                # Скрипт обновления
├── nginx.conf               # Шаблон Nginx (для VPS)
└── DEPLOY.md                # Эта инструкция
```
