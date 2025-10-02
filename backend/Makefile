up:
	docker compose up -d --remove-orphans

down:
	docker compose down --remove-orphans

logs:
	docker compose logs -f

sh:
	docker compose exec app sh

# Frontend development
dev:
	docker compose exec app npm run dev -- --host 0.0.0.0

build:
	docker compose build --no-cache

install:
	docker compose exec app npm install

# Laravel commands
artisan:
	docker compose exec app php artisan $(cmd)

migrate:
	docker compose exec app php artisan migrate

# Xray services
up-xray:
	docker compose up -d xray --remove-orphans

down-xray:
	docker compose down xray --remove-orphans

logs-xray:
	docker compose logs -f xray

# .PHONY: up down logs sh dev build install artisan migrate up-xray down-xray logs-xray
