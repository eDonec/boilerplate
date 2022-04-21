all:
	make dash &&\
	make client &&\
	make auth &&\
	make proxy-balancer


dash:
	docker build -f .docker/Dockerfile.dashboard -t dashboard .

client:
	docker build -f .docker/Dockerfile.client -t client .

proxy-balancer:
	docker build -f .docker/Dockerfile.proxy-balancer -t proxy-balancer .

auth:
	docker build -f .docker/Dockerfile.auth -t auth .

compose:
	docker compose up --build --force-recreate

image=auth
update-image:
	docker compose up --no-deps -d $(image) --build --force-recreate