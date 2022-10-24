export GOOGLE_APPLICATION_CREDENTIALS=$(HOME)/.config/gcloud/share-po-firebase.json

.PHONY: build-docker
build-docker:
	docker-compose build

.PHONY: hello-docker
hello-docker:
	docker-compose up

.PHONY: bye-docker
bye-docker:
	docker-compose down

.PHONY: entry-back
entry-back:
	docker-compose exec backend /bin/sh

.PHONY: entry-front
entry-front:
	docker-compose exec frontend /bin/sh

.PHONY: gen-front
gen-front:
	docker-compose exec frontend rm -rf ../swagger
	docker cp ./swagger share-po-frontend:/swagger
	docker-compose exec frontend npm run gen

.PHONY: gen-back
gen-back:
	docker-compose exec backend rm -rf ../swagger
	docker cp ./swagger share-po-backend:/swagger
	docker-compose exec backend swagger generate model -t ./gen -f ../swagger/openapi2.yaml
	docker-compose exec backend go mod tidy

.PHONY: db-init
db-init:
	docker-compose exec db psql --username=root --command="create database share_po"

.PHONY: db-migration
db-migration:
	docker-compose exec backend go run cmd/migration/main.go

.PHONY: db-seed
db-seed:
	docker-compose exec backend go run cmd/seeder/main.go
