# Homepage-nuxtjs
[![Build Status](https://travis-ci.org/knit-pk/homepage-nuxtjs.svg?branch=develop)](https://travis-ci.org/knit-pk/homepage-nuxtjs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6347d383472f41698f5c08953cccd24f)](https://app.codacy.com/app/kwcharllie379/homepage-nuxtjs?utm_source=github.com&utm_medium=referral&utm_content=knit-pk/homepage-nuxtjs&utm_campaign=badger)
[![Greenkeeper badge](https://badges.greenkeeper.io/knit-pk/homepage-nuxtjs.svg)](https://greenkeeper.io/)
[![Slack Status](https://knitwebdevpk.herokuapp.com/badge.svg)](https://knitwebdevpk.herokuapp.com)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

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
