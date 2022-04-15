all:
	make dash &\
	make client &\
	make proxy-balancer


dash:
	docker build -f .docker/Dockerfile.dashboard -t dashboard .

client:
	docker build -f .docker/Dockerfile.client -t client .

compose:
	docker compose up --build --force-recreate

proxy-balancer:
	docker build -f .docker/Dockerfile.proxy-balancer -t proxy-balancer .
