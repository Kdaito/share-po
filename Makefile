build-docker:
	docker-compose build

hello-docker:
	docker-compose up

bye-docker:
	docker-compose down

entry-backend:
	docker-compose exec backend /bin/sh

gen:
	docker-compose exec backend rm -rf ../swagger
	docker cp ./swagger share-po-backend:/swagger
	docker-compose exec backend swagger generate model -t ./gen -f ../swagger/openapi2.yaml
	docker-compose exec backend go mod tidy