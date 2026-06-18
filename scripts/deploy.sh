#!/usr/bin/env bash
# Production deploy for minecms.ru (isolated stack in /opt/minecms-website).
set -euo pipefail

exec 9>/var/lock/web-deploy.lock
flock 9

cd /opt/minecms-website

docker compose up -d --build minecms-app

# Reload shared Caddy reverse proxy (owned by fubon-ru stack).
FUBON_DIR=/opt/fubon-ru
if [ -d "$FUBON_DIR" ]; then
  cd "$FUBON_DIR"
  docker compose up -d caddy
  if docker compose exec -T caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
    docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
  else
    echo "WARNING: Caddyfile failed validation — keeping previous running config" >&2
  fi
fi

docker image prune -f || true
echo "MineCMS website deploy complete: $(date)"
