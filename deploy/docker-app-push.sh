#!/usr/bin/env sh

DOCKER_TAG=$(echo ${TRAVIS_TAG} | sed -E 's~^v(.*)~\1~')

# Docker Hub
docker login -u "${DOCKER_USERNAME}" -p "${DOCKER_PASSWORD}"
docker build . -t knitpk/homepage:${DOCKER_TAG}
docker push knitpk/homepage:${DOCKER_TAG}

# Heroku (UAT environment)
docker login --username=_ --password=${HEROKU_AUTH_TOKEN} registry.heroku.com
docker build . -t registry.heroku.com/knit-stage-homepage/web --build-arg API_URL=https://d15e2ckuuchn46.cloudfront.net
docker push registry.heroku.com/knit-stage-homepage/web
