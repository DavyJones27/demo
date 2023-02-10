DB_URL=postgresql://root:secret@localhost:5432/user_db?sslmode=disable

postgres:
	docker run --name postgres -p 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret -d postgres:14-alpine

createdb:
	docker exec -it postgres createdb --username=root --owner=root user_db

dropdb:
	docker exec -it postgres dropdb user_db

migrateup:
	migrate -path migration -database "$(DB_URL)" -verbose up

migratedown:
	migrate -path migration -database "$(DB_URL)" -verbose down

.PHONY: postgres createdb dropdb migrateup migratedown