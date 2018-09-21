#!/usr/bin/env sh

DOCKER_TAG=$(echo ${TRAVIS_TAG} | sed -E 's~^v(.*)~\1~')

# Docker Hub
echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin

docker pull knitpk/homepage:latest

docker build . \
    --cache-from knitpk/homepage:latest \
    --tag knitpk/homepage:${DOCKER_TAG} \
    --tag knitpk/homepage:latest

docker push knitpk/homepage:${DOCKER_TAG}
docker push knitpk/homepage:latest

# Heroku (UAT environment)
echo "${HEROKU_AUTH_TOKEN}" | docker login -u "_" --password-stdin registry.heroku.com

docker build . \
    --cache-from knitpk/homepage:latest \
    --build-arg API_URL=https://d15e2ckuuchn46.cloudfront.net \
    --tag registry.heroku.com/knit-stage-homepage/web

docker push registry.heroku.com/knit-stage-homepage/web
