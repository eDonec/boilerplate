all:
	make image image=dashboard &&\
	make image image=client &&\
	make image image=auth &&\
	make image image=bucket &&\
	make image image=proxy-balancer

image=dashboard
image:
	docker build -f .docker/Dockerfile.$(image) -t $(image) .

compose:
	docker compose up  --build --force-recreate -d --remove-orphans

image=auth
test:
	docker build -f .docker/Dockerfile.test.base -t test-$(image) --build-arg MICROSERVICE_NAME=$(image) .

image=auth
update:
	docker compose up --no-deps -d $(image) --build --force-recreate

image=auth
update-dev:
	docker compose -f docker-compose.dev.yml up --no-deps -d $(image) --build --force-recreate

compose-dev:
	cd dev && docker compose  up --build --force-recreate -d --remove-orphans

compose-staging:
	docker compose  -f docker-compose.staging.yml up --build --force-recreate -d --remove-orphans