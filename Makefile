gen:
	docker-compose exec backend rm -rf ../swagger
	docker cp ./swagger nfl-app-backend:/swagger
	docker-compose exec backend swagger generate model -t ./gen -f ../swagger/openapi2.yaml
	docker-compose exec backend go mod tidy