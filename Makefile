install: install-deps install-flow-typed

develop:
	npx webpack-dev-server

install-deps:
	npm install

build:
	rm -rf dist
	NODE_ENV=production npx webpack

test:
	npm run test

test-coverage:
	npm run test -- --coverage

lint:
	npx eslint .

publish:
	npm publish

.PHONY: test
