#!/usr/bin/env sh

cp deploy/mydevil-run.js app.js
cp .env.example .env
rsync -r --delete-after --exclude 'node_modules' --quiet $TRAVIS_BUILD_DIR/ k911-main@s11.mydevil.net:domains/knit-test-homepage.tk/public_nodejs
