# seed
> my beautiful monoproject

## cmd
```bash
pnpm install --shamefully-hoist # install packages
pnpm dev # hmr for all adm/backend/fronted
```

## features
### adm
- vue3-vite application (spa)

### backend
- fastify (rest-api)
- swagger (auto-generate api docs)
- prisma (orm)

### fronted
- nuxt3 (ssr)

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
