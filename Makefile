all:
	make dash &&\
	make client &&\
	make auth &&\
	make proxy-balancer


dashboard:
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
update:
	docker compose up --no-deps -d $(image) --build --force-recreate