FROM node:9-alpine

ARG NODE_ENV=production
ARG API_URL=http://api.knit.pk.edu.pl

ENV HOST 0.0.0.0
ENV NODE_ENV ${NODE_ENV}
ENV API_URL ${API_URL}

EXPOSE 3000
WORKDIR /usr/src/app
CMD [ "yarn", "start" ]

COPY package.json yarn.lock ./
RUN yarn install

COPY . /usr/src/app
RUN yarn build
