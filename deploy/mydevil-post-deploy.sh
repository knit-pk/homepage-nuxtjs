#!/usr/bin/env sh

export PATH=~/.npm-global/bin:~/bin:$PATH
cd ~/domains/knit-test-homepage.tk/public_nodejs
rm -rf node_modules
yarn install
mkdir public
cp -R src/static/* public
ln -s ../.nuxt/dist/client public/_nuxt
yarn build
ln -s ./node_modules/nuxt/bin/nuxt-start ./app.js
devil www restart knit-test-homepage.tk
