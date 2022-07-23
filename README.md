# seed
> my beautiful monoproject

## required dependencies
- dev mode
	- nodejs >= 16
	- pnpm >= 6
	- docker + docker-compose

## first installation
```bash
pnpm install --shamefully-hoist  # install packages
cd packages/backend # move to backend folder
cp .env.example .env # copy and change .env vars
npx prisma migrate dev # migrate tables
npx prisma generate # generate client dto
openssl genrsa -des3 -out ./src/config/private.pem 2048 # generate private.key for jwt
openssl rsa -in ./src/config/private.pem -outform PEM -pubout -out ./src/config/public.pem # generate public.key for jwt
cd ../.. # move to root folder
docker-compose up # (optional) start db && nginx
pnpm dev # start hmr for all adm/backend/fronted
```

## used ports
- in host
	- nuxt (fronted) - http://localhost:3000
	- fastify (backend) - http://localhost:3001
	- swagger (backend) - http://localhost:3001/documentation
	- vue (adm) - http://localhost:3002
- in nginx
	- fronted - http://localhost:3030
	- backend
		- api - `localhost/api/*`
		- storage - `localhost/storage/*`
	- adm - http://adm.localhost:3030
- other
	- postgres `:port=54320`
	- redis `:port=63790`
