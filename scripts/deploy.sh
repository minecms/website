#!/usr/bin/env bash
# Production deploy for minecms.ru (isolated stack in /opt/minecms-website).
set -euo pipefail

exec 9>/var/lock/web-deploy.lock
flock 9

ROOT=/opt/minecms-website
FUBON_DIR=/opt/fubon-ru
CADDY_DIR="$ROOT/caddy"
MERGED_CADDY="$CADDY_DIR/merged.caddy"
MINECMS_CADDY="$CADDY_DIR/minecms.caddy"
FUBON_OVERRIDE="$FUBON_DIR/docker-compose.override.yml"

cd "$ROOT"

docker network create web >/dev/null 2>&1 || true

cp -f "$ROOT/caddy/minecms.caddy" "$MINECMS_CADDY"

docker compose up -d --build minecms-app

if [ -f "$FUBON_DIR/Caddyfile" ]; then
  {
    echo "# minecms-website deploy: edge routing for minecms.ru (managed on server)"
    echo "import minecms.caddy"
    echo ""
    cat "$FUBON_DIR/Caddyfile"
  } > "$MERGED_CADDY"

  cat > "$FUBON_OVERRIDE" <<EOF
# Managed by minecms-website deploy — do not edit manually.
services:
  caddy:
    volumes:
      - ${MERGED_CADDY}:/etc/caddy/Caddyfile:ro
      - ${MINECMS_CADDY}:/etc/caddy/minecms.caddy:ro
    networks:
      - default
      - web

networks:
  web:
    external: true
EOF

  cd "$FUBON_DIR"
  docker compose up -d caddy

  if ! docker network inspect web --format '{{range $k,$v := .Containers}}{{$v.Name}} {{end}}' | grep -q 'fubon-ru-caddy-1'; then
    docker network connect web fubon-ru-caddy-1 || true
  fi

  if docker compose exec -T caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile >/dev/null 2>&1; then
    docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
  else
    echo "ERROR: merged Caddyfile failed validation" >&2
    docker compose exec -T caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
    exit 1
  fi
else
  echo "WARNING: $FUBON_DIR/Caddyfile missing — minecms app only, no edge reload" >&2
fi

docker image prune -f || true
echo "MineCMS website deploy complete: $(date)"
