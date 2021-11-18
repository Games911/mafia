init: docker-down-clear docker-pull docker-build docker-up
up: docker-up
down: docker-down
build: docker-build
restart: down up


docker-up:
	docker-compose up -d
docker-down:
	docker-compose down --remove-orphans
docker-down-clear:
	docker-compose down -v --remove-orphans
docker-build:
	docker-compose build
docker-pull:
	docker-compose pull


### npm test
### npx jest --coverage
### npm run lint

### sudo systemctl stop docker
### sudo systemctl start docker

### docker-compose run --rm user-service sh
### docker-compose run --rm client sh
