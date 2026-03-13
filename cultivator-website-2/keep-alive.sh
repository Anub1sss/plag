#!/usr/bin/env bash
# Periodically pings the local server to generate activity
# and prevent GitHub Codespaces from going idle.
# Designed to run as a PM2 managed process (cron_restart).

INTERVAL=${KEEPALIVE_INTERVAL:-120}
URL="http://localhost:${PORT:-3000}"

while true; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL" 2>/dev/null || echo "fail")
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ping $URL -> $STATUS"
  sleep "$INTERVAL"
done
