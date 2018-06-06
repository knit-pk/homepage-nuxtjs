<p align="center">
  <img width="300" height="300" src="https://secure.gravatar.com/avatar/02af0b4745bcd6c6997955997639cb65.jpg?s=300&r=g&d=mm">
</p>

<p align="center">
  <a href="https://travis-ci.org/knit-pk/homepage-nuxtjs"><img src="https://travis-ci.org/knit-pk/homepage-nuxtjs.svg?branch=develop" alt="Build status"></a>
  <a href="https://codeclimate.com/github/knit-pk/homepage-nuxtjs/maintainability"><img src="https://api.codeclimate.com/v1/badges/d820268b393178d9e7eb/maintainability" alt="Maintainability"></a>
  <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/knit-pk/homepage-nuxtjs.svg" alt="Greenkeeper badge"></a>
  <a href="https://knitwebdevpk.herokuapp.com"><img src="https://knitwebdevpk.herokuapp.com/badge.svg" alt="Slack Status"></a>
  <a href="https://opensource.org/licenses/mit-license.php"><img src="https://badges.frapsoft.com/os/mit/mit.svg?v=103" alt="MIT Licence"></a>
  <a href="https://github.com/ellerbrock/open-source-badges/"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" alt="Open Source Love"></a>
</p>

## Build Setup
Project can be run for development in two different ways.
- [Normal](#nodejs) (local NodeJS server)
- [Docker](#docker) (via `docker-compose`)

### NodeJS
```bash
# create own .env file
$ cp .env.example .env

# install dependencies
$ yarn

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
