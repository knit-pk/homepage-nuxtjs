#!/usr/bin/env sh

cd ~/domains/knit-test-homepage.tk/public_nodejs
rm -rf node_modules/*
yarn install
devil www restart knit-test-homepage.tk
mkdir public
cp -R static/* public
ln -s ../.nuxt/dist/ public/_nuxt
