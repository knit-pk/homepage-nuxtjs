#!/usr/bin/env sh

git tag ${APP_VERSION} --force

git remote add authorized https://travis:${GH_TOKEN}@github.com/knit-pk/homepage-nuxtjs.git
git push authorized ${APP_VERSION} --force
