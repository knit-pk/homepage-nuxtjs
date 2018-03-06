#!/usr/bin/env sh

git tag ${APP_VERSION} --force
git push origin ${APP_VERSION} --force
