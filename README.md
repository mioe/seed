# seed
> my beautiful monoproject

## first installation
```bash
pnpm install --shamefully-hoist  # install packages
cd backend # move to backend folder
cp .env.example .env # copy and change .env vars
npx prisma migrate dev # migrate tables
npx prisma generate # generate client dto
openssl genrsa -des3 -out ./src/config/private.pem 2048 # generate private.key for jwt
openssl rsa -in ./src/config/private.pem -outform PEM -pubout -out ./src/config/public.pem # generate public.key for jwt
cd .. # move to root folder
docker-compose up # (optional) start db && nginx
pnpm dev # start hmr for all adm/backend/fronted
```

## features
### adm
- vue3-vite application (spa) - http://localhost:3002

### backend
- fastify (rest-api) - http://localhost:3001
- swagger (auto-generate api docs) - http://localhost:3001/documentation
- prisma (orm) - npx prisma <cmd>

### fronted
- nuxt3 (ssr) - http://localhost:3000

## backend
### RSA Signatures - Certificates (with passphrase)
Certificates `private.pem` and `public.pem` are generated with the following command lines
```bash
# generate a 2048-bit RSA key pair, and encrypts them with a passphrase
# the passphrase I choose for the demo files is: super secret passphrase
openssl genrsa -des3 -out ./src/config/private.pem 2048

# export the RSA public key to a file
openssl rsa -in ./src/config/private.pem -outform PEM -pubout -out ./src/config/public.pem
```
Code example
```js
const { readFileSync } = require('fs')
const fastify = require('fastify')()
const jwt = require('@fastify/jwt')

fastify.register(jwt, {
	secret: {
		private: {
			key: readFileSync('path/to/private.pem', 'utf8'),
			passphrase: 'super secret passphrase'
		},
		public: readFileSync('path/to/public.pem', 'utf8')
	},
	sign: { algorithm: 'RS256' }
})
```
