#!/usr/bin/env sh

cd /home/k911-main/domains/knit-test-homepage.tk/public_nodejs
rm -rf node_modules/*
npm8 install
devil www restart knit-test-homepage.tk
mkdir public
cp -R static/* public
ln -s ../.nuxt/dist/ public/_nuxt
