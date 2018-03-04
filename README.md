# homepage-nuxtjs

[![Greenkeeper badge](https://badges.greenkeeper.io/knit-pk/homepage-nuxtjs.svg)](https://greenkeeper.io/)

> KNIT Homepage

## Build Setup
Project can be run for development in two different ways.
- [Normal](#nodejs) (local NodeJS server)
- [Docker](#docker) (via `docker-compose`)

### NodeJS
```bash
# create own .env file
$ cp .env.example .env

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

### Docker
At first, make sure you have installed latest stable version of `docker` and `docker-compose` packages in your system.

Most of the times that's the only commands you'll need:

- Running project
  ```bash
  $ docker-compose up
  $ docker-compose up -d # run in background
  ```
- Stopping project
  ```bash
  $ docker-compose stop
  ```
If you're changing build configuration (`Dockerfile` or `build.*` options in `docker-compose.yml`), you'll have to force rebuild the project

  ```bash
  $ docker-compose up --build
  ```

## Nuxt.js

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
