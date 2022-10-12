all:
	make cra image=dashboard &&\
	make next image=client &&\
	make express image=auth &&\
	make express image=bucket &&\
	make express image=health &&\
	make image image=proxy-balancer base=proxy-balancer

image=proxy-balancer
base=express
image:
	docker build -f .docker/Dockerfile.$(base) --build-arg MICROSERVICE_NAME=$(image) -t $(image) .

image=auth
express:
	make image image=$(image) base=express

image=dashboard
cra:
	make image image=$(image) base=cra

image=client
next:
	make image image=$(image) base=next

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
	cd dev && docker compose up --no-deps -d $(image) --build --force-recreate

compose-dev:
	cd dev && docker compose  up --build --force-recreate -d --remove-orphans

compose-staging:
	docker compose  -f docker-compose.staging.yml up --build --force-recreate -d --remove-orphans