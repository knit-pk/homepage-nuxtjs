#!/usr/bin/env sh

cp deploy/mydevil-run.js app.js
cp .env.example .env
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/ k911-main@s11.mydevil.net:/home/k911-main/domains/knit-test-homepage.tk/public_nodejs_ci
