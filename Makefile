all:
	make cra image=dashboard &&\
	make next image=client &&\
	make express image=auth &&\
	make express image=bucket &&\
	make image image=proxy-balancer

image=proxy-balancer
image:
	docker build -f .docker/Dockerfile.$(image) -t $(image) .

image=auth
express:
	docker build -f .docker/Dockerfile.express --build-arg MICROSERVICE_NAME=$(image) -t $(image) .

image=dashboard
cra:
	docker build -f .docker/Dockerfile.cra --build-arg MICROSERVICE_NAME=$(image) -t $(image) .

image=client
next:
	docker build -f .docker/Dockerfile.next --build-arg MICROSERVICE_NAME=$(image) -t $(image) .

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