docker-build-all:
	docker build -f .docker/Dockerfile.dashboard -t cra-test . &&\
	docker build -f .docker/Dockerfile.client -t next-test .