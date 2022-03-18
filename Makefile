docker-start-dev:
	docker-compose -f .\docker-compose.dev.yml -p dev-environment up
docker-start-prod:
	docker-compose -p production-environment up -d --build --force-recreate --remove-orphans -V