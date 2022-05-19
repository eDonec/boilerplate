all:
	make dashboard &&\
	make client &&\
	make auth &&\
	make proxy-balancer


dashboard:
	docker build -f .docker/Dockerfile.dashboard -t dashboard .

client:
	docker build -f .docker/Dockerfile.client -t client .

proxy-balancer:
	docker build -f .docker/Dockerfile.proxy-balancer -t proxy-balancer .


image=auth
auth:
	docker build -f .docker/Dockerfile.auth -t auth .

compose:
	docker compose up  --build --force-recreate -d --remove-orphans

image=auth
test:
	docker build -f .docker/Dockerfile.test.base -t test-$(image) --build-arg MICROSERVICE_NAME=$(image) .

image=auth
update:
	docker compose up --no-deps -d $(image) --build --force-recreate

compose-dev:
	cd dev && docker compose  up --build --force-recreate -d --remove-orphans

compose-staging:
	docker compose  -f docker-compose.staging.yml up --build --force-recreate -d --remove-orphans