lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	railway up

start:
	make start-backend & make start-frontend

refresh:
	npm i @hexlet/chat-server & make start