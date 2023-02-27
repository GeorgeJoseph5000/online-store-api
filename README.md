<!-- Project title -->
# Online Store API

# Installation

To use this project, you need to follow the commands below:

1. Install the required packages:

   ```bash
   npm install
   ```

2. Copy `env.env` file into `.env` file.

3. Fill the created `.env` file with corresponding/appropriate information.

4. *For applying configured styling*, run the following commands:
   - ***Prettier** styling*:

        ```bash
        npm run prettier
        ```

   - ***ESLint** styling*:

        ```bash
        npm run lint
        ```

5. *For manipulating the database*, run the following commands:
   - *Run **Up** Migrations*:

        ```bash
        npm run migration:run
        ```

   - *Run **Down** Migrations*:

        ```bash
        npm run migration:reset
        ```

6. *For working on the **development** phase*, run the following commands:
   - *Live debugging while development*:

        ```bash
        npm run watch
        ```

   - *Jasmine Testing*:

        ```bash
        npm run test
        ```

7. *For working with the **production** phase*, run the following commands:

    - *Build the project*:

        ```bash
        npm run build
        ```

        Then, *Run the compiled server*:

        ```bash
        node build/index.js
        ```

    - OR simply, *Start the server with one command*:

        ```bash
        npm run start
        ```

8. Open the local website on `http://127.0.0.1:5000/{endpoint}/{:queryParameters}`


# Installed NPM Packages

## Production Packages

These packages can be found in the `"dependencies"` object 

- [bcrypt](https://www.npmjs.com/package/bcrypt) 
- [cors](https://www.npmjs.com/package/cors) 
- [db-migrate](https://www.npmjs.com/package/db-migrate) 
- [db-migrate-pg](https://www.npmjs.com/package/db-migrate-pg) 
- [dotenv](https://www.npmjs.com/package/dotenv) 
- [express](https://www.npmjs.com/package/express) 
- [express-validator](https://www.npmjs.com/package/express-validator) 
- [helmet](https://www.npmjs.com/package/helmet) 
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [morgan](https://www.npmjs.com/package/morgan) 
- [pg](https://www.npmjs.com/package/pg)
- [uuid](https://www.npmjs.com/package/uuid) 

## Development Packages

These packages can be found in the `"devDependencies"` object 

- [@types/bcrypt](https://www.npmjs.com/package/@types/bcrypt) 
- [@types/cors](https://www.npmjs.com/package/@types/cors) 
- [@types/express](https://www.npmjs.com/package/@types/express) 
- [@types/jasmine](https://www.npmjs.com/package/@types/jasmine) 
- [@types/jsonwebtoken](https://www.npmjs.com/package/@types/jsonwebtoken)
- [@types/morgan](https://www.npmjs.com/package/@types/morgan) 
- [@types/pg](https://www.npmjs.com/package/@types/pg)
- [@types/supertest](https://www.npmjs.com/package/@types/supertest)
- [@types/uuid](https://www.npmjs.com/package/@types/uuid) 
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser)
- [eslint](https://www.npmjs.com/package/eslint) 
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) 
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) 
- [jasmine](https://www.npmjs.com/package/jasmine) 
- [jasmine-spec-reporter](https://www.npmjs.com/package/jasmine-spec-reporter) 
- [prettier](https://www.npmjs.com/package/prettier) 
- [supertest](https://www.npmjs.com/package/supertest) 
- [tsc-watch](https://www.npmjs.com/package/tsc-watch) 
- [typescript](https://www.npmjs.com/package/typescript) 

